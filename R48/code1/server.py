import socket
import threading

def handle_client(connection, client_address):
    """
    Handles a single client connection.
    
    Args:
    connection (socket): The socket connection to the client.
    client_address (tuple): The client's IP address and port.
    """
    try:
        print('Connection from:', client_address)
        
        while True:
            # Receive data from the client
            data = connection.recv(1024)
            
            # Check if any data was received
            if not data:
                print(f"No data received from client {client_address}. Closing connection.")
                break
            
            # Send the received data back to the client
            connection.sendall(data)
    
    except Exception as e:
        print(f"Error handling client {client_address}: {e}")
    finally:
        connection.close()

def run_server():
    """
    Runs the server, listening for incoming client connections.
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