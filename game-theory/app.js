(() => {
  'use strict';

  const CAR_IMAGE = '/game-theory/assets/lamborghini.jpg';
  const GOAT_IMAGE = '/game-theory/assets/goat.jpg';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delayScale = reducedMotion ? 0 : 1;
  const completed = new Set();
  const chapters = ['monty', 'prisoner', 'newcomb', 'hundred'];
  let audioContext = null;
  let soundEnabled = false;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms * delayScale));

  function beep(frequency = 440, duration = 0.08, type = 'sine') {
    if (!soundEnabled) return;
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.06, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  }

  function completeChapter(index) {
    completed.add(index);
    $('#completed-count').textContent = completed.size;
    const navItems = $$('.progress-item');
    navItems[index].classList.add('complete');
    if (navItems[index + 1]) navItems[index + 1].disabled = false;
  }

  function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  function confetti(amount = 55) {
    const layer = $('#confetti-layer');
    const colors = ['#c8f54a', '#ff6b55', '#6ad9e8', '#a98cff', '#ffc84a'];
    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement('i');
      piece.className = 'confetti';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty('--fall', `${1.4 + Math.random() * 1.5}s`);
      piece.style.setProperty('--drift', `${-120 + Math.random() * 240}px`);
      piece.style.animationDelay = `${Math.random() * 0.35}s`;
      layer.append(piece);
      setTimeout(() => piece.remove(), 3400);
    }
  }

  function setButtonGroupDisabled(selector, disabled) {
    $$(selector).forEach(button => {
      button.disabled = disabled;
    });
  }

  // Global controls
  $('#sound-toggle').addEventListener('click', event => {
    soundEnabled = !soundEnabled;
    event.currentTarget.setAttribute('aria-pressed', String(soundEnabled));
    event.currentTarget.setAttribute('aria-label', soundEnabled ? 'Turn sound off' : 'Turn sound on');
    if (soundEnabled) beep(660, 0.12);
  });

  $$('[data-scroll]').forEach(button => {
    button.addEventListener('click', () => scrollToId(button.dataset.scroll));
  });

  $$('[data-next]').forEach(button => {
    button.addEventListener('click', () => scrollToId(button.dataset.next));
  });

  $$('.progress-item').forEach(button => {
    button.addEventListener('click', () => {
      if (!button.disabled) scrollToId(button.dataset.target);
    });
  });

  document.addEventListener('pointermove', event => {
    const glow = $('.cursor-glow');
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });

  const chapterObserver = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const index = chapters.indexOf(visible.target.id);
    $$('.progress-item').forEach((item, itemIndex) => {
      item.classList.toggle('active', itemIndex === index);
      if (itemIndex === index) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
  }, { threshold: [0.18, 0.4], rootMargin: '-15% 0px -55%' });
  $$('.experiment').forEach(section => chapterObserver.observe(section));

  // Experiment 1: Monty Hall
  const monty = {
    prizeDoor: 0,
    firstPick: null,
    revealDoor: null,
    switchDoor: null,
    locked: false
  };

  function imageFallback(event, kind) {
    event.currentTarget.style.display = 'none';
    event.currentTarget.parentElement.style.background = kind === 'car'
      ? 'radial-gradient(circle, #ffe066, #9b5b12)'
      : 'radial-gradient(circle, #f2efe8, #847762)';
  }

  function resetMonty() {
    Object.assign(monty, {
      prizeDoor: Math.floor(Math.random() * 3),
      firstPick: null,
      revealDoor: null,
      switchDoor: null,
      locked: false
    });
    $$('.door-wrap').forEach((door, index) => {
      door.classList.remove('open', 'selected', 'dim');
      door.disabled = false;
      const image = $('img', door);
      const isCar = index === monty.prizeDoor;
      image.style.display = '';
      image.src = isCar ? CAR_IMAGE : GOAT_IMAGE;
      image.alt = isCar ? `Yellow sports car behind door ${index + 1}` : `Goat behind door ${index + 1}`;
      image.onerror = event => imageFallback(event, isCar ? 'car' : 'goat');
      $('b', $('.prize', door)).textContent = isCar ? 'The car' : 'A goat';
    });
    $('#monty-speech').textContent = 'One hides the car. Choose a door.';
    $('#monty-choice').classList.add('hidden');
    $('#monty-reveal').hidden = true;
  }

  async function chooseMontyDoor(index) {
    if (monty.locked) return;
    monty.locked = true;
    monty.firstPick = index;
    const candidates = [0, 1, 2].filter(value => value !== index && value !== monty.prizeDoor);
    monty.revealDoor = candidates[Math.floor(Math.random() * candidates.length)];
    monty.switchDoor = [0, 1, 2].find(value => value !== monty.firstPick && value !== monty.revealDoor);

    $$('.door-wrap').forEach((door, doorIndex) => {
      door.disabled = true;
      door.classList.toggle('selected', doorIndex === index);
    });
    beep(330, 0.08, 'triangle');
    $('#monty-speech').textContent = `Door ${index + 1}? Interesting. I know exactly what’s behind them.`;
    await wait(650);
    $(`.door-wrap[data-door="${monty.revealDoor}"]`).classList.add('open', 'dim');
    beep(180, 0.18, 'sawtooth');
    $('#monty-speech').textContent = `Door ${monty.revealDoor + 1} has a goat. Stay—or switch?`;
    $('#stay-button span').textContent = monty.firstPick + 1;
    $('#switch-button span').textContent = monty.switchDoor + 1;
    $('#monty-choice').classList.remove('hidden');
  }

  async function finishMonty(shouldSwitch) {
    $('#monty-choice').classList.add('hidden');
    const finalPick = shouldSwitch ? monty.switchDoor : monty.firstPick;
    $$('.door-wrap').forEach((door, index) => {
      door.classList.toggle('selected', index === finalPick);
      door.classList.remove('dim');
    });
    $('#monty-speech').textContent = shouldSwitch
      ? `Switching to door ${finalPick + 1}. Let’s open them!`
      : `Staying with door ${finalPick + 1}. Let’s open them!`;
    await wait(430);
    $(`.door-wrap[data-door="${finalPick}"]`).classList.add('open');
    beep(finalPick === monty.prizeDoor ? 880 : 150, 0.25, 'triangle');
    await wait(650);
    $$('.door-wrap').forEach(door => door.classList.add('open'));
    const won = finalPick === monty.prizeDoor;
    $$('.truth-table > div:not(.table-head)').forEach((row, carDoor) => {
      const cells = $$('span', row);
      const stayingWins = carDoor === monty.firstPick;
      cells[1].textContent = stayingWins ? 'Car' : 'Goat';
      cells[1].className = stayingWins ? 'win' : 'lose';
      cells[2].textContent = stayingWins ? 'Goat' : 'Car';
      cells[2].className = stayingWins ? 'lose' : 'win';
    });
    $('#monty-result-label').textContent = won ? 'You won the car!' : 'The goat says hello.';
    $('#monty-result-title').textContent = won
      ? `${shouldSwitch ? 'Switching' : 'Staying'} paid off this time.`
      : `Not this time—but one play is not the probability.`;
    $('#monty-reveal').hidden = false;
    if (won) confetti();
    completeChapter(0);
    await wait(100);
    $('#monty-reveal').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  }

  $$('.door-wrap').forEach(door => {
    door.addEventListener('click', () => chooseMontyDoor(Number(door.dataset.door)));
  });
  $('#stay-button').addEventListener('click', () => finishMonty(false));
  $('#switch-button').addEventListener('click', () => finishMonty(true));
  $('#monty-replay').addEventListener('click', () => {
    resetMonty();
    scrollToId('monty');
  });
  resetMonty();

  // Experiment 2: Prisoner's Dilemma
  const prisoner = {
    oneShotDone: false,
    round: 0,
    playerScore: 0,
    botScore: 0,
    lastPlayerMove: null,
    busy: false
  };

  const payoff = {
    'cooperate-cooperate': [3, 3],
    'cooperate-defect': [0, 5],
    'defect-cooperate': [5, 0],
    'defect-defect': [1, 1]
  };

  function applyJailState(playerMove, rivalMove) {
    const playerRoom = $('.player-room');
    const rivalRoom = $('.rival-room');
    playerRoom.classList.remove('jailed', 'freed');
    rivalRoom.classList.remove('jailed', 'freed');
    if (playerMove === 'defect' && rivalMove === 'cooperate') {
      playerRoom.classList.add('freed');
      rivalRoom.classList.add('jailed');
      return ['You walk free.', 'The stranger stayed silent. Your testimony sends them away for a long time.'];
    }
    if (playerMove === 'cooperate' && rivalMove === 'defect') {
      playerRoom.classList.add('jailed');
      rivalRoom.classList.add('freed');
      return ['You get the long sentence.', 'The stranger snitched while you stayed silent. They walk free.'];
    }
    if (playerMove === 'defect') {
      playerRoom.classList.add('jailed');
      rivalRoom.classList.add('jailed');
      return ['You both snitched.', 'Both are convicted: a long sentence for each.'];
    }
    playerRoom.classList.add('jailed');
    rivalRoom.classList.add('jailed');
    return ['You both stayed silent.', 'The evidence is weak, so both receive reduced time.'];
  }

  async function playOneShot(playerMove) {
    if (prisoner.oneShotDone) return;
    prisoner.oneShotDone = true;
    setButtonGroupDisabled('[data-one-shot]', true);
    const rivalMove = Math.random() < 0.5 ? 'cooperate' : 'defect';
    await wait(450);
    const [title, detail] = applyJailState(playerMove, rivalMove);
    $('#jail-outcome').textContent = title;
    $('#jail-detail').textContent = detail;
    $('#one-shot-prompt').classList.add('hidden');
    $('#one-shot-result').classList.remove('hidden');
    beep(playerMove === 'defect' ? 170 : 350, 0.2, 'square');
  }

  function buildRoundTrack() {
    $('#round-track').replaceChildren(...Array.from({ length: 10 }, (_, index) => {
      const cell = document.createElement('div');
      cell.className = 'round-cell';
      cell.innerHTML = `<span>R${index + 1}</span><b>·</b>`;
      return cell;
    }));
  }

  function resetTft() {
    Object.assign(prisoner, {
      round: 0,
      playerScore: 0,
      botScore: 0,
      lastPlayerMove: null,
      busy: false
    });
    $('#player-score').textContent = '0';
    $('#bot-score').textContent = '0';
    $('#round-number').textContent = '1';
    $('#bot-clue').textContent = 'The bot begins nicely. After that, it remembers.';
    $('#prisoner-reveal').hidden = true;
    buildRoundTrack();
    setButtonGroupDisabled('[data-tft]', false);
  }

  async function playTftRound(playerMove) {
    if (prisoner.busy || prisoner.round >= 10) return;
    prisoner.busy = true;
    setButtonGroupDisabled('[data-tft]', true);
    const botMove = prisoner.round === 0 ? 'cooperate' : prisoner.lastPlayerMove;
    const [playerPoints, botPoints] = payoff[`${playerMove}-${botMove}`];
    prisoner.playerScore += playerPoints;
    prisoner.botScore += botPoints;
    const roundCell = $$('.round-cell')[prisoner.round];
    roundCell.classList.add('played');
    $('b', roundCell).innerHTML = `<span title="You: ${playerMove}">${playerMove === 'cooperate' ? '🤝' : '⚡'}</span><span title="Bot: ${botMove}">${botMove === 'cooperate' ? '🤝' : '⚡'}</span>`;
    $('#player-score').textContent = prisoner.playerScore;
    $('#bot-score').textContent = prisoner.botScore;
    $('#bot-clue').textContent = `You chose ${playerMove}; Tit for Tat chose ${botMove}. Score: ${playerPoints}–${botPoints}.`;
    beep(playerMove === botMove ? 520 : 250, 0.1, 'triangle');
    prisoner.lastPlayerMove = playerMove;
    prisoner.round += 1;
    $('#round-number').textContent = Math.min(10, prisoner.round + 1);
    await wait(360);

    if (prisoner.round === 10) {
      const difference = prisoner.playerScore - prisoner.botScore;
      $('#tft-verdict').textContent = difference > 0
        ? `You won ${prisoner.playerScore}–${prisoner.botScore}.`
        : difference < 0
          ? `Tit for Tat won ${prisoner.botScore}–${prisoner.playerScore}.`
          : `A ${prisoner.playerScore}–${prisoner.botScore} draw.`;
      $('#prisoner-reveal').hidden = false;
      completeChapter(1);
      if (prisoner.playerScore >= 25) confetti(35);
      await wait(100);
      $('#prisoner-reveal').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
      return;
    }
    prisoner.busy = false;
    setButtonGroupDisabled('[data-tft]', false);
  }

  $$('[data-one-shot]').forEach(button => {
    button.addEventListener('click', () => playOneShot(button.dataset.oneShot));
  });
  $('#start-tft').addEventListener('click', () => {
    $('#tft-game').hidden = false;
    $('#tft-game').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
  });
  $$('[data-tft]').forEach(button => {
    button.addEventListener('click', () => playTftRound(button.dataset.tft));
  });
  $('#prisoner-replay').addEventListener('click', () => {
    prisoner.oneShotDone = false;
    $('.player-room').classList.remove('jailed', 'freed');
    $('.rival-room').classList.remove('jailed', 'freed');
    $('#one-shot-prompt').classList.remove('hidden');
    $('#one-shot-result').classList.add('hidden');
    $('#tft-game').hidden = true;
    setButtonGroupDisabled('[data-one-shot]', false);
    resetTft();
    scrollToId('prisoner');
  });
  resetTft();

  // Experiment 3: Newcomb's Paradox
  let newcombPlayed = false;

  function formatMoney(value) {
    return `$${value.toLocaleString('en-US')}`;
  }

  async function playNewcomb(choice) {
    if (newcombPlayed) return;
    newcombPlayed = true;
    setButtonGroupDisabled('[data-newcomb]', true);
    const predictionIsCorrect = Math.random() < 0.9;
    const predictedChoice = predictionIsCorrect ? choice : (choice === 'one' ? 'both' : 'one');
    const boxBValue = predictedChoice === 'one' ? 1_000_000 : 0;
    const total = boxBValue + (choice === 'both' ? 1_000 : 0);

    $('#prediction-slip b').textContent = predictedChoice === 'one' ? 'ONLY BOX B' : 'BOTH BOXES';
    $('#prediction-slip').classList.add('revealed');
    $('#box-b-money').textContent = boxBValue ? '$1M' : '$0';
    $('#box-b').classList.add('selected');
    if (choice === 'both') $('#box-a').classList.add('selected');
    beep(260, 0.15, 'sawtooth');
    await wait(600);
    $('#box-b').classList.add('open');
    if (choice === 'both') $('#box-a').classList.add('open');
    beep(boxBValue ? 880 : 130, 0.3, 'triangle');
    await wait(850);
    $('#newcomb-verdict').textContent = `You took home ${formatMoney(total)}.`;
    $('#newcomb-reveal').hidden = false;
    completeChapter(2);
    if (total >= 1_000_000) confetti();
    await wait(100);
    $('#newcomb-reveal').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  }

  $$('[data-newcomb]').forEach(button => {
    button.addEventListener('click', () => playNewcomb(button.dataset.newcomb));
  });
  $('#newcomb-replay').addEventListener('click', () => {
    newcombPlayed = false;
    $('#prediction-slip b').textContent = '••••••••';
    $('#prediction-slip').classList.remove('revealed');
    $$('.newcomb-box').forEach(box => box.classList.remove('open', 'selected'));
    $('#newcomb-reveal').hidden = true;
    setButtonGroupDisabled('[data-newcomb]', false);
    scrollToId('newcomb');
  });

  // Experiment 4: 100 Prisoners
  const crowdFragment = document.createDocumentFragment();
  for (let number = 1; number <= 100; number += 1) {
    const person = document.createElement('i');
    person.className = 'tiny-prisoner';
    person.style.animationDelay = `${(number % 13) * 0.08}s`;
    person.innerHTML = `<span>${number}</span>`;
    crowdFragment.append(person);
  }
  $('#prisoner-crowd').append(crowdFragment);

  function shuffle(size) {
    const values = Array.from({ length: size }, (_, index) => index + 1);
    for (let i = values.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    return values;
  }

  let loopPermutation = shuffle(12);
  let loopBusy = false;

  function buildLoopBoxes() {
    loopPermutation = shuffle(12);
    const boxes = loopPermutation.map((slipValue, index) => {
      const box = document.createElement('div');
      box.className = 'loop-box';
      box.dataset.box = index + 1;
      box.innerHTML = `<span class="slip">${slipValue}</span><span class="drawer-front">${index + 1}</span>`;
      return box;
    });
    $('#box-grid').replaceChildren(...boxes);
    $('#loop-status').textContent = 'Waiting for prisoner 1…';
  }

  async function runLoopDemo() {
    if (loopBusy) return;
    loopBusy = true;
    $('#run-loop').disabled = true;
    buildLoopBoxes();
    let currentBox = 1;
    let found = false;
    const path = [];
    for (let attempt = 1; attempt <= 6; attempt += 1) {
      const box = $(`.loop-box[data-box="${currentBox}"]`);
      box.classList.add('active');
      await wait(280);
      box.classList.add('open');
      const slip = loopPermutation[currentBox - 1];
      path.push(currentBox);
      $('#loop-status').textContent = `Open ${currentBox} → slip says ${slip}. ${attempt}/6 opens used.`;
      beep(280 + attempt * 45, 0.08, 'triangle');
      await wait(520);
      box.classList.remove('active');
      if (slip === 1) {
        found = true;
        box.classList.add('success');
        break;
      }
      currentBox = slip;
    }
    $('#loop-status').textContent = found
      ? `Success: ${path.join(' → ')} found slip 1 within six opens.`
      : `This loop was longer than six: ${path.join(' → ')}… Prisoner 1 fails.`;
    if (found) confetti(22);
    loopBusy = false;
    $('#run-loop').disabled = false;
  }

  function arrangementSucceeds(permutation) {
    const visited = new Uint8Array(permutation.length);
    for (let start = 0; start < permutation.length; start += 1) {
      if (visited[start]) continue;
      let current = start;
      let cycleLength = 0;
      while (!visited[current]) {
        visited[current] = 1;
        current = permutation[current] - 1;
        cycleLength += 1;
      }
      if (cycleLength > permutation.length / 2) return false;
    }
    return true;
  }

  function simulatePrisons(trials = 1000) {
    let successes = 0;
    for (let trial = 0; trial < trials; trial += 1) {
      if (arrangementSucceeds(shuffle(100))) successes += 1;
    }
    return successes;
  }

  const guessRange = $('#guess-range');
  function updateGuess() {
    const value = Number(guessRange.value);
    $('#guess-output').textContent = value;
    $('#lock-guess').textContent = `Lock in ${value}%`;
    guessRange.style.background = `linear-gradient(90deg, var(--lime) ${value}%, #353a44 ${value}%)`;
  }
  guessRange.addEventListener('input', updateGuess);

  $('#lock-guess').addEventListener('click', async () => {
    const guess = Number(guessRange.value);
    const difference = Math.abs(31.18 - guess);
    $('#guess-reaction').textContent = difference < 3
      ? `Your ${guess}% guess was remarkably close.`
      : guess < 31.18
        ? `Your ${guess}% guess was low—the loop strategy is surprisingly powerful.`
        : `Your ${guess}% guess was optimistic, but 31.18% is still enormous compared with random play.`;
    $('#probability-guess').hidden = true;
    $('#hundred-reveal').hidden = false;
    completeChapter(3);
    beep(740, 0.25, 'triangle');
    confetti(80);
    await wait(100);
    $('#hundred-reveal').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  });

  $('#run-loop').addEventListener('click', runLoopDemo);
  $('#run-simulation').addEventListener('click', async event => {
    const button = event.currentTarget;
    button.disabled = true;
    $('#simulation-label').textContent = 'Shuffling 100,000 slips…';
    $('#simulation-fill').style.width = '8%';
    await wait(350);
    const successes = simulatePrisons(1000);
    const percentage = successes / 10;
    $('#simulation-fill').style.width = `${percentage}%`;
    $('#simulation-label').textContent = `${successes}/1,000 escaped · ${percentage.toFixed(1)}%`;
    button.textContent = 'Run again';
    button.disabled = false;
    beep(620, 0.18, 'triangle');
  });
  $('#restart-all').addEventListener('click', () => {
    window.location.hash = 'home';
    window.location.reload();
  });

  buildLoopBoxes();
  updateGuess();
})();
