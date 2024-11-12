// Define the Quest class
class Quest {
  /**
   * Creates a new Quest instance.
   *
   * @param {string} name - The name of the quest.
   * @param {string} description - A description of the quest objectives.
   * @param {string[]} rewards - A list of possible rewards for completing the quest.
   * @param {Quest[]} [dependencies] - Other quests that must be completed before this quest can start.
   */
  constructor(name, description, rewards, dependencies = []) {
    this.name = name;
    this.description = description;
    this.status = "Complete";
    this.rewards = rewards;
    this.dependencies = dependencies;
  }

  /**
   * Starts the quest if all dependencies are completed.
   *
   * @throws {Error} If dependencies are not met.
   */
  startQuest() {
    if (this.status !== "Not Started") {
      throw new Error(
        `Quest '${this.name}' has already started or is completed.`
      );
    }

    if (
      this.dependencies.some((dependency) => dependency.status !== "Completed")
    ) {
      throw new Error(`Dependencies for quest '${this.name}' are not met.`);
    }

    this.status = "In Progress";
  }

  /**
   * Completes the quest and returns a random reward.
   *
   * @returns {string} A random reward from the list of possible rewards.
   * @throws {Error} If the quest is not in progress or is already completed.
   */
  completeQuest() {
    if (this.status !== "In Progress") {
      throw new Error(
        `Quest '${this.name}' is not in progress or is already completed.`
      );
    }

    this.status = "Completed";
    const randomRewardIndex = Math.floor(Math.random() * this.rewards.length);
    return this.rewards[randomRewardIndex];
  }
}

// Define the QuestTracker class
class QuestTracker {
  /**
   * Creates a new QuestTracker instance.
   */
  constructor() {
    this.quests = {};
  }

  /**
   * Adds a new quest to the tracker, ensuring no duplicates by name.
   *
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
   *
   * @returns {string} A formatted string summarizing all quests.
   */
  displayQuestSummary() {
    const questSummaries = Object.values(this.quests).map((quest) => {
      return `Quest: ${quest.name}\nStatus: ${quest.status}\nDescription: ${quest.description}\n`;
    });

    return questSummaries.join("\n");
  }

  /**
   * Updates a quest's status, accounting for any dependencies.
   *
   * @param {string} questName - The name of the quest to update.
   * @param {string} newStatus - The new status of the quest.
   * @throws {Error} If the quest does not exist or the new status is invalid.
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
   * Retrieves a list of all completed quests and their associated rewards.
   *
   * @returns {Object[]} A list of objects containing the name of each completed quest and its reward.
   */
  getCompletedQuests() {
    const completedQuests = Object.values(this.quests).filter(
      (quest) => quest.status === "Completed"
    );
    return completedQuests.map((quest) => ({
      name: quest.name,
      reward: quest.rewards[0],
    }));
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
questTracker.addQuest(quest2);
questTracker.addQuest(quest3);

console.log(questTracker.displayQuestSummary());

quest1.startQuest();
quest1.completeQuest();

console.log(questTracker.displayQuestSummary());

quest2.startQuest();
quest2.completeQuest();

console.log(questTracker.displayQuestSummary());

console.log(questTracker.getCompletedQuests());
