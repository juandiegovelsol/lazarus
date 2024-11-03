import sys
import re
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QLineEdit, QPushButton, QGridLayout, QMessageBox

class Calculator(QWidget):
    def __init__(self):
        super().__init__()
        
        self.setWindowTitle("Simple Calculator")
        self.setGeometry(100, 100, 400, 600)

        self.expression = ""

        # Layout setup
        self.layout = QVBoxLayout()
        
        # Entry widget to display the expression
        self.entry = QLineEdit()
        font = self.entry.font()  # Get the font object
        font.setPointSize(24)  # Set the font size
        self.entry.setFont(font)  # Set the font
        self.entry.setReadOnly(True)
        self.layout.addWidget(self.entry)

        # Create buttons
        self.create_buttons()

        self.setLayout(self.layout)

    def create_buttons(self):
        grid_layout = QGridLayout()

        buttons = [
            '7', '8', '9', '/',
            '4', '5', '6', '*',
            '1', '2', '3', '-',
            '0', 'C', '=', '+',
            '(', ')'
        ]

        row_val = 0
        col_val = 0
        for button in buttons:
            btn = QPushButton(button)
            font = btn.font()  # Get the font object
            font.setPointSize(18)  # Set the font size
            btn.setFont(font)  # Set the font
            btn.clicked.connect(lambda checked, b=button: self.on_button_click(b))
            grid_layout.addWidget(btn, row_val, col_val)
            col_val += 1
            if col_val > 3:
                col_val = 0
                row_val += 1

        self.layout.addLayout(grid_layout)

    def on_button_click(self, char):
        """Handle button clicks."""
        if char == '=':
            result = self.evaluate_expression(self.expression)
            if isinstance(result, str):  # Check if result is a string
                self.entry.setText(result)
            else:
                self.entry.setText(str(result))
            self.expression = ""
        elif char == 'C':
            self.entry.clear()
            self.expression = ""
        else:
            self.expression += str(char)
            self.entry.setText(self.expression)

    def evaluate_expression(self, expression):
        """Evaluate a mathematical expression."""
        try:
            # Sanitize input to allow only valid characters
            if re.match(r'^[0-9+\-*/().\s]+$', expression):
                result = eval(expression)
                return result
            else:
                return "Invalid input"
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Error: {str(e)}")
            return "Error"

if __name__ == "__main__":
    app = QApplication(sys.argv)
    calculator = Calculator()
    calculator.show()
    sys.exit(app.exec_())