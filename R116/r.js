// Quest class
class Quest {
  /**
   * Represents an individual quest.
   * @param {string} name - The name of the quest.
   * @param {string} description - Description of the quest objectives.
   * @param {string[]} rewards - List of possible rewards for completing the quest.
   * @param {Quest[]} [dependencies] - Quests that must be completed before this quest can start.
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
   * @throws {Error} If dependencies are not met or quest is already started/completed.
   */
  startQuest() {
    if (this.status !== "Not Started") {
      throw new Error(
        `Quest '${this.name}' has already started or is completed.`
      );
    }
    if (!this.dependencies.every((dep) => dep.status === "Completed")) {
      throw new Error(`Dependencies for quest '${this.name}' are not met.`);
    }
    this.status = "In Progress";
  }

  /**
   * Completes the quest and returns a random reward.
   * @returns {string} A random reward from the list of rewards.
   * @throws {Error} If the quest is not in progress or already completed.
   */
  completeQuest() {
    if (this.status !== "In Progress") {
      throw new Error(
        `Quest '${this.name}' is not in progress or is already completed.`
      );
    }
    this.status = "Completed";
    return this.rewards[Math.floor(Math.random() * this.rewards.length)];
  }
}

// QuestTracker class
class QuestTracker {
  /**
   * Initializes a QuestTracker to manage multiple quests.
   */
  constructor() {
    this.quests = {};
  }

  /**
   * Adds a new quest to the tracker.
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
   * Displays a summary of all quests with their status and description.
   * @returns {string} A formatted summary of all quests.
   */
  displayQuestSummary() {
    return Object.values(this.quests)
      .map(
        (quest) =>
          `Quest: ${quest.name}\nStatus: ${quest.status}\nDescription: ${quest.description}\n`
      )
      .join("\n");
  }

  /**
   * Updates a quest's status with dependency validation.
   * @param {string} questName - Name of the quest to update.
   * @param {string} newStatus - New status ('Not Started', 'In Progress', 'Completed').
   * @throws {Error} If quest does not exist or status is invalid.
   */
  updateQuestStatus(questName, newStatus) {
    const quest = this.quests[questName];
    if (!quest) {
      throw new Error(`Quest '${questName}' does not exist.`);
    }
    if (!["Not Started", "In Progress", "Completed"].includes(newStatus)) {
      throw new Error(`Invalid quest status '${newStatus}'.`);
    }
    quest.status = newStatus;
  }

  /**
   * Retrieves all completed quests and their associated rewards.
   * @returns {Object[]} List of completed quests with their rewards.
   */
  getCompletedQuests() {
    return Object.values(this.quests)
      .filter((quest) => quest.status === "Completed")
      .map((quest) => ({ name: quest.name, reward: quest.rewards[0] }));
  }
}

// Example usage
const questTracker = new QuestTracker();

const quest1 = new Quest("Quest 1", "Complete the first objective.", [
  "Reward 1",
  "Reward 2",
]);
const quest2 = new Quest(
  "Quest 2",
  "Complete the second objective.",
  ["Reward 3", "Reward 4"],
  [quest1]
);
const quest3 = new Quest("Quest 3", "Complete the third objective.", [
  "Reward 5",
  "Reward 6",
]);

questTracker.addQuest(quest1);
questTracker.addQuest(quest1);
questTracker.addQuest(quest2);
questTracker.addQuest(quest3);

console.log(questTracker.displayQuestSummary());

quest1.startQuest();
const reward1 = quest1.completeQuest();
console.log(`Completed quest 'Quest 1' and received reward: ${reward1}`);

quest2.startQuest();
const reward2 = quest2.completeQuest();
console.log(`Completed quest 'Quest 2' and received reward: ${reward2}`);

console.log(questTracker.displayQuestSummary());
console.log(questTracker.getCompletedQuests());
