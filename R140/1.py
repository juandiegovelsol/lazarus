import re
import sys

def format_html(html_string):
    lines = html_string.split('\n')
    if lines[0] != '<!DOCTYPE html>':
        return "The input as entered is invalid."

    html_string = '\n'.join(lines[1:])

    # Remove leading/trailing whitespace
    html_string = html_string.strip()

    # Check for attributes in tags
    if re.search(r'<\w+\s+\w+', html_string):
        return "The input as entered is invalid."

    # Check for uppercase characters in tags
    if re.search(r'<[^>]*[A-Z][^>]*>', html_string):
        return "The input as entered is invalid."

    # Check for non-alphanumeric characters in tags
    if re.search(r'<[^>]*[^a-z0-9/][^>]*>', html_string):
        return "The input as entered is invalid."

    # Stack to keep track of indentation level
    stack = []

    # List to store formatted lines
    formatted_lines = []

    i = 0
    while i < len(html_string):
        # Check for opening tag
        if html_string[i] == '<' and html_string[i+1] != '/':
            j = html_string.find('>', i)
            if j == -1:
                return "The input as entered is invalid."
            tag = html_string[i+1:j]
            if not tag.isalnum() or not tag.islower():
                return "The input as entered is invalid."
            formatted_lines.append('    ' * len(stack) + '<' + tag + '>')
            stack.append(tag)
            i = j + 1
        # Check for closing tag
        elif html_string[i] == '<' and html_string[i+1] == '/':
            j = html_string.find('>', i)
            if j == -1:
                return "The input as entered is invalid."
            tag = html_string[i+2:j]
            if not stack or stack[-1] != tag:
                return "The input as entered is invalid."
            stack.pop()
            # If the last line is the opening tag of the current closing tag,
            # combine them into one line
            if formatted_lines and formatted_lines[-1].strip() == '<' + tag + '>':
                formatted_lines[-1] = '    ' * len(stack) + '<' + tag + '></' + tag + '>'
            else:
                formatted_lines.append('    ' * len(stack) + '</' + tag + '>')
            i = j + 1
        # If not a tag, it's text
        else:
            j = html_string.find('<', i)
            if j == -1:
                j = len(html_string)
            text = html_string[i:j]
            # If the last line is the opening tag of the current text,
            # combine them into one line
            if formatted_lines and formatted_lines[-1].endswith('>'):
                formatted_lines[-1] += text
            else:
                formatted_lines.append('    ' * len(stack) + text)
            i = j

    if stack:
        return "The input as entered is invalid."

    # Prepend the DOCTYPE declaration
    formatted_lines.insert(0, '<!DOCTYPE html>')

    return '\n'.join(formatted_lines)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python script_name.py '<html_string>'")
    else:
        print(format_html(sys.argv[1]))