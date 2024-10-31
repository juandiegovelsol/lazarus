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
// Define a function to calculate estimated race times
function calculateEstimatedTimes(bestDistance, bestTime) {
    // Define pace adjustment factors for each distance
    var paceAdjustmentFactors = {
        "5 km": 1,
        "10 km": 1.05,
        "half marathon": 1.1,
        marathon: 1.2,
    };
    // Calculate the runner's pace per km at their best distance
    var bestPacePerKm = bestTime / getDistanceInKm(bestDistance);
    // Initialize an object to store estimated times
    var estimatedTimes = {};
    // Calculate estimated times for each distance
    for (var distance in paceAdjustmentFactors) {
        var paceAdjustmentFactor = paceAdjustmentFactors[distance];
        var distanceInKm = getDistanceInKm(distance);
        estimatedTimes[distance] = Math.round(bestPacePerKm * paceAdjustmentFactor * distanceInKm);
    }
    return estimatedTimes;
}
// Define a function to calculate required times for a marathon goal
function calculateRequiredTimes(marathonGoalTime) {
    // Define pace adjustment factors for each distance
    var paceAdjustmentFactors = {
        "5 km": 1 / 1.2,
        "10 km": 1.05 / 1.2,
        "half marathon": 1.1 / 1.2,
        marathon: 1,
    };
    // Calculate the required pace per km for the marathon goal
    var requiredPacePerKm = marathonGoalTime / getDistanceInKm("marathon");
    // Initialize an object to store required times
    var requiredTimes = {};
    // Calculate required times for each distance
    for (var distance in paceAdjustmentFactors) {
        var paceAdjustmentFactor = paceAdjustmentFactors[distance];
        var distanceInKm = getDistanceInKm(distance);
        requiredTimes[distance] = Math.round(requiredPacePerKm * paceAdjustmentFactor * distanceInKm);
    }
    return requiredTimes;
}
// Define a function to get the distance in km
function getDistanceInKm(distance) {
    switch (distance) {
        case "5 km":
            return 5;
        case "10 km":
            return 10;
        case "half marathon":
            return 21.0975;
        case "marathon":
            return 42.195;
        default:
            throw new Error("Invalid distance: ".concat(distance));
    }
}
// Define a function to get user input
function getUserInput() {
    return __awaiter(this, void 0, void 0, function () {
        var readline, bestDistance, bestTime, marathonGoalTime, askQuestion, chooseMode, time, timeNumber, time, timeNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    readline = require("readline").createInterface({
                        input: process.stdin,
                        output: process.stdout,
                    });
                    bestDistance = null;
                    bestTime = null;
                    marathonGoalTime = null;
                    askQuestion = function (question) {
                        return new Promise(function (resolve) {
                            readline.question(question, function (answer) {
                                resolve(answer);
                            });
                        });
                    };
                    _a.label = 1;
                case 1: return [4 /*yield*/, askQuestion("Do you want to enter your best time at a distance or a marathon goal time? (1 for best time, 2 for marathon goal): ")];
                case 2:
                    chooseMode = _a.sent();
                    _a.label = 3;
                case 3:
                    if (chooseMode !== "1" && chooseMode !== "2") return [3 /*break*/, 1];
                    _a.label = 4;
                case 4:
                    if (!(chooseMode === "1")) return [3 /*break*/, 12];
                    _a.label = 5;
                case 5: return [4 /*yield*/, askQuestion("Enter your best distance (5 km, 10 km, half marathon, or marathon): ")];
                case 6:
                    bestDistance = _a.sent();
                    if (!["5 km", "10 km", "half marathon", "marathon"].includes(bestDistance)) {
                        console.log("Invalid distance. Please try again.");
                        bestDistance = null;
                    }
                    _a.label = 7;
                case 7:
                    if (bestDistance === null) return [3 /*break*/, 5];
                    _a.label = 8;
                case 8: return [4 /*yield*/, askQuestion("Enter your best time at that distance in minutes: ")];
                case 9:
                    time = _a.sent();
                    timeNumber = parseInt(time, 10);
                    if (isNaN(timeNumber) || timeNumber <= 0) {
                        console.log("Invalid time. Please try again.");
                        bestTime = null;
                    }
                    else {
                        bestTime = timeNumber;
                    }
                    _a.label = 10;
                case 10:
                    if (bestTime === null) return [3 /*break*/, 8];
                    _a.label = 11;
                case 11: return [3 /*break*/, 16];
                case 12:
                    if (!(chooseMode === "2")) return [3 /*break*/, 16];
                    _a.label = 13;
                case 13: return [4 /*yield*/, askQuestion("Enter your marathon goal time in minutes: ")];
                case 14:
                    time = _a.sent();
                    timeNumber = parseInt(time, 10);
                    if (isNaN(timeNumber) || timeNumber <= 0) {
                        console.log("Invalid time. Please try again.");
                        marathonGoalTime = null;
                    }
                    else {
                        marathonGoalTime = timeNumber;
                    }
                    _a.label = 15;
                case 15:
                    if (marathonGoalTime === null) return [3 /*break*/, 13];
                    _a.label = 16;
                case 16:
                    readline.close();
                    return [2 /*return*/, { bestDistance: bestDistance, bestTime: bestTime, marathonGoalTime: marathonGoalTime }];
            }
        });
    });
}
// Main function
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, bestDistance, bestTime, marathonGoalTime, estimatedTimes, distance, requiredTimes, distance;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getUserInput()];
                case 1:
                    _a = _b.sent(), bestDistance = _a.bestDistance, bestTime = _a.bestTime, marathonGoalTime = _a.marathonGoalTime;
                    if (bestDistance && bestTime) {
                        estimatedTimes = calculateEstimatedTimes(bestDistance, bestTime);
                        console.log("Estimated finish times:");
                        for (distance in estimatedTimes) {
                            console.log("".concat(distance, ": ").concat(estimatedTimes[distance], " minutes"));
                        }
                    }
                    else if (marathonGoalTime) {
                        requiredTimes = calculateRequiredTimes(marathonGoalTime);
                        console.log("Required times to meet your marathon goal:");
                        for (distance in requiredTimes) {
                            console.log("".concat(distance, ": ").concat(requiredTimes[distance], " minutes"));
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main();
