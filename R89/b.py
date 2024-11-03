import pygame
import math
import time

pygame.init()

screen_width, screen_height = 800, 500
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Ball Shooting Game")

WHITE = (255, 255, 255)
RED = (255, 69, 0)
BLUE = (30, 144, 255)
BLACK = (0, 0, 0)

angle = 90
balls = []
goal = {"x": screen_width / 2, "y": 50, "width": 100, "height": 20, "speed": 2}
score = 0
remaining_time = 30
game_over = False
clock = pygame.time.Clock()

def shoot_ball(force):
    rad = math.radians(angle)
    speed = force * 50
    balls.append({
        "x": screen_width / 2,
        "y": screen_height - 20,
        "vx": speed * math.cos(rad),
        "vy": -speed * math.sin(rad)
    })

def update_goal():
    global goal
    goal["x"] += goal["speed"]
    if goal["x"] <= 0 or goal["x"] + goal["width"] >= screen_width:
        goal["speed"] = -goal["speed"]

def update_balls():
    global score
    for ball in balls[:]:
        ball["x"] += ball["vx"]
        ball["y"] += ball["vy"]
        if (ball["x"] < 0 or ball["x"] > screen_width or
                ball["y"] < 0 or ball["y"] > screen_height):
            balls.remove(ball)
        elif (goal["x"] <= ball["x"] <= goal["x"] + goal["width"] and
              goal["y"] <= ball["y"] <= goal["y"] + goal["height"]):
            balls.remove(ball)
            score += 1

def draw_elements():
    screen.fill(WHITE)

    pygame.draw.rect(screen, BLUE, (goal["x"], goal["y"], goal["width"], goal["height"]))

    rad = math.radians(angle)
    arrow_x = screen_width / 2 + 100 * math.cos(rad)
    arrow_y = screen_height - 20 - 100 * math.sin(rad)
    pygame.draw.line(screen, RED, (screen_width / 2, screen_height - 20), (arrow_x, arrow_y), 5)

    for ball in balls:
        pygame.draw.circle(screen, BLACK, (int(ball["x"]), int(ball["y"])), 6)

    font = pygame.font.Font(None, 36)
    score_text = font.render(f"Score: {score}", True, RED)
    timer_text = font.render(f"Time: {remaining_time}s", True, BLUE)
    screen.blit(score_text, (10, 10))
    screen.blit(timer_text, (screen_width - 150, 10))

start_time = time.time()
mouse_down = False
mouse_down_time = 0

while not game_over:
    elapsed_time = time.time() - start_time
    remaining_time = max(0, 30 - int(elapsed_time))

    if remaining_time == 0:
        if score >= 20:
            print(f"Game Over! You Win! Your score: {score}")
        else:
            print(f"Game Over! You Lose! Your score: {score}")
        game_over = True
        break

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_over = True
        elif event.type == pygame.MOUSEBUTTONDOWN:
            mouse_down = True
            mouse_down_time = pygame.time.get_ticks()
        elif event.type == pygame.MOUSEBUTTONUP:
            mouse_down = False
            hold_duration = pygame.time.get_ticks() - mouse_down_time
            force = min(1, hold_duration / 2000)
            shoot_ball(force)
        elif event.type == pygame.MOUSEMOTION:
            mouse_x, _ = pygame.mouse.get_pos()
            angle = 180 - max(0, min(180, (mouse_x / screen_width) * 180))

    update_goal()
    update_balls()

    draw_elements()

    pygame.display.flip()
    clock.tick(60)

pygame.quit()