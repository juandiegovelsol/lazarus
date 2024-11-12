import numpy as np
import matplotlib.pyplot as plt

# Define basic quantum gates as matrices
def pauli_x():
    return np.array([[0, 1], [1, 0]])

def hadamard():
    return (1 / np.sqrt(2)) * np.array([[1, 1], [1, -1]])

def identity():
    return np.array([[1, 0], [0, 1]])

def cnot():
    return np.array([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]])

# Initialize basic qubit states |0> and |1>
state_zero = np.array([[1], [0]])
state_one = np.array([[0], [1]])

# Apply a single-qubit gate to a given qubit state
def single_qubit_gate(gate, qubit_state):
    return np.dot(gate, qubit_state)

# Apply a two-qubit gate (e.g., CNOT) to a combined two-qubit state
def two_qubit_gate(gate, combined_state):
    return np.dot(gate, combined_state)

# Compute the tensor (Kronecker) product of two qubit states
def tensor_product(state_a, state_b):
    return np.kron(state_a, state_b)

# Visualization function for the quantum circuit
def draw_circuit():
    fig, ax = plt.subplots()
    
    # Set up the plot
    ax.set_xlim(0, 8)
    ax.set_ylim(0, 3)
    ax.axis('off')

    # Draw the two qubit lines
    ax.plot([1, 7], [2, 2], 'k', lw=1.5)  # Qubit 1 line
    ax.plot([1, 7], [1, 1], 'k', lw=1.5)  # Qubit 2 line

    # Label the qubits
    ax.text(0.5, 2, r'$|0\rangle$', fontsize=12, ha='right')
    ax.text(0.5, 1, r'$|0\rangle$', fontsize=12, ha='right')

    # Draw Hadamard gate on qubit 1
    ax.add_patch(plt.Rectangle((2, 1.75), 0.5, 0.5, fill=True, color="white", edgecolor="black"))
    ax.text(2.15, 2, 'H', fontsize=12, va='center', ha='center')

    # Draw CNOT gate with control on qubit 1 and target on qubit 2
    ax.plot([5, 5], [1, 2], 'k-', lw=1.5)          # Control line
    ax.plot(5, 2, 'ko', markersize=8)              # Control dot
    ax.add_patch(plt.Circle((5, 1), 0.25, fill=False, edgecolor="black"))  # Target gate
    ax.plot([5 - 0.15, 5 + 0.15], [1, 1], 'k-', lw=1.5)  # Plus sign (horizontal)
    ax.plot([5, 5], [1 - 0.15, 1 + 0.15], 'k-', lw=1.5)  # Plus sign (vertical)

    # Add a title
    ax.text(4, 2.5, 'Quantum Circuit: Hadamard on Qubit 1, CNOT with Qubit 1 control, Qubit 2 target', 
            fontsize=10, ha='center')

    plt.show()

# Example usage
# Prepare initial state of two qubits |0>|0>
initial_state = tensor_product(state_zero, state_zero)

# Apply Hadamard to the first qubit
state_after_hadamard = tensor_product(single_qubit_gate(hadamard(), state_zero), state_zero)

print("State after applying Hadamard to the first qubit:")
print(state_after_hadamard)

# Apply CNOT with the first qubit as control and the second as target
final_state = two_qubit_gate(cnot(), state_after_hadamard)

print("\nFinal state after applying CNOT gate:")
print(final_state)

# Draw the circuit
draw_circuit()