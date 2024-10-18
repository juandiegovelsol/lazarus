import socket
import threading

def handle_client(connection, client_address):
    try:
        print('Connection from:', client_address)
        while True:
            # Receive the data
            data = connection.recv(1024)

            # Check if data is empty or if the connection has been closed
            if not data:
                print(f"Connection closed by client {client_address}.")
                break  # Exit the loop if no data is received

            # Echo the received data back to the client
            connection.sendall(data)  # No decoding needed as we send the raw bytes
            
    except Exception as e:
        print(f"Error handling client {client_address}: {e}")
    finally:
        connection.close()
        print(f"Connection to {client_address} has been closed.")

def run_server():
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
