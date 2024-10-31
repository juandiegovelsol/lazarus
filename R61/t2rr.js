var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//Max heap class with its related methods
var MaxHeap = /** @class */ (function () {
    function MaxHeap() {
        this.heap = [];
        this.comparisons = 0;
        this.exchanges = 0;
        this.indexOperations = 0;
    }
    //Insert a value into the heap
    MaxHeap.prototype.insert = function (value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    };
    //Heapify the heap from the given index
    MaxHeap.prototype.heapifyUp = function (index) {
        var _a;
        var parentIndex = Math.floor((index - 1) / 2);
        this.indexOperations++; // Increment the index operations count since the above line is an index operation
        if (index != 0) {
            this.comparisons++; //Increment the comparisons count since the while loop condition is a comparison
        }
        while (index > 0 && this.heap[index] > this.heap[parentIndex]) {
            this.comparisons++; // Increment the comparisons count since the while loop condition is a comparison
            _a = [this.heap[parentIndex], this.heap[index]], this.heap[index] = _a[0], this.heap[parentIndex] = _a[1];
            this.exchanges++; // Increment the exchanges count since the above line is an exchange
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
            this.indexOperations++; // Increment the index operations count since the above line is an index operation
        }
    };
    // For the output layout
    MaxHeap.prototype.generateSpaces = function (count) {
        return Array(count + 1).join(" ");
    };
    //Print the heap as a tree
    MaxHeap.prototype.printHeapAsTree = function () {
        var levels = [];
        var level = 0;
        var levelSize = 1;
        // Calculate the number of levels in the heap
        var maxLevels = Math.ceil(Math.log2(this.heap.length + 1));
        for (var i = 0; i < this.heap.length;) {
            var levelNodes = []; // Nodes at the current level
            for (var j = 0; j < levelSize && i < this.heap.length; j++, i++) {
                levelNodes.push(this.heap[i]); // Add the node to the current level
            }
            // Calculate the number of spaces before and between nodes
            var spacesBefore = Math.pow(2, maxLevels - level) - 1;
            var spacesBetween = Math.pow(2, maxLevels - level + 1) - 1;
            levels.push(this.generateSpaces(spacesBefore) + levelNodes.join(this.generateSpaces(spacesBetween)));
            level++;
            levelSize *= 2;
        }
        console.log(levels.join("\n"));
    };
    return MaxHeap;
}());
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function game() {
    return __awaiter(this, void 0, void 0, function () {
        var username, score, round, totalRounds, users, existingUser, _loop_1, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, askQuestion("Enter your username: ")];
                case 1:
                    username = _a.sent();
                    score = 0;
                    round = 1;
                    totalRounds = 0;
                    return [4 /*yield*/, readUsersFromFile()];
                case 2:
                    users = _a.sent();
                    existingUser = users.find(function (user) { return user.username === username; });
                    if (existingUser) {
                        score = existingUser.score;
                        totalRounds = existingUser.rounds;
                        round = existingUser.rounds + 1;
                        console.log("Welcome back, ".concat(username, "! Your current score is ").concat(score, " points."));
                    }
                    else {
                        console.log("Welcome, ".concat(username, "! Let's start a new game."));
                    }
                    _loop_1 = function () {
                        var maxHeap, elements, guessComparisons, guessExchanges, guessIndexOperations, continueGame;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    maxHeap = new MaxHeap();
                                    elements = Array(7).fill(0).map(function () { return getRandomInt(100); });
                                    console.log("Round ".concat(round, ": Insertion order - ").concat(elements.join(', ')));
                                    // Insert the elements into the heap
                                    elements.forEach(function (el) { return maxHeap.insert(el); });
                                    console.log("Max-Heap as a binary tree:");
                                    // Print the heap as a tree
                                    maxHeap.printHeapAsTree();
                                    return [4 /*yield*/, askQuestion("Guess the number of element comparisons: ")];
                                case 1:
                                    guessComparisons = _b.sent();
                                    if (parseInt(guessComparisons) === maxHeap.comparisons) {
                                        console.log("Correct!");
                                        score++;
                                    }
                                    else {
                                        console.log("Incorrect. The correct answer is ".concat(maxHeap.comparisons, "."));
                                    }
                                    return [4 /*yield*/, askQuestion("Guess the number of exchanges: ")];
                                case 2:
                                    guessExchanges = _b.sent();
                                    if (parseInt(guessExchanges) === maxHeap.exchanges) {
                                        console.log("Correct!");
                                        score++;
                                    }
                                    else {
                                        console.log("Incorrect. The correct answer is ".concat(maxHeap.exchanges, "."));
                                    }
                                    return [4 /*yield*/, askQuestion("Guess the number of index operations: ")];
                                case 3:
                                    guessIndexOperations = _b.sent();
                                    if (parseInt(guessIndexOperations) === maxHeap.indexOperations) {
                                        console.log("Correct!");
                                        score++;
                                    }
                                    else {
                                        console.log("Incorrect. The correct answer is ".concat(maxHeap.indexOperations, "."));
                                    }
                                    // Display the current score
                                    console.log("Current score: ".concat(score, " points"));
                                    // Update the user's data
                                    return [4 /*yield*/, writeUserToFile(username, score, round)];
                                case 4:
                                    // Update the user's data
                                    _b.sent();
                                    round++;
                                    totalRounds++;
                                    return [4 /*yield*/, askQuestion("Type 'quit' to stop playing, any other key to continue: ")];
                                case 5:
                                    continueGame = _b.sent();
                                    // If the user types 'quit', stop the game
                                    if (continueGame.toLowerCase() === "quit") {
                                        return [2 /*return*/, "break"];
                                    }
                                    console.log("\n");
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 3;
                case 3:
                    if (!true) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1()];
                case 4:
                    state_1 = _a.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 5];
                    return [3 /*break*/, 3];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Function to read users from a file
function readUsersFromFile() {
    return __awaiter(this, void 0, void 0, function () {
        var fs, users, data, lines, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fs = require("fs");
                    users = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // If the file doesn't exist, create it and write an empty string
                    if (!fs.existsSync("users.txt")) {
                        fs.promises.writeFile("users.txt", "");
                    }
                    return [4 /*yield*/, fs.promises.readFile("users.txt", "utf8")];
                case 2:
                    data = _a.sent();
                    lines = data.split("\n");
                    lines.forEach(function (line) {
                        if (line.trim() !== "") {
                            var _a = line.split(","), username = _a[0], score = _a[1], rounds = _a[2];
                            users.push({ username: username, score: parseInt(score), rounds: parseInt(rounds) });
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error reading users from file:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, users];
            }
        });
    });
}
// Function to write a user to a file
function writeUserToFile(username, score, rounds) {
    return __awaiter(this, void 0, void 0, function () {
        var fs, users, existingUserIndex, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fs = require("fs");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, readUsersFromFile()];
                case 2:
                    users = _a.sent();
                    existingUserIndex = users.findIndex(function (user) { return user.username === username; });
                    // If the user already exists, update their data; otherwise, add a new
                    if (existingUserIndex !== -1) {
                        users[existingUserIndex] = { username: username, score: score, rounds: rounds };
                    }
                    else {
                        users.push({ username: username, score: score, rounds: rounds });
                    }
                    data = users.map(function (user) { return "".concat(user.username, ",").concat(user.score, ",").concat(user.rounds); }).join("\n");
                    // Write the data to the file
                    return [4 /*yield*/, fs.promises.writeFile("users.txt", data)];
                case 3:
                    // Write the data to the file
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error writing user to file:", error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Function to ask a question and return the user's input
function askQuestion(question) {
    return __awaiter(this, void 0, void 0, function () {
        var readline, rl;
        return __generator(this, function (_a) {
            readline = require("readline");
            rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    rl.question(question, function (answer) {
                        rl.close();
                        resolve(answer);
                    });
                })];
        });
    });
}
game();
