import re
import sys

def format_html(html_string):
    if not html_string.startswith('<!DOCTYPE html>'):
        return "The input as entered is invalid."
    
    
    html_string = html_string[len('<!DOCTYPE html>'):]
    html_string = html_string.strip()
    
    stack = []
    formatted_lines = []
    text_buffer = ""
    i = 0
    
    while i < len(html_string):
        if html_string[i] == '<' and html_string[i+1] != '/':
            j = html_string.find('>', i)
            if j == -1:
                return "The input as entered is invalid."
            
            tag = html_string[i+1:j]
            formatted_lines.append('    ' * len(stack) + '<' + tag + '>')
            stack.append(tag)
            i = j + 1
            
        elif html_string[i] == '<' and html_string[i+1] == '/':
            j = html_string.find('>', i)
            if j == -1:
                return "The input as entered is invalid."
                
            tag = html_string[i+2:j]
            if not stack or stack[-1] != tag:
                return "The input as entered is invalid."
                
            stack.pop()
            
            next_char_index = j + 1
            next_non_space = html_string.find('<', next_char_index) if next_char_index < len(html_string) else -1
            
            if formatted_lines and '<' + tag + '>' in formatted_lines[-1]:
                if next_non_space == -1 or html_string[next_char_index:next_non_space].strip() == '':
                    formatted_lines[-1] = '    ' * len(stack) + '<' + tag + '>' + text_buffer + '</' + tag + '>'
                    text_buffer = ""
                else:
                    formatted_lines.append('    ' * len(stack) + '</' + tag + '>')
            else:
                formatted_lines.append('    ' * len(stack) + '</' + tag + '>')
            
            i = j + 1
            
        else:
            j = html_string.find('<', i)
            if j == -1:
                j = len(html_string)
            text = html_string[i:j].strip()
            if text:
                text_buffer = text
            i = j
            
    if stack:
        return "The input as entered is invalid."

    formatted_lines.insert(0, '<!DOCTYPE html>')
    return '\n'.join(formatted_lines)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python script_name.py '<html_string>'")
    else:
        print(format_html(sys.argv[1]))