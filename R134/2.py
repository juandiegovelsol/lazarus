import numpy as np
import matplotlib.pyplot as plt

class QuantumGate:
    """Base class for quantum gates."""
    
    def __init__(self, name, matrix):
        """
        Initialize a quantum gate with a name and a matrix representation.
        
        Args:
        name (str): The name of the quantum gate.
        matrix (numpy.array): The matrix representation of the quantum gate.
        """
        self.name = name
        self.matrix = matrix

    def apply(self, qubit_state):
        """
        Apply the quantum gate to a given qubit state.
        
        Args:
        qubit_state (numpy.array): The state of the qubit.
        
        Returns:
        numpy.array: The state of the qubit after applying the gate.
        """
        return np.dot(self.matrix, qubit_state)


class SingleQubitGate(QuantumGate):
    """Class for single-qubit gates."""
    
    def __init__(self, name, matrix):
        """
        Initialize a single-qubit gate with a name and a matrix representation.
        
        Args:
        name (str): The name of the single-qubit gate.
        matrix (numpy.array): The matrix representation of the single-qubit gate.
        """
        super().__init__(name, matrix)


class TwoQubitGate(QuantumGate):
    """Class for two-qubit gates."""
    
    def __init__(self, name, matrix):
        """
        Initialize a two-qubit gate with a name and a matrix representation.
        
        Args:
        name (str): The name of the two-qubit gate.
        matrix (numpy.array): The matrix representation of the two-qubit gate.
        """
        super().__init__(name, matrix)


class Qubit:
    """Class for qubits."""
    
    def __init__(self, state):
        """
        Initialize a qubit with a state.
        
        Args:
        state (numpy.array): The state of the qubit.
        """
        self.state = state

    def apply_gate(self, gate):
        """
        Apply a quantum gate to the qubit.
        
        Args:
        gate (QuantumGate): The gate to apply.
        
        Returns:
        Qubit: The qubit after applying the gate.
        """
        new_state = gate.apply(self.state)
        return Qubit(new_state)

    def __str__(self):
        """
        Return a string representation of the qubit.
        
        Returns:
        str: A string representation of the qubit.
        """
        return str(self.state)


class QuantumCircuit:
    """Class for quantum circuits."""
    
    def __init__(self, qubits):
        """
        Initialize a quantum circuit with qubits.
        
        Args:
        qubits (list[Qubit]): The qubits in the circuit.
        """
        self.qubits = qubits

    def apply_gate(self, gate, qubit_index):
        """
        Apply a quantum gate to a qubit in the circuit.
        
        Args:
        gate (QuantumGate): The gate to apply.
        qubit_index (int): The index of the qubit to apply the gate to.
        
        Returns:
        QuantumCircuit: The circuit after applying the gate.
        """
        new_qubits = self.qubits.copy()
        new_qubits[qubit_index] = new_qubits[qubit_index].apply_gate(gate)
        return QuantumCircuit(new_qubits)

    def apply_two_qubit_gate(self, gate, control_index, target_index):
        """
        Apply a two-qubit gate to two qubits in the circuit.
        
        Args:
        gate (TwoQubitGate): The gate to apply.
        control_index (int): The index of the control qubit.
        target_index (int): The index of the target qubit.
        
        Returns:
        QuantumCircuit: The circuit after applying the gate.
        """
        new_qubits = self.qubits.copy()
        combined_state = np.kron(new_qubits[control_index].state, new_qubits[target_index].state)
        new_combined_state = gate.apply(combined_state)
        new_qubits[control_index] = Qubit(new_combined_state[:2])
        new_qubits[target_index] = Qubit(new_combined_state[2:])
        return QuantumCircuit(new_qubits)

    def draw(self):
        """
        Draw the quantum circuit.
        """
        fig, ax = plt.subplots()
        
        # Set up the plot
        ax.set_xlim(0, 8)
        ax.set_ylim(0, 3)
        ax.axis('off')

        # Draw the qubit lines
        for i in range(len(self.qubits)):
            ax.plot([1, 7], [2 - i, 2 - i], 'k', lw=1.5)

        # Label the qubits
        for i in range(len(self.qubits)):
            ax.text(0.5, 2 - i, r'$|0\rangle$', fontsize=12, ha='right')

        # Draw gates
        ax.add_patch(plt.Rectangle((2, 1.75), 0.5, 0.5, fill=True, color="white", edgecolor="black"))
        ax.text(2.15, 2, 'H', fontsize=12, va='center', ha='center')

        ax.plot([5, 5], [1, 2], 'k-', lw=1.5)
        ax.plot(5, 2, 'ko', markersize=8)
        ax.add_patch(plt.Circle((5, 1), 0.25, fill=False, edgecolor="black"))
        ax.plot([5 - 0.15, 5 + 0.15], [1, 1], 'k-', lw=1.5)
        ax.plot([5, 5], [1 - 0.15, 1 + 0.15], 'k-', lw=1.5)

        # Add a title
        ax.text(4, 2.5, 'Quantum Circuit: Hadamard on Qubit 1, CNOT with Qubit 1 control, Qubit 2 target', 
                fontsize=10, ha='center')

        plt.show()


def main():
    # Define quantum gates
    pauli_x_gate = SingleQubitGate('Pauli X', np.array([[0, 1], [1, 0]]))
    hadamard_gate = SingleQubitGate('Hadamard', (1 / np.sqrt(2)) * np.array([[1, 1], [1, -1]]))
    identity_gate = SingleQubitGate('Identity', np.array([[1, 0], [0, 1]]))
    cnot_gate = TwoQubitGate('CNOT', np.array([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]]))

    # Initialize qubits
    state_zero = np.array([[1], [0]])
    state_one = np.array([[0], [1]])
    qubit1 = Qubit(state_zero)
    qubit2 = Qubit(state_zero)

    # Create a quantum circuit
    circuit = QuantumCircuit([qubit1, qubit2])

    # Apply Hadamard gate to the first qubit
    circuit = circuit.apply_gate(hadamard_gate, 0)
    print("State after applying Hadamard to the first qubit:")
    print(circuit.qubits[0])

    # Apply CNOT gate with the first qubit as control and the second as target
    circuit = circuit.apply_two_qubit_gate(cnot_gate, 0, 1)
    print("\nFinal state after applying CNOT gate:")
    print(circuit.qubits[0])
    print(circuit.qubits[1])

    # Draw the circuit
    circuit.draw()


if __name__ == "__main__":
    main()