// Quest class
class Quest {
  /**
   * Represents an individual quest.
   * @param {string} name - The name of the quest.
   * @param {string} description - A description of the quest objectives.
   * @param {string[]} rewards - A list of possible rewards for completing the quest.
   * @param {Quest[]} [dependencies] - Other quests that must be completed before this quest can start.
   */
  constructor(name, description, rewards, dependencies = []) {
    this.name = name;
    this.description = description;
    this.status = "Not Started";
    this.rewards = rewards;
    this.dependencies = dependencies;
  }

  /**
   * Starts the quest if all dependencies are completed.
   * @throws {Error} If dependencies are not met.
   */
  startQuest() {
    if (
      this.dependencies.every((dependency) => dependency.status === "Completed")
    ) {
      this.status = "In Progress";
    } else {
      throw new Error(
        `Cannot start quest '${this.name}' due to unmet dependencies.`
      );
    }
  }

  /**
   * Completes the quest and returns a random reward.
   * @returns {string} A randomly selected reward from the list of possible rewards.
   * @throws {Error} If the quest is not in progress or is already completed.
   */
  completeQuest() {
    if (this.status === "In Progress") {
      this.status = "Completed";
      return this.rewards[Math.floor(Math.random() * this.rewards.length)];
    } else if (this.status === "Completed") {
      throw new Error(`Quest '${this.name}' is already completed.`);
    } else {
      throw new Error(
        `Cannot complete quest '${this.name}' as it is not in progress.`
      );
    }
  }
}

// QuestTracker class
class QuestTracker {
  /**
   * Manages multiple quests and tracks their completion.
   */
  constructor() {
    this.quests = {};
  }

  /**
   * Adds a new quest to the tracker, ensuring no duplicates by name.
   * @param {Quest} quest - The quest to add.
   * @throws {Error} If a quest with the same name already exists.
   */
  addQuest(quest) {
    if (this.quests[quest.name]) {
      throw new Error(`Quest '${quest.name}' already exists.`);
    }
    this.quests[quest.name] = quest;
  }

  /**
   * Displays a summary of all quests with their current status and description.
   * @returns {string} A formatted summary of all quests.
   */
  displayQuestSummary() {
    return Object.values(this.quests)
      .map((quest) => `${quest.name}: ${quest.status}\n${quest.description}\n`)
      .join("\n");
  }

  /**
   * Updates a quest's status, accounting for any dependencies.
   * @param {string} questName - The name of the quest to update.
   * @param {string} status - The new status of the quest.
   * @throws {Error} If the quest does not exist or the status is invalid.
   */
  updateQuestStatus(questName, status) {
    const quest = this.quests[questName];
    if (!quest) {
      throw new Error(`Quest '${questName}' does not exist.`);
    }
    if (!["Not Started", "In Progress", "Completed"].includes(status)) {
      throw new Error(`Invalid quest status: '${status}'.`);
    }
    quest.status = status;
  }

  /**
   * Retrieves a list of all completed quests and their associated rewards.
   * @returns {Object} An object with completed quest names as keys and their rewards as values.
   */
  getCompletedQuests() {
    return Object.fromEntries(
      Object.values(this.quests)
        .filter((quest) => quest.status === "Completed")
        .map((quest) => [quest.name, quest.rewards])
    );
  }
}

// Example usage
const questTracker = new QuestTracker();

// Create quests with dependencies and rewards
const quest1 = new Quest("Gather Resources", "Gather 10 wood and 5 stone.", [
  "Wooden Sword",
  "Stone Shield",
]);
const quest2 = new Quest(
  "Craft Tools",
  "Craft a wooden sword and a stone shield.",
  ["Iron Sword", "Leather Armor"],
  [quest1]
);
const quest3 = new Quest(
  "Build a House",
  "Build a house using 10 wood and 5 stone.",
  ["House Decoration", "Furniture"],
  [quest1]
);

// Add quests to the tracker
questTracker.addQuest(quest1);
questTracker.addQuest(quest2);
questTracker.addQuest(quest3);

// Display quest summary
console.log(questTracker.displayQuestSummary());

// Start and complete quests
quest1.startQuest();
const reward1 = quest1.completeQuest();
console.log(
  `Completed quest 'Gather Resources' and received reward: ${reward1}`
);

quest2.startQuest();
const reward2 = quest2.completeQuest();
console.log(`Completed quest 'Craft Tools' and received reward: ${reward2}`);

// Attempt to start a quest without satisfying dependencies
try {
  quest3.startQuest();
} catch (error) {
  console.error(error.message);
}

// Complete the dependency and start the quest again
quest1.completeQuest();
quest3.startQuest();
const reward3 = quest3.completeQuest();
console.log(`Completed quest 'Build a House' and received reward: ${reward3}`);

// Retrieve completed quests and their rewards
console.log(questTracker.getCompletedQuests());
