const $ = (selector) => document.querySelector(selector);

export class BluffPhoneLayout {
  constructor() {
    this.enabled = false;
    this.roomId = null;
    this.pane = 'game';
    this.viewportContent = $('meta[name="viewport"]').content;
    this.homes = new Map();
    for (const selector of ['#seats', '#bluffTools', '.room-tools']) {
      const node = $(selector);
      const home = document.createComment(`Home for ${selector}`);
      node.before(home);
      this.homes.set(selector, home);
    }
    $('#phoneModeButton').addEventListener('click', () => this.set(!this.enabled, true));
    $('#phoneYes').addEventListener('click', () => {
      $('#phoneDialog').close();
      this.set(true, true);
    });
    $('#phoneNo').addEventListener('click', () => {
      $('#phoneDialog').close();
      this.set(false, true);
    });
    $('#phoneDialog').addEventListener('cancel', () => this.set(false, true));
    for (const button of document.querySelectorAll('[data-phone-view]'))
      button.addEventListener('click', () => this.view(button.dataset.phoneView));
    for (const selector of ['#gameSurface', '#phoneVideoPage']) {
      const surface = $(selector);
      let start;
      surface.addEventListener('pointerdown', (event) => {
        start =
          this.enabled && !event.target.closest('button,input,select,summary,dialog,#hand')
            ? { id: event.pointerId, x: event.clientX, y: event.clientY }
            : null;
      });
      surface.addEventListener('pointerup', (event) => {
        if (!start || start.id !== event.pointerId) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        start = null;
        if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
        if (selector === '#gameSurface' && dx > 0) this.view('video');
        if (selector === '#phoneVideoPage' && dx < 0) this.view('game');
      });
      surface.addEventListener('pointercancel', () => {
        start = null;
      });
    }
    window.addEventListener('resize', () => this.fitHand());
    window.visualViewport?.addEventListener('resize', () => this.fitHand());
  }

  sync(room) {
    if (room?.type !== 'bluff') {
      this.roomId = null;
      this.set(false);
      if ($('#phoneDialog').open) $('#phoneDialog').close();
      return;
    }
    if (room.id !== this.roomId) {
      this.roomId = room.id;
      let saved = null;
      try {
        saved = localStorage.getItem('cards.bluffPhoneMode');
      } catch {}
      this.set(saved === 'on');
      const phone =
        navigator.userAgentData?.mobile === true ||
        /iPhone|iPod|Android.*Mobile/i.test(navigator.userAgent);
      if (saved === null && phone && !$('#phoneDialog').open) $('#phoneDialog').showModal();
    }
    this.fitHand();
  }

  set(enabled, remember = false) {
    this.enabled = enabled;
    if (remember)
      try {
        localStorage.setItem('cards.bluffPhoneMode', enabled ? 'on' : 'off');
      } catch {}
    document.body.classList.toggle('phone-mode', enabled);
    $('meta[name="viewport"]').content = enabled
      ? `${this.viewportContent}, viewport-fit=cover`
      : this.viewportContent;
    $('#phoneTabs').hidden = !enabled;
    $('#phoneModeButton').textContent = enabled ? 'Desktop mode' : 'Phone mode';
    for (const [selector, target] of [
      ['#seats', '#phoneVideoSeats'],
      ['#bluffTools', '#phoneToolsHost'],
      ['.room-tools', '#phoneRoomTools']
    ]) {
      const node = $(selector);
      if (enabled) $(target).append(node);
      else this.homes.get(selector).after(node);
    }
    this.view('game');
    this.fitHand();
  }

  view(pane) {
    this.pane = pane;
    $('#gameSurface').hidden = this.enabled && pane !== 'game';
    $('#phoneVideoPage').hidden = !this.enabled || pane !== 'video';
    for (const button of document.querySelectorAll('[data-phone-view]'))
      button.setAttribute('aria-pressed', String(button.dataset.phoneView === pane));
  }

  fitHand() {
    if (!this.enabled) return;
    const hand = $('#hand');
    const columns = Math.min(
      10,
      Math.max(5, Math.floor((hand.clientWidth || window.innerWidth - 20) / 37))
    );
    hand.style.setProperty('--hand-columns', columns);
    hand.style.setProperty('--hand-rows', Math.max(1, Math.ceil(hand.children.length / columns)));
  }
}
