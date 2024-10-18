def generate_fibonacci(max_value):
    """
    Generates Fibonacci numbers up to a given maximum value.

    Args:
    max_value (int): The maximum value up to which Fibonacci numbers are generated.

    Returns:
    list: A list of Fibonacci numbers that do not exceed the maximum value.

    Raises:
    TypeError: If max_value is not an integer.
    ValueError: If max_value is less than or equal to zero.
    """

    # Input validation
    if not isinstance(max_value, int):
        raise TypeError("max_value must be an integer.")
    if max_value <= 0:
        raise ValueError("max_value must be greater than zero.")

    # Initialize the list to store Fibonacci numbers
    fibonacci_numbers = []

    # Initialize the first two Fibonacci numbers
    a, b = 0, 1

    # Generate Fibonacci numbers up to the maximum value
    while a <= max_value:
        fibonacci_numbers.append(a)
        a, b = b, a + b

    return fibonacci_numbers


# Example usage
if __name__ == "__main__":
    max_value = -1
    try:
        fibonacci_numbers = generate_fibonacci(max_value)
        print(f"Fibonacci numbers up to {max_value}: {fibonacci_numbers}")
    except (TypeError, ValueError) as e:
        print(f"Error: {e}")