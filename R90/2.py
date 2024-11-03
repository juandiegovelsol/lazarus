import re
from datetime import datetime

# Define card types and their properties
CARD_TYPES = {
    'Visa': {'pattern': r'^4\d{12}(\d{3})?$', 'length': [16], 'cvv_length': 3},
    'Mastercard': {'pattern': r'^5[1-5]\d{14}$', 'length': [16], 'cvv_length': 3},
    'American Express': {'pattern': r'^3[47]\d{13}$', 'length': [15], 'cvv_length': 4}
}

def validate_card_number(card_number):
    """
    Validate card number using the Luhn algorithm checksum.
    
    Args:
    card_number (str): The card number to be validated.
    
    Returns:
    bool: True if the card number is valid, False otherwise.
    """
    # Convert card number to a list of integers
    card_number = [int(x) for x in card_number.replace(' ', '').replace('-', '')]
    
    # Reverse the card number
    card_number = card_number[::-1]
    
    # Double every second digit
    for i in range(1, len(card_number), 2):
        card_number[i] = card_number[i] * 2
        # Subtract 9 from numbers over 9
        if card_number[i] > 9:
            card_number[i] -= 9
    
    # If the sum of the digits is divisible by 10, the number is valid
    return sum(card_number) % 10 == 0

def validate_expiry_date(expiry_date):
    """
    Validate expiry date in MM/YY format.
    
    Args:
    expiry_date (str): The expiry date to be validated.
    
    Returns:
    bool: True if the expiry date is valid, False otherwise.
    """
    try:
        expiry_date = datetime.strptime(expiry_date, '%m/%y')
        return expiry_date > datetime.now()
    except ValueError:
        return False

def validate_cvv(cvv, card_type):
    """
    Validate CVV based on the card type.
    
    Args:
    cvv (str): The CVV to be validated.
    card_type (str): The type of the card.
    
    Returns:
    bool: True if the CVV is valid, False otherwise.
    """
    return len(cvv) == CARD_TYPES[card_type]['cvv_length'] and cvv.isdigit()

def credit_card_validator(card_number, expiry_date, cvv):
    """
    Validate a credit card.
    
    Args:
    card_number (str): The card number to be validated.
    expiry_date (str): The expiry date to be validated.
    cvv (str): The CVV to be validated.
    
    Returns:
    dict: A dictionary containing the card type, number, expiry date, CVV, and validity.
    """
    card_number = card_number.replace(' ', '').replace('-', '')
    
    # Identify the card type
    for card_type, properties in CARD_TYPES.items():
        if re.match(properties['pattern'], card_number):
            break
    else:
        return {'error': 'Invalid card number'}
    
    # Validate the card number
    if not validate_card_number(card_number):
        return {'error': 'Invalid card number'}
    
    # Validate the expiry date
    if not validate_expiry_date(expiry_date):
        return {'error': 'Invalid expiry date'}
    
    # Validate the CVV
    if not validate_cvv(cvv, card_type):
        return {'error': 'Invalid CVV'}
    
    return {
        'card_type': card_type,
        'number': card_number,
        'expiry_date': expiry_date,
        'cvv': cvv,
        'is_valid': True
    }

# Test cases
print(credit_card_validator('4111 1111 1111 1111', '12/25', '123'))  # Visa
print(credit_card_validator('5111111111111111', '12/25', '123'))  # Mastercard
print(credit_card_validator('3714-4963-5398-431', '12/25', '1234'))  # American Express
print(credit_card_validator('4111-1111-1111-111', '12/25', '123'))  # Invalid card number
print(credit_card_validator('4111-1111-1111-1111', '12/20', '123'))  # Invalid expiry date
print(credit_card_validator('4111-1111-1111-1111', '12/25', '12'))  # Invalid CVV