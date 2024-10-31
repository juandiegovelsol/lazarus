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
var MaxHeap = /** @class */ (function () {
    function MaxHeap() {
        this.heap = [];
        this.comparisons = 0;
        this.exchanges = 0;
        this.indexOperations = 0;
    }
    MaxHeap.prototype.insert = function (value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    };
    MaxHeap.prototype.heapifyUp = function (index) {
        var _a;
        var parentIndex = Math.floor((index - 1) / 2);
        this.indexOperations++;
        while (index > 0 && this.heap[index] > this.heap[parentIndex]) {
            this.comparisons++;
            _a = [this.heap[parentIndex], this.heap[index]], this.heap[index] = _a[0], this.heap[parentIndex] = _a[1];
            this.exchanges++;
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
            this.indexOperations++;
        }
    };
    MaxHeap.prototype.generateSpaces = function (count) {
        return Array(count + 1).join(" ");
    };
    MaxHeap.prototype.printHeapAsTree = function () {
        var levels = [];
        var level = 0;
        var levelSize = 1;
        var maxLevels = Math.ceil(Math.log2(this.heap.length + 1));
        for (var i = 0; i < this.heap.length;) {
            var levelNodes = [];
            for (var j = 0; j < levelSize && i < this.heap.length; j++, i++) {
                levelNodes.push(this.heap[i]);
            }
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
function playGame() {
    return __awaiter(this, void 0, void 0, function () {
        var score, totalComparisons, totalExchanges, totalIndexOperations, totalRounds, _loop_1, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    score = 0;
                    totalComparisons = 0;
                    totalExchanges = 0;
                    totalIndexOperations = 0;
                    totalRounds = 0;
                    _loop_1 = function () {
                        var maxHeap, elements, numElements, i, comparisonsAnswer, exchangesAnswer, indexOperationsAnswer, playAgain;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    maxHeap = new MaxHeap();
                                    elements = [];
                                    numElements = getRandomInt(10) + 5;
                                    for (i = 0; i < numElements; i++) {
                                        elements.push(getRandomInt(100));
                                    }
                                    console.log("Insertion order: ".concat(elements.join(", ")));
                                    elements.forEach(function (el) { return maxHeap.insert(el); });
                                    console.log("Max-Heap as a binary tree:");
                                    maxHeap.printHeapAsTree();
                                    return [4 /*yield*/, askQuestion("How many comparisons were made? ")];
                                case 1:
                                    comparisonsAnswer = _b.sent();
                                    if (comparisonsAnswer === maxHeap.comparisons.toString()) {
                                        score++;
                                        console.log("Correct!\n");
                                    }
                                    else {
                                        console.log("Incorrect. The correct answer was ".concat(maxHeap.comparisons, ".\n"));
                                    }
                                    totalComparisons += maxHeap.comparisons;
                                    return [4 /*yield*/, askQuestion("How many exchanges were made? ")];
                                case 2:
                                    exchangesAnswer = _b.sent();
                                    if (exchangesAnswer === maxHeap.exchanges.toString()) {
                                        score++;
                                        console.log("Correct!\n");
                                    }
                                    else {
                                        console.log("Incorrect. The correct answer was ".concat(maxHeap.exchanges, ".\n"));
                                    }
                                    totalExchanges += maxHeap.exchanges;
                                    return [4 /*yield*/, askQuestion("How many index operations were made? ")];
                                case 3:
                                    indexOperationsAnswer = _b.sent();
                                    if (indexOperationsAnswer === maxHeap.indexOperations.toString()) {
                                        score++;
                                        console.log("Correct!\n");
                                    }
                                    else {
                                        console.log("Incorrect. The correct answer was ".concat(maxHeap.indexOperations, ".\n"));
                                    }
                                    totalIndexOperations += maxHeap.indexOperations;
                                    totalRounds++;
                                    console.log("Your current score is ".concat(score, " out of ").concat(totalRounds * 3, "\n"));
                                    console.log("Average comparisons per round: ".concat(totalComparisons / totalRounds, "\n"));
                                    console.log("Average exchanges per round: ".concat(totalExchanges / totalRounds, "\n"));
                                    console.log("Average index operations per round: ".concat(totalIndexOperations / totalRounds, "\n"));
                                    return [4 /*yield*/, askQuestion("Would you like to play again? Type 'quit' to stop playing. ")];
                                case 4:
                                    playAgain = _b.sent();
                                    if (playAgain.toLowerCase() === "quit") {
                                        return [2 /*return*/, "break"];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    state_1 = _a.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 3];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function askQuestion(question) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var readline = require("readline").createInterface({
                        input: process.stdin,
                        output: process.stdout,
                    });
                    readline.question(question, function (answer) {
                        resolve(answer);
                        readline.close();
                    });
                })];
        });
    });
}
playGame();
