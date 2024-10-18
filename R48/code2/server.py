import socket
import threading

def handle_client(connection, client_address):
    """
    Handle communication with a single client.
    
    Args:
    connection (socket): The socket connection to the client.
    client_address (tuple): The client's IP address and port.
    """
    try:
        print(f'Connection from: {client_address}')
        
        while True:
            # Receive data from the client
            data = connection.recv(1024)
            
            # Check if the client has disconnected
            if not data:
                print(f'Client {client_address} disconnected.')
                break
            
            # Decode the received data
            message = data.decode('utf-8')
            
            # Check if the message is not empty
            if message.strip():
                print(f'Received message from {client_address}: {message}')
                # Send the message back to the client
                connection.sendall(data)
            else:
                print(f'Received empty message from {client_address}.')
                # Send a response back to the client indicating an empty message
                connection.sendall('Empty message received.'.encode('utf-8'))
    
    except Exception as e:
        print(f"Error handling client {client_address}: {e}")
    finally:
        connection.close()

def run_server():
    """
    Run the server and listen for incoming connections.
    """
    server_address = ('localhost', 65432)
    
    # Create a TCP/IP socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        server_socket.bind(server_address)
        server_socket.listen(5)
        
        print("Server is listening on port 65432...")
        while True:
            connection, client_address = server_socket.accept()
            # Handle each client in a new thread
            client_thread = threading.Thread(target=handle_client, args=(connection, client_address))
            client_thread.start()

if __name__ == "__main__":
    run_server()