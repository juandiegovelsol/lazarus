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
    // Ask for the username
    const username = await askQuestion("Enter your username: ");
    let score = 0;
    let round = 1;
    let totalRounds = 0;

    // Check if the user already exists
    const users = await readUsersFromFile();
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        score = existingUser.score;
        totalRounds = existingUser.rounds;
        round = existingUser.rounds + 1;
        console.log(`Welcome back, ${username}! Your current score is ${score} points.`);
    } else {
        console.log(`Welcome, ${username}! Let's start a new game.`);
    }

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

        const guessExchanges = await askQuestion("Guess the number of exchanges: ");
        if (parseInt(guessExchanges) === maxHeap.exchanges) {
            console.log("Correct!");
            score++;
        } else {
            console.log(`Incorrect. The correct answer is ${maxHeap.exchanges}.`);
        }

        const guessIndexOperations = await askQuestion("Guess the number of index operations: ");
        if (parseInt(guessIndexOperations) === maxHeap.indexOperations) {
            console.log("Correct!");
            score++;
        } else {
            console.log(`Incorrect. The correct answer is ${maxHeap.indexOperations}.`);
        }

        // Display the current score
        console.log(`Current score: ${score} points`);

        // Update the user's data
        await writeUserToFile(username, score, round);
        round++;
        totalRounds++;

        const continueGame = await askQuestion("Type 'quit' to stop playing, any other key to continue: ");
        // If the user types 'quit', stop the game
        if (continueGame.toLowerCase() === "quit") {
            break;
        }
        console.log("\n");
    }
}

// Function to read users from a file
async function readUsersFromFile(): Promise<{ username: string; score: number; rounds: number }[]> {
    const fs = require("fs");
    const users: { username: string; score: number; rounds: number }[] = [];
    try {
        const data = await fs.promises.readFile("users.txt", "utf8");
        const lines = data.split("\n");
        lines.forEach((line) => {
            if (line.trim() !== "") {
                const [username, score, rounds] = line.split(",");
                users.push({ username, score: parseInt(score), rounds: parseInt(rounds) });
            }
        });
    } catch (error) {
        console.error("Error reading users from file:", error);
    }
    return users;
}

// Function to write a user to a file
async function writeUserToFile(username: string, score: number, rounds: number) {
    const fs = require("fs");
    try {
        const users = await readUsersFromFile();
        const existingUserIndex = users.findIndex((user) => user.username === username);
        if (existingUserIndex !== -1) {
            users[existingUserIndex] = { username, score, rounds };
        } else {
            users.push({ username, score, rounds });
        }
        const data = users.map((user) => `${user.username},${user.score},${user.rounds}`).join("\n");
        await fs.promises.writeFile("users.txt", data);
    } catch (error) {
        console.error("Error writing user to file:", error);
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