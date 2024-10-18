import socket

def run_client():
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(('localhost', 65432))
    
    while True:
        message = input("Enter a message to send to the server (or 'quit' to exit): ")
        if message.lower() == 'quit':
            break
        
        client_socket.sendall(message.encode('utf-8'))
        response = client_socket.recv(1024)
        print(f"Server response: {response.decode('utf-8')}")

    client_socket.close()

if __name__ == "__main__":
    run_client()