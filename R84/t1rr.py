import pygame
import sys
import random

pygame.init()

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

SHAPES = {
    'General': [(0, 0), (40, 0), (40, 40), (0, 40)],
    'Round Soldier': [(10, 0), (20, 5), (20, 15), (10, 20), (0, 15), (0, 5)],
    'Triangle Soldier': [(10, 0), (20, 20), (0, 20)],
    'Square Soldier': [(0, 0), (20, 0), (20, 20), (0, 20)]
}

CELL_SIZE = 50
BOARD_WIDTH = 10
BOARD_HEIGHT = 5
WINDOW_WIDTH = BOARD_WIDTH * CELL_SIZE
WINDOW_HEIGHT = (BOARD_HEIGHT + 2) * CELL_SIZE
MARGIN = 20
WINDOW = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
FONT = pygame.font.Font(None, 24)

CARD_TYPES = ['Round Soldier', 'Triangle Soldier', 'Square Soldier']

UNIT_TYPES = {
    'General': {'hp': 25, 'ap': 2},
    'Round Soldier': {'hp': 4, 'ap': 2},
    'Triangle Soldier': {'hp': 3, 'ap': 3},
    'Square Soldier': {'hp': 2, 'ap': 4}
}

PLAYER1_CARDS = [
    {'type': 'Round Soldier', 'x': MARGIN, 'y': BOARD_HEIGHT * CELL_SIZE + MARGIN},
    {'type': 'Triangle Soldier', 'x': 2 * MARGIN + CELL_SIZE, 'y': BOARD_HEIGHT * CELL_SIZE + MARGIN},
    {'type': 'Square Soldier', 'x': 3 * MARGIN + 2 * CELL_SIZE, 'y': BOARD_HEIGHT * CELL_SIZE + MARGIN},
]
PLAYER2_CARDS = [
    {'type': 'Round Soldier', 'x': MARGIN, 'y': BOARD_HEIGHT * CELL_SIZE + MARGIN},
    {'type': 'Triangle Soldier', 'x': 2 * MARGIN + CELL_SIZE, 'y': BOARD_HEIGHT * CELL_SIZE + MARGIN},
    {'type': 'Square Soldier', 'x': 3 * MARGIN + 2 * CELL_SIZE, 'y': BOARD_HEIGHT * CELL_SIZE + MARGIN},
]

PLAYER1_UNITS = [
    {'type': 'General', 'x': 0, 'y': BOARD_HEIGHT // 2, 'hp': UNIT_TYPES['General']['hp'], 'ap': UNIT_TYPES['General']['ap'], 'movement': 2, 'attacked': False},
]
PLAYER2_UNITS = [
    {'type': 'General', 'x': BOARD_WIDTH - 1, 'y': BOARD_HEIGHT // 2, 'hp': UNIT_TYPES['General']['hp'], 'ap': UNIT_TYPES['General']['ap'], 'movement': 2, 'attacked': False},
]

DRAGGING_CARD = None
DRAGGING_UNIT = None
TURN_NUMBER = 1
CURRENT_PLAYER = 1
END_TURN_BUTTON = {'x': WINDOW_WIDTH - CELL_SIZE - MARGIN, 'y': WINDOW_HEIGHT - CELL_SIZE - MARGIN}

def draw_new_card(player):
    if player == 1:
        cards = PLAYER1_CARDS
    else:
        cards = PLAYER2_CARDS
    new_card_type = random.choice(CARD_TYPES)
    new_card_x = MARGIN + len(cards) * (CELL_SIZE + MARGIN)
    new_card = {'type': new_card_type, 'x': new_card_x, 'y': BOARD_HEIGHT * CELL_SIZE + MARGIN}
    cards.append(new_card)

def realign_cards(player):
    if player == 1:
        cards = PLAYER1_CARDS
    else:
        cards = PLAYER2_CARDS
    for i, card in enumerate(cards):
        card['x'] = MARGIN + i * (CELL_SIZE + MARGIN)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if CURRENT_PLAYER == 1:
                cards = PLAYER1_CARDS
            else:
                cards = PLAYER2_CARDS
            for card in cards:
                if (card['x'] < event.pos[0] < card['x'] + CELL_SIZE and
                        card['y'] < event.pos[1] < card['y'] + CELL_SIZE):
                    DRAGGING_CARD = card
                    break
            if CURRENT_PLAYER == 1:
                units = PLAYER1_UNITS
            else:
                units = PLAYER2_UNITS
            for unit in units:
                if (unit['x'] * CELL_SIZE < event.pos[0] < (unit['x'] + 1) * CELL_SIZE and
                        unit['y'] * CELL_SIZE < event.pos[1] < (unit['y'] + 1) * CELL_SIZE):
                    DRAGGING_UNIT = unit
                    break
            if (END_TURN_BUTTON['x'] < event.pos[0] < END_TURN_BUTTON['x'] + CELL_SIZE and
                    END_TURN_BUTTON['y'] < event.pos[1] < END_TURN_BUTTON['y'] + CELL_SIZE):
                if CURRENT_PLAYER == 1:
                    units = PLAYER1_UNITS
                else:
                    units = PLAYER2_UNITS
                for unit in units:
                    unit['movement'] = 2
                    unit['attacked'] = False
                TURN_NUMBER += 1
                draw_new_card(CURRENT_PLAYER)
                realign_cards(CURRENT_PLAYER)
                CURRENT_PLAYER = 2 if CURRENT_PLAYER == 1 else 1
        elif event.type == pygame.MOUSEBUTTONUP:
            if DRAGGING_CARD:
                for x in range(BOARD_WIDTH):
                    for y in range(BOARD_HEIGHT):
                        if (x * CELL_SIZE < event.pos[0] < (x + 1) * CELL_SIZE and
                                y * CELL_SIZE < event.pos[1] < (y + 1) * CELL_SIZE):
                            if CURRENT_PLAYER == 1:
                                units = PLAYER1_UNITS
                                cards = PLAYER1_CARDS
                            else:
                                units = PLAYER2_UNITS
                                cards = PLAYER2_CARDS
                            if not any(u['x'] == x and u['y'] == y for u in units):
                                units.append({'type': DRAGGING_CARD['type'], 'x': x, 'y': y, 'hp': UNIT_TYPES[DRAGGING_CARD['type']]['hp'], 'ap': UNIT_TYPES[DRAGGING_CARD['type']]['ap'], 'movement': 2, 'attacked': False})
                                cards.remove(DRAGGING_CARD)
                                realign_cards(CURRENT_PLAYER)
                                break
                DRAGGING_CARD = None
            if DRAGGING_UNIT:
                for x in range(BOARD_WIDTH):
                    for y in range(BOARD_HEIGHT):
                        if (x * CELL_SIZE < event.pos[0] < (x + 1) * CELL_SIZE and
                                y * CELL_SIZE < event.pos[1] < (y + 1) * CELL_SIZE):
                            if CURRENT_PLAYER == 1:
                                units = PLAYER1_UNITS
                                enemy_units = PLAYER2_UNITS
                            else:
                                units = PLAYER2_UNITS
                                enemy_units = PLAYER1_UNITS
                            for enemy_unit in enemy_units:
                                if enemy_unit['x'] == x and enemy_unit['y'] == y:
                                    if not DRAGGING_UNIT['attacked']:
                                        DRAGGING_UNIT['attacked'] = True
                                        enemy_unit['hp'] -= DRAGGING_UNIT['ap']
                                        if enemy_unit['hp'] <= 0:
                                            enemy_units.remove(enemy_unit)
                                            if enemy_unit['type'] == 'General':
                                                print(f"Player {CURRENT_PLAYER} wins!")
                                                pygame.quit()
                                                sys.exit()
                                    break
                            else:
                                if not any(u['x'] == x and u['y'] == y for u in units):
                                    distance = abs(x - DRAGGING_UNIT['x']) + abs(y - DRAGGING_UNIT['y'])
                                    if distance <= DRAGGING_UNIT['movement']:
                                        DRAGGING_UNIT['x'] = x
                                        DRAGGING_UNIT['y'] = y
                                        DRAGGING_UNIT['movement'] -= distance
                            break
                DRAGGING_UNIT = None
        elif event.type == pygame.MOUSEMOTION and DRAGGING_CARD:
            DRAGGING_CARD['x'] = event.pos[0] - CELL_SIZE // 2
            DRAGGING_CARD['y'] = event.pos[1] - CELL_SIZE // 2

    WINDOW.fill(WHITE)

    for x in range(BOARD_WIDTH):
        for y in range(BOARD_HEIGHT):
            pygame.draw.rect(WINDOW, BLACK, (x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE), 1)

    for unit in PLAYER1_UNITS:
        points = [(x + unit['x'] * CELL_SIZE, y + unit['y'] * CELL_SIZE) for x, y in SHAPES[unit['type']]]
        pygame.draw.polygon(WINDOW, BLUE, points)
        text = FONT.render(str(unit['ap']), True, RED)
        WINDOW.blit(text, (unit['x'] * CELL_SIZE, unit['y'] * CELL_SIZE + CELL_SIZE - 20))
        text = FONT.render(str(unit['hp']), True, GREEN)
        WINDOW.blit(text, (unit['x'] * CELL_SIZE + CELL_SIZE - 20, unit['y'] * CELL_SIZE + CELL_SIZE - 20))
    for unit in PLAYER2_UNITS:
        points = [(x + unit['x'] * CELL_SIZE, y + unit['y'] * CELL_SIZE) for x, y in SHAPES[unit['type']]]
        pygame.draw.polygon(WINDOW, RED, points)
        text = FONT.render(str(unit['ap']), True, RED)
        WINDOW.blit(text, (unit['x'] * CELL_SIZE, unit['y'] * CELL_SIZE + CELL_SIZE - 20))
        text = FONT.render(str(unit['hp']), True, GREEN)
        WINDOW.blit(text, (unit['x'] * CELL_SIZE + CELL_SIZE - 20, unit['y'] * CELL_SIZE + CELL_SIZE - 20))

    if CURRENT_PLAYER == 1:
        cards = PLAYER1_CARDS
    else:
        cards = PLAYER2_CARDS
    for card in cards:
        if card == DRAGGING_CARD:
            points = [(x + card['x'], y + card['y']) for x, y in SHAPES[card['type']]]
            pygame.draw.polygon(WINDOW, GREEN, points)
        else:
            points = [(x + card['x'], y + card['y']) for x, y in SHAPES[card['type']]]
            pygame.draw.polygon(WINDOW, RED if CURRENT_PLAYER == 2 else BLUE, points)
        text = FONT.render(card['type'], True, BLACK)
        WINDOW.blit(text, (card['x'], card['y'] + CELL_SIZE + MARGIN))

    pygame.draw.rect(WINDOW, RED, (END_TURN_BUTTON['x'], END_TURN_BUTTON['y'], CELL_SIZE, CELL_SIZE))
    text = FONT.render('End Turn', True, BLACK)
    WINDOW.blit(text, (END_TURN_BUTTON['x'], END_TURN_BUTTON['y'] + CELL_SIZE // 2))

    text = FONT.render(f'Turn {TURN_NUMBER} - Player {CURRENT_PLAYER}', True, BLACK)
    WINDOW.blit(text, (MARGIN, WINDOW_HEIGHT - CELL_SIZE - MARGIN))

    if DRAGGING_CARD:
        for x in range(BOARD_WIDTH):
            for y in range(BOARD_HEIGHT):
                if CURRENT_PLAYER == 1:
                    units = PLAYER1_UNITS
                else:
                    units = PLAYER2_UNITS
                if not any(u['x'] == x and u['y'] == y for u in units):
                    pygame.draw.rect(WINDOW, GREEN, (x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE), 2)

    if DRAGGING_UNIT:
        for x in range(BOARD_WIDTH):
            for y in range(BOARD_HEIGHT):
                if CURRENT_PLAYER == 1:
                    units = PLAYER1_UNITS
                else:
                    units = PLAYER2_UNITS
                distance = abs(x - DRAGGING_UNIT['x']) + abs(y - DRAGGING_UNIT['y'])
                if distance <= DRAGGING_UNIT['movement']:
                    if not any(u['x'] == x and u['y'] == y for u in units):
                        pygame.draw.rect(WINDOW, BLUE if CURRENT_PLAYER == 1 else RED, (x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE), 2)

    pygame.display.flip()