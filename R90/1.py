import re
from datetime import datetime

def validate_credit_card(card_number, expiry_date, cvv):
    """
    Validates a credit card number, expiry date, and CVV.

    Args:
        card_number (str): Credit card number.
        expiry_date (str): Expiry date in MM/YY format.
        cvv (str): CVV number.

    Returns:
        dict: A dictionary containing the card type, number, expiry date, CVV, and validity.
    """

    # Remove spaces and dashes from the card number
    card_number = re.sub(r'[\s-]', '', card_number)

    # Identify the card type
    if re.match(r'^4\d{15}$', card_number):
        card_type = 'Visa'
    elif re.match(r'^5[1-5]\d{14}$', card_number):
        card_type = 'Mastercard'
    elif re.match(r'^3[47]\d{13}$', card_number):
        card_type = 'American Express'
    else:
        return {
            'card_type': None,
            'number': card_number,
            'expiry_date': expiry_date,
            'cvv': cvv,
            'is_valid': False,
            'error': 'Invalid card number'
        }

    # Validate the card number using the Luhn algorithm
    if not luhn_check(card_number):
        return {
            'card_type': card_type,
            'number': card_number,
            'expiry_date': expiry_date,
            'cvv': cvv,
            'is_valid': False,
            'error': 'Invalid card number (Luhn check failed)'
        }

    # Validate the expiry date
    if not validate_expiry_date(expiry_date):
        return {
            'card_type': card_type,
            'number': card_number,
            'expiry_date': expiry_date,
            'cvv': cvv,
            'is_valid': False,
            'error': 'Invalid expiry date'
        }

    # Validate the CVV
    if not validate_cvv(cvv, card_type):
        return {
            'card_type': card_type,
            'number': card_number,
            'expiry_date': expiry_date,
            'cvv': cvv,
            'is_valid': False,
            'error': 'Invalid CVV'
        }

    return {
        'card_type': card_type,
        'number': card_number,
        'expiry_date': expiry_date,
        'cvv': cvv,
        'is_valid': True
    }

def luhn_check(card_number):
    """
    Performs a Luhn check on a credit card number.

    Args:
        card_number (str): Credit card number.

    Returns:
        bool: True if the card number is valid, False otherwise.
    """
    def digits_of(n):
        return [int(d) for d in str(n)]
    digits = digits_of(card_number)
    odd_digits = digits[-1::-2]
    even_digits = digits[-2::-2]
    checksum = sum(odd_digits)
    for d in even_digits:
        checksum += sum(digits_of(d*2))
    return checksum % 10 == 0

def validate_expiry_date(expiry_date):
    """
    Validates an expiry date in MM/YY format.

    Args:
        expiry_date (str): Expiry date in MM/YY format.

    Returns:
        bool: True if the expiry date is valid, False otherwise.
    """
    try:
        expiry_month, expiry_year = map(int, expiry_date.split('/'))
        current_date = datetime.now()
        current_month, current_year = current_date.month, current_date.year % 100
        if expiry_year < current_year or (expiry_year == current_year and expiry_month < current_month):
            return False
        return True
    except ValueError:
        return False

def validate_cvv(cvv, card_type):
    """
    Validates a CVV number.

    Args:
        cvv (str): CVV number.
        card_type (str): Card type (Visa, Mastercard, American Express).

    Returns:
        bool: True if the CVV is valid, False otherwise.
    """
    if card_type in ['Visa', 'Mastercard']:
        return re.match(r'^\d{3}$', cvv) is not None
    elif card_type == 'American Express':
        return re.match(r'^\d{4}$', cvv) is not None
    return False

# Example usage
print(validate_credit_card(None, '12/25', '123'))  # Visa
print(validate_credit_card('5105-1051-0510-5100', '12/25', '123'))  # Mastercard
print(validate_credit_card('3714-4963-5398-431', '12/25', '1234'))  # American Express
print(validate_credit_card('4111-1111-1111-1112', '12/25', '123'))  # Invalid card number (Luhn check failed)
print(validate_credit_card('4111-1111-1111-1111', '12/20', '123'))  # Invalid expiry date
print(validate_credit_card('4111-1111-1111-1111', '12/25', '1234'))  # Invalid CVV