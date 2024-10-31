//Max heap class with it's related methods
class MaxHeap {
    private heap: number[];
    public comparisons: number;
    public exchanges: number;
    public indexOperations: number;

    constructor() {
        this.heap = [];
        this.comparisons = 0;
        this.exchanges = 0;
        this.indexOperations = 0;
    }


    //Insert a value into the heap
    insert(value: number) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
        
    }


    //Heapify the heap from the given index
    private heapifyUp(index: number) {
        let parentIndex = Math.floor((index - 1) / 2);
        this.indexOperations++; // Increment the index operations count since the above line is an index operation
        

        if (index != 0) {
           console.log("AA", this.heap, index, this.comparisons)
            this.comparisons++; //Increment the comparisons count since the while loop condition is a comparison
        }
        while (index > 0 && this.heap[index] > this.heap[parentIndex]) {
            this.comparisons++; // Increment the comparisons count since the while loop condition is a comparison
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            this.exchanges++; // Increment the exchanges count since the above line is an exchange
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
            this.indexOperations++; // Increment the index operations count since the above line is an index operation
        }
        console.log("BB", this.heap, index, this.comparisons)
    }

    // For the output layout
    private generateSpaces(count: number): string {
        return Array(count + 1).join(" ");
    }

    //Print the heap as a tree
    printHeapAsTree() {
        const levels: string[] = [];
        let level = 0;
        let levelSize = 1;

        // Calculate the number of levels in the heap
        const maxLevels = Math.ceil(Math.log2(this.heap.length + 1));

        for (let i = 0; i < this.heap.length;) {
            const levelNodes: number[] = []; // Nodes at the current level
            for (let j = 0; j < levelSize && i < this.heap.length; j++, i++) {
                levelNodes.push(this.heap[i]); // Add the node to the current level
            }

            // Calculate the number of spaces before and between nodes
            const spacesBefore = Math.pow(2, maxLevels - level) - 1;
            const spacesBetween = Math.pow(2, maxLevels - level + 1) - 1;
            levels.push(
                this.generateSpaces(spacesBefore) + levelNodes.join(this.generateSpaces(spacesBetween))
            );
            level++;
            levelSize *= 2;
        }

        console.log(levels.join("\n"));
    }
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

async function game() {
    let score = 0;
    let totalComparisons = 0;
    let totalExchanges = 0;
    let totalIndexOperations = 0;
    let round = 1;

    while (true) {
        const maxHeap = new MaxHeap();

        // Generate 7 random elements
        const elements: number[] = Array(7).fill(0).map(() => getRandomInt(100));
        console.log(`Round ${round}: Insertion order - ${elements.join(', ')}`);

        // Insert the elements into the heap
        elements.forEach((el) => maxHeap.insert(el));
        console.log("Max-Heap as a binary tree:");

        // Print the heap as a tree
        maxHeap.printHeapAsTree();


        // Ask the user to guess the number of comparisons, exchanges, and index operations
        const guessComparisons = await askQuestion("Guess the number of element comparisons: ");
        if (parseInt(guessComparisons) === maxHeap.comparisons) {
            console.log("Correct!");
            score++;
        } else {
            console.log(`Incorrect. The correct answer is ${maxHeap.comparisons}.`);
        }
        totalComparisons += maxHeap.comparisons;

        const guessExchanges = await askQuestion("Guess the number of exchanges: ");
        if (parseInt(guessExchanges) === maxHeap.exchanges) {
            console.log("Correct!");
            score++;
        } else {
            console.log(`Incorrect. The correct answer is ${maxHeap.exchanges}.`);
        }
        totalExchanges += maxHeap.exchanges;

        const guessIndexOperations = await askQuestion("Guess the number of index operations: ");
        if (parseInt(guessIndexOperations) === maxHeap.indexOperations) {
            console.log("Correct!");
            score++;
        } else {
            console.log(`Incorrect. The correct answer is ${maxHeap.indexOperations}.`);
        }
        totalIndexOperations += maxHeap.indexOperations;


        // Display the current score and averages
        console.log(`Current score: ${score} points`);
        console.log(`Average comparisons per round: ${totalComparisons / round}`);
        console.log(`Average exchanges per round: ${totalExchanges / round}`);
        console.log(`Average index operations per round: ${totalIndexOperations / round}`);

        const continueGame = await askQuestion("Type 'quit' to stop playing, any other key to continue: ");
        // If the user types 'quit', stop the game
        if (continueGame.toLowerCase() === "quit") {
            break;
        }
        round++;
        console.log("\n");
    }
}


// Function to ask a question and return the user's input
async function askQuestion(question: string): Promise<string> {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question(question, (answer: string) => {
            rl.close();
            resolve(answer);
        });
    });
}

game();