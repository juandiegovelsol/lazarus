import socket

def run_client():
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(('localhost', 65432))
    
    while True:
        message = input("Enter a message to send to the server (or 'quit' to exit): ")
        
        # If the message is empty, prompt the user again
        if not message:  # Check if the message is empty
            print("You entered an empty message. Please enter a valid message.")
            continue  # Go to the next iteration of the loop
        
        if message.lower() == 'quit':
            break
        
        client_socket.sendall(message.encode('utf-8'))
        response = client_socket.recv(1024)
        
        # Check for the specific error code (if the server was modified to send codes)
        if response.decode('utf-8').startswith('400'):
            print("Error from server:", response.decode('utf-8'))
            break  # Exit the loop if there's an error

        print(f"Server response: {response.decode('utf-8')}")

    client_socket.close()

if __name__ == "__main__":
    run_client()
