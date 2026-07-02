# Imports 
import turtle
import os # For playing sound (Not working as of now )
import tkinter

# Game window SetUp 
wn= turtle.Screen()
wn.title(" Near impossible Pong By Aaryan Gupta")
wn.bgcolor("Black")
wn.setup(width=800, height=600)
wn.tracer(0)

paddle_b_dy= 1
paddle_a_dy=1 

# Score Variables 
Player_A_Score= 0
Player_B_Score= 0 

# ALL CONSTANTS #Paddle movement speed 
PADDLE_SPEED = 11.676767676767676767676767676767676767676767677676767676767667676767676767676767767676

# Paddle collision range (the lower the harrrderrrrr)
COLLISION_RANGE_OF_BALL_TO_PADDLE= 100 
PADDLE_FACE = 10.6767676767676767676767676767677676767676767676767677676767676767676767767676767677767676767676767676767676767676766776767676767 # width (in px) of the paddle's "front face" strip used for collisions

# Constant of how close the 2 paddles can be to the center 
PADDLE_BOUNDARY_FROM_CENTER= 0.00000000000000000000000000000000000000000000000000001

# Ball 1 speed constants (can be changed to make game harder or easier)
BALL_SPEED= 4.676767676767776767676767676767676767676767676767676767676

BALL2_YSPEED= 6
BALL2_XSPEED= 4

BALL3_SPEED= 3

BALL4_XSPEED= 4
BALL4_YSPEED= 5

# Boundary Constants
TOP_WALL= 290
BOTTOM_WALL= -290
RIGHT_WALL= 390
LEFT_WALL= -390

# List that will allow multiple keys to run at the same time yeha
pressed_keys = set()
def key_down(key):
    pressed_keys.add(key)
def key_up(key):
    pressed_keys.discard(key)

#Paddle A
paddle_a= turtle.Turtle()
paddle_a.speed(0)
paddle_a.shape("square")
paddle_a.color("white")
paddle_a.shapesize(stretch_wid=5, stretch_len=1) # Dimensions of both paddles-- length is 100 pixels vertical and width is 20 pixels horizontal...
paddle_a.penup()
paddle_a.goto(-350,0)
               
#Paddle B
paddle_b= turtle.Turtle()
paddle_b.speed(0)
paddle_b.shape("square")
paddle_b.color("white")
paddle_b.shapesize(stretch_wid=5, stretch_len=1)
paddle_b.penup()
paddle_b.goto(350,0)

#Ball no 1 (Normal Ball)
ball= turtle.Turtle()
ball.speed(0)
ball.shape("circle")
ball.color("green")
ball.penup()
ball.goto(0,0)
ball.dx = BALL_SPEED
ball.dy = -1* BALL_SPEED

# Ball no 2 (Normal Ball)
ball2= turtle.Turtle()
ball2.speed(0)
ball2.shape("square")
ball2.color("green")
ball2.penup()
ball2.goto(0,0)

ball2.dx = BALL2_XSPEED
ball2.dy = BALL2_YSPEED


#Ball no 3 (Bomb poisoned ball)
ball3= turtle.Turtle()
ball3.speed(0)
ball3.shape("circle")
ball3.color("red")
ball3.penup()
ball3.goto(0,0)
ball3.dx = ball3.dx = BALL3_SPEED
ball3.dy = -1*BALL3_SPEED

# Ball 4 (normal ball)
ball4= turtle.Turtle()
ball4.speed(0)
ball4.shape("circle")
ball4.color("green")
ball4.penup()
ball4.goto(0,0)
ball4.dx = BALL4_XSPEED
ball4.dy = BALL4_YSPEED

# Score Pen
pen= turtle.Turtle()
pen.speed(0)
pen.color("white")
pen.penup()
pen.hideturtle()
pen.goto(0,260)
pen.write(f"Player A: {Player_A_Score}  Player B: {Player_B_Score}", align="center", font=("Courier", 24, "normal"))

#Functions for paddle movement 
def paddle_a_up():
    global paddle_a_dy
    y = paddle_a.ycor()
    y = y + PADDLE_SPEED
    paddle_a.sety(y)
    paddle_a_dy=1

def paddle_a_down():
    global paddle_a_dy
    y = paddle_a.ycor()
    y = y - PADDLE_SPEED
    paddle_a.sety(y)
    paddle_a_dy=-1


def paddle_a_right():
    x = paddle_a.xcor()
    x = x+ PADDLE_SPEED
    paddle_a.setx(x)
    if paddle_a.xcor()> (-1*PADDLE_BOUNDARY_FROM_CENTER):
        paddle_a.setx(-350)

def paddle_a_left():
     x = paddle_a.xcor()
     x = x- PADDLE_SPEED
     paddle_a.setx(x)
     if paddle_a.xcor()<-350:
         paddle_a.setx(-350)
         
def paddle_b_left():
    x = paddle_b.xcor()
    x = x - PADDLE_SPEED
    paddle_b.setx(x)
    if paddle_b.xcor()<PADDLE_BOUNDARY_FROM_CENTER:
        paddle_b.setx(350)

def paddle_b_right():
    x = paddle_b.xcor()
    x = x + PADDLE_SPEED
    paddle_b.setx(x)
    if paddle_b.xcor()>350:
        paddle_b.setx(350)

def paddle_b_down():
    global paddle_b_dy
    y = paddle_b.ycor()
    y = y - PADDLE_SPEED
    paddle_b.sety(y)
    paddle_b_dy=-1

   
def paddle_b_up():
    global paddle_b_dy
    y = paddle_b.ycor()
    y = y + PADDLE_SPEED
    paddle_b.sety(y)
    paddle_b_dy=1 

#Keyboard Bindings for paddle movement
wn.listen()

for k in ['w', 's', 'a', 'd', 'Up', 'Down', 'Left', 'Right']:
    wn.onkeypress((lambda kk=k: key_down(kk)), k)
    wn.onkeyrelease((lambda kk=k: key_up(kk)), k)

#Main game loop
while True:
    wn.update()
    if 'w' in pressed_keys:
        paddle_a_up()
    if 's' in pressed_keys:
        paddle_a_down()
    if 'a' in pressed_keys:
        paddle_a_left()
    if 'd' in pressed_keys:
        paddle_a_right()

    if 'Up' in pressed_keys:
        paddle_b_up()
    if 'Down' in pressed_keys:
        paddle_b_down()
    if 'Left' in pressed_keys:
        paddle_b_left()
    if 'Right' in pressed_keys:
        paddle_b_right()

     # Ball Movement (Ball 1):
    ball.setx(ball.xcor()+ ball.dx)
    ball.sety(ball.ycor()+ball.dy)

    # Ball movement (Ball 2):
    ball2.setx(ball2.xcor()+ ball2.dx)
    ball2.sety(ball2.ycor()+ball2.dy)

    # Ball movement (Ball 3):
    ball3.setx(ball3.xcor()+ ball3.dx)
    ball3.sety(ball3.ycor()+ball3.dy)

    #Ball movement (Ball 4):
    ball4.setx(ball4.xcor()+ ball4.dx)
    ball4.sety(ball4.ycor()+ball4.dy)

    #Border checking for BOUNCING BALLZ (So that ball bounces off upon hitting wall boundary x,y) (Once it hits y boundaries it'll bounce off..../ but when it hits the x walls it eans the person failed to bounce it off with their paddle so ill teleport ball back to zero and reverse x dir and adjust score)
    # Ball 1
    if ball.ycor() >= 290:
        ball.sety(290)
        ball.dy*=-1
        os.system("afplay boing1.wav&") 

    if ball.ycor() <= -290:
        ball.sety(-290)
        ball.dy*=-1
        os.system("afplay boing1.wav&")  

    if ball.xcor() >= 390:
        ball.setx(0)
        ball.sety(0)
        ball.dx= ball.dx*-1 
        Player_A_Score+=1
        pen.clear()
        pen.write(f"Player A: {Player_A_Score}  Player B: {Player_B_Score}", align="center", font=("Courier", 24, "normal"))

    if ball.xcor()<= -390:
        ball.setx(0)
        ball.sety(0)
        ball.dx= ball.dx*-1
        Player_B_Score+=1
        pen.clear()
        pen.write(f"Player A: {Player_A_Score}  Player B: {Player_B_Score}", align="center", font=("Courier", 24, "normal"))

    # Ball 2 
    if ball2.ycor() >= 290:
        ball2.sety(290)
        ball2.dy*=-1
        os.system("afplay boing1.wav&") 

    if ball2.ycor() <= -290:
        ball2.sety(-290)
        ball2.dy*=-1
        os.system("afplay boing1.wav&") 

    if ball2.xcor() >= 390:
        ball2.setx(0)
        ball2.sety(0)
        ball2.dx= ball2.dx*-1 
        Player_A_Score+=1
        pen.clear()
        pen.write(f"Player A: {Player_A_Score}  Player B: {Player_B_Score}", align="center", font=("Courier", 24, "normal"))

    if ball2.xcor()<= -390:
        ball2.setx(0)
        ball2.sety(0)
        ball2.dx= ball2.dx*-1
        Player_B_Score+=1
        pen.clear()
        pen.write(f"Player A: {Player_A_Score}  Player B: {Player_B_Score}", align="center", font=("Courier", 24, "normal"))

    # Ball 3 (WHAT THE BOMB BOMBA)
    if ball3.ycor() >= 290:
        ball3.sety(290)
        ball3.dy*=-1
        os.system("afplay boing1.wav&") 
        BALL3_SPEED+=2

    if ball3.ycor() <= -290:
        ball3.sety(-290)
        ball3.dy*=-1
        os.system("afplay boing1.wav&") 
        BALL3_SPEED+=2

    if ball3.xcor() >= 390:
        ball3.setx(0)
        ball3.sety(0)
        ball3.dx= ball3.dx*-1
        BALL3_SPEED+=2

    if ball3.xcor()<= -390:
        ball3.setx(0)
        ball3.sety(0)
        ball3.dx= ball3.dx*-1
        BALL3_SPEED+=2

    # Ball 4 (FRIENDLY BALL SIA)
    if ball4.ycor() >= 290:
        ball4.sety(290)
        ball4.dy*=-1
        os.system("afplay boing1.wav&")

    if ball4.ycor() <= -290:
        ball4.sety(-290)
        ball4.dy*=-1
        os.system("afplay boing1.wav&")

    if ball4.xcor() >= 390:
         ball4.setx(0)
         ball4.sety(0)
         ball4.dx= ball4.dx*-1 
         Player_A_Score+=1
         pen.clear()
         pen.write(f"Player A: {Player_A_Score}  Player B: {Player_B_Score}", align="center", font=("Courier", 24, "normal"))

    if ball4.xcor()<= -390:
        ball4.setx(0)
        ball4.sety(0)
        ball4.dx= ball4.dx*-1
        Player_B_Score+=1
        pen.clear()
        pen.write(f"Player A: {Player_A_Score}  Player B: {Player_B_Score}", align="center", font=("Courier", 24, "normal"))
       
    if paddle_b.ycor()>290:
        paddle_b.sety(290)
    if paddle_b.ycor()<-290:
        paddle_b.sety(-290)
    if paddle_a.ycor()>290:
        paddle_a.sety(290)
    if paddle_a.ycor()<-290:
        paddle_a.sety(-290)
# Paddle and Ball Collisions
    
    # Ball 1 Paddle B 
    if (ball.dx > 0 and abs(ball.ycor() - paddle_b.ycor()) <= COLLISION_RANGE_OF_BALL_TO_PADDLE and (paddle_b.xcor() - 10) <= ball.xcor() <= paddle_b.xcor()):
        ball.setx(paddle_b.xcor() - 11)  # place just outside the face

        ball.dx *= -1
        os.system("afplay /Users/aaryangupta/Desktop/G9 PYTHON/Turtle/Pong game/boing1.wav&") 
        if paddle_b_dy==1:
            BALL_SPEED+=3
            ball.dy= abs(ball.dy)
        elif paddle_b_dy==-1:
            BALL_SPEED+=3
            ball.dy= -1*abs(ball.dy)

    # Ball 1 Paddle A
    if (ball.xcor() >= paddle_a.xcor() and ball.xcor() <= (paddle_a.xcor() + 10) and ball.dx < 0 and (paddle_a.ycor() - COLLISION_RANGE_OF_BALL_TO_PADDLE) < ball.ycor() < (paddle_a.ycor() + COLLISION_RANGE_OF_BALL_TO_PADDLE)):
        ball.setx(paddle_a.xcor()+11)
        ball.dx *= -1
        os.system("afplay /Users/aaryangupta/Desktop/G9 PYTHON/Turtle/Pong game/boing1.wav&")  
        if paddle_a_dy==1:
            BALL_SPEED+=3
            ball.dy= abs(ball.dy)
        elif paddle_a_dy==-1:
            BALL_SPEED+=3
            ball.dy= -1*abs(ball.dy)

    # Ball 2 Paddle A
    if (ball2.xcor() >= paddle_a.xcor() and ball2.xcor() <= (paddle_a.xcor() + 10) and ball2.dx < 0 and (paddle_a.ycor() - COLLISION_RANGE_OF_BALL_TO_PADDLE) < ball2.ycor() < (paddle_a.ycor() + COLLISION_RANGE_OF_BALL_TO_PADDLE)):
        ball2.setx(paddle_a.xcor()+11)
        ball2.dx *= -1
        os.system("afplay /Users/aaryangupta/Desktop/G9 PYTHON/Turtle/Pong game/boing1.wav&")  
        if paddle_a_dy==1:
            BALL2_XSPEED+=3
            BALL2_YSPEED+=3
            ball2.dy= abs(ball2.dy)
        elif paddle_a_dy==-1:
            BALL2_XSPEED+=3
            BALL2_YSPEED+=3
            ball2.dy= -1*abs(ball2.dy)
       

    # Ball 2 Paddle B
    if (ball2.xcor() >= (paddle_b.xcor() - 10) and ball2.xcor() <= paddle_b.xcor() and ball2.dx > 0 and (paddle_b.ycor() - COLLISION_RANGE_OF_BALL_TO_PADDLE) < ball2.ycor() < (paddle_b.ycor() + COLLISION_RANGE_OF_BALL_TO_PADDLE)):
        ball2.setx(paddle_b.xcor()-11)
        ball2.dx *= -1
        os.system("afplay /Users/aaryangupta/Desktop/G9 PYTHON/Turtle/Pong game/boing1.wav&")  
        if paddle_b_dy==1:
            BALL2_XSPEED+=3
            BALL2_YSPEED+=3
            ball2.dy= abs(ball2.dy)
        elif paddle_b_dy==-1:
            BALL2_XSPEED+=3
            BALL2_YSPEED+=3
            ball2.dy= -1*abs(ball2.dy)


    # Bomb ball with Paddle A
    if (ball3.xcor() >= paddle_a.xcor() and ball3.xcor() <= (paddle_a.xcor() + 10) and ball3.dx < 0 and (paddle_a.ycor() - COLLISION_RANGE_OF_BALL_TO_PADDLE) < ball3.ycor() < (paddle_a.ycor() + COLLISION_RANGE_OF_BALL_TO_PADDLE)):
        ball3.setx(paddle_a.xcor()+11)
        ball3.dx *= -1
        Player_A_Score-=1
        pen.clear()
        pen.write(f"Player A: {Player_A_Score}  Player B: {Player_B_Score}", align="center", font=("Courier", 24, "normal"))
        os.system("afplay /Users/aaryangupta/Desktop/G9 PYTHON/Turtle/Pong game/boing1.wav&")  

    # Bomb ball with Paddle B
    if (ball3.xcor() >= (paddle_b.xcor() - 10) and ball3.xcor() <= paddle_b.xcor() and ball3.dx > 0 and (paddle_b.ycor() - COLLISION_RANGE_OF_BALL_TO_PADDLE) < ball3.ycor() < (paddle_b.ycor() + COLLISION_RANGE_OF_BALL_TO_PADDLE)):
        ball3.setx(paddle_b.xcor()-11)
        ball3.dx *= -1
        Player_B_Score-=1
        pen.clear()
        pen.write(f"Player A: {Player_A_Score}  Player B: {Player_B_Score}", align="center", font=("Courier", 24, "normal"))
        os.system("afplay /Users/aaryangupta/Desktop/G9 PYTHON/Turtle/Pong game/boing1.wav&") 
   

    # Ball 4 paddle A
    if (ball4.xcor() >= paddle_a.xcor() and ball4.xcor() <= (paddle_a.xcor() + 10) and ball4.dx < 0 and (paddle_a.ycor() - COLLISION_RANGE_OF_BALL_TO_PADDLE) < ball4.ycor() < (paddle_a.ycor() + COLLISION_RANGE_OF_BALL_TO_PADDLE)):
        ball4.setx(paddle_a.xcor()+11)
        ball4.dx *= -1
        os.system("afplay /Users/aaryangupta/Desktop/G9 PYTHON/Turtle/Pong game/boing1.wav&")
        if paddle_a_dy==1:
            BALL4_XSPEED+=3
            BALL4_YSPEED+=3
            ball4.dy= abs(ball4.dy)
        elif paddle_a_dy==-1:
            BALL4_XSPEED+=3
            BALL4_YSPEED+=3
            ball4.dy= -1*abs(ball4.dy)
    # Ball 4 paddle B
    if (ball4.xcor() >= (paddle_b.xcor() - 10) and ball4.xcor() <= paddle_b.xcor() and ball4.dx > 0 and (paddle_b.ycor() - COLLISION_RANGE_OF_BALL_TO_PADDLE) < ball4.ycor() < (paddle_b.ycor() + COLLISION_RANGE_OF_BALL_TO_PADDLE)):
        ball4.setx(paddle_b.xcor()-11)
        ball4.dx *= -1
        os.system("afplay /Users/aaryangupta/Desktop/G9 PYTHON/Turtle/Pong game/boing1.wav&")
        if paddle_b_dy==1:
            BALL4_XSPEED+=3
            BALL4_YSPEED+=3
            ball4.dy= abs(ball4.dy)
        elif paddle_b_dy==-1:
            BALL4_XSPEED+=3
            BALL4_YSPEED+=3
            ball4.dy= -1*abs(ball4.dy)

    # AI Player(Hits regular balls not programmaed to dodge bomb balls, so that not too hard lah)
    # LIST OF 3 SAFE BALLS-- BALL , BALL 2, BALL 4 
    # Bomb ball is ball 3


    
   

    #Endgame and game reset upon pressing the spacebar

    def reset_game():
        global Player_A_Score, Player_B_Score

        ball.setx(0)
        ball.sety(0)
        ball2.setx(0)
        ball2.sety(0)
        ball3.setx(0)
        ball3.sety(0)
        ball4.setx(0)
        ball4.sety(0)
        Player_A_Score=0
        Player_B_Score=0
        pen.clear()
        pen.write(f"Player A: {Player_A_Score}  Player B: {Player_B_Score}", align="center", font=("Courier", 24, "normal"))


    if Player_A_Score>=20 :
        pen.clear()
        pen.write("Player A Wins! Press space to Reset", align="center", font=("Courier", 24, "normal"))
        wn.onkeypress(reset_game, 'space')

    if Player_B_Score>=20 :
        pen.clear()
        pen.write("Player B Wins! Press space to Reset", align="center", font=("Courier", 24, "normal"))
        wn.onkeypress(reset_game, 'space')
