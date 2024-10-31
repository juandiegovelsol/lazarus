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

    insert(value: number) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    private heapifyUp(index: number) {
        let parentIndex = Math.floor((index - 1) / 2);
        this.indexOperations++;
        while (index > 0 && this.heap[index] > this.heap[parentIndex]) {
            this.comparisons++;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            this.exchanges++;
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
            this.indexOperations++;
        }
    }

    private generateSpaces(count: number): string {
        return Array(count + 1).join(" ");
    }

    printHeapAsTree() {
        const levels: string[] = [];
        let level = 0;
        let levelSize = 1;

        const maxLevels = Math.ceil(Math.log2(this.heap.length + 1));

        for (let i = 0; i < this.heap.length; ) {
            const levelNodes: number[] = [];
            for (let j = 0; j < levelSize && i < this.heap.length; j++, i++) {
                levelNodes.push(this.heap[i]);
            }

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

async function playGame() {
    let score = 0;
    let totalComparisons = 0;
    let totalExchanges = 0;
    let totalIndexOperations = 0;
    let totalRounds = 0;

    while (true) {
        const maxHeap = new MaxHeap();
        const elements: number[] = [];
        const numElements = getRandomInt(10) + 5; // Random number between 5 and 15
        for (let i = 0; i < numElements; i++) {
            elements.push(getRandomInt(100));
        }

        console.log(`Insertion order: ${elements.join(", ")}`);
        elements.forEach((el) => maxHeap.insert(el));

        console.log("Max-Heap as a binary tree:");
        maxHeap.printHeapAsTree();

        const comparisonsAnswer = await askQuestion(`How many comparisons were made? `);
        if (comparisonsAnswer === maxHeap.comparisons.toString()) {
            score++;
            console.log("Correct!\n");
        } else {
            console.log(`Incorrect. The correct answer was ${maxHeap.comparisons}.\n`);
        }
        totalComparisons += maxHeap.comparisons;

        const exchangesAnswer = await askQuestion(`How many exchanges were made? `);
        if (exchangesAnswer === maxHeap.exchanges.toString()) {
            score++;
            console.log("Correct!\n");
        } else {
            console.log(`Incorrect. The correct answer was ${maxHeap.exchanges}.\n`);
        }
        totalExchanges += maxHeap.exchanges;

        const indexOperationsAnswer = await askQuestion(`How many index operations were made? `);
        if (indexOperationsAnswer === maxHeap.indexOperations.toString()) {
            score++;
            console.log("Correct!\n");
        } else {
            console.log(`Incorrect. The correct answer was ${maxHeap.indexOperations}.\n`);
        }
        totalIndexOperations += maxHeap.indexOperations;

        totalRounds++;

        console.log(`Your current score is ${score} out of ${totalRounds * 3}\n`);
        console.log(`Average comparisons per round: ${totalComparisons / totalRounds}\n`);
        console.log(`Average exchanges per round: ${totalExchanges / totalRounds}\n`);
        console.log(`Average index operations per round: ${totalIndexOperations / totalRounds}\n`);

        const playAgain = await askQuestion("Would you like to play again? Type 'quit' to stop playing. ");
        if (playAgain.toLowerCase() === "quit") {
            break;
        }
    }
}

async function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question(question, (answer: string) => {
            resolve(answer);
            readline.close();
        });
    });
}

playGame();