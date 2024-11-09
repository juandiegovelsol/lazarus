// Helper function to shuffle an array (for randomizing study topics)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Define study topics and intervals
class StudyTopic {
  constructor(name, familiarityLevel) {
    this.name = name;
    this.familiarityLevel = familiarityLevel; // e.g., 1 (high), 3 (low)
    this.lastReviewed = new Date().getTime();
    this.reviewInterval = this.calculateInterval();
  }

  calculateInterval() {
    return this.familiarityLevel * 24 * 60 * 60 * 1000; // in ms, based on familiarity
  }

  needsReview() {
    const now = new Date().getTime();
    return now - this.lastReviewed >= this.reviewInterval;
  }

  updateReview() {
    this.lastReviewed = new Date().getTime();
    this.reviewInterval *= 1.5; // Spaced repetition expansion
  }
}

class StudyManager {
  constructor() {
    this.topics = [];
    this.sessionDuration = 25 * 60 * 1000; // 25 minutes
    this.breakDuration = 5 * 60 * 1000; // 5 minutes
    this.currentTopic = null;
    this.sessionLogs = [];
    this.distractions = 0;
  }

  addTopic(name, familiarityLevel) {
    const topic = new StudyTopic(name, familiarityLevel);
    this.topics.push(topic);
  }

  getTopicsForSession() {
    // Get all topics that need review
    const topicsToReview = this.topics.filter((topic) => topic.needsReview());
    return topicsToReview.length
      ? shuffleArray(topicsToReview)
      : shuffleArray(this.topics);
  }

  startSession() {
    const topics = this.getTopicsForSession();
    let sessionCount = 0;

    const sessionInterval = setInterval(
      () => {
        if (sessionCount % 2 === 0) {
          // Study interval
          this.currentTopic = topics[(sessionCount / 2) % topics.length];
          console.log(`Studying: ${this.currentTopic.name}`);
          this.distractions = 0; // Reset distractions

          // Log start of study
          this.sessionLogs.push({
            topic: this.currentTopic.name,
            time: new Date(),
            distractions: this.distractions,
            focusScore: null,
          });
        } else {
          // Break interval
          console.log("Taking a break!");
          if (sessionCount / 2 < topics.length) {
            this.currentTopic.updateReview(); // Mark the topic as reviewed
          }
        }

        sessionCount++;
        if (sessionCount / 2 >= topics.length) {
          clearInterval(sessionInterval);
          this.generateReport();
        }
      },
      sessionCount % 2 === 0 ? this.sessionDuration : this.breakDuration
    );
  }

  logDistraction() {
    this.distractions++;
    this.sessionLogs[this.sessionLogs.length - 1].distractions =
      this.distractions;
  }

  generateReport() {
    console.log("\nSession Report:");
    let totalFocus = 0;
    let topicsReviewed = 0;

    this.sessionLogs.forEach((log) => {
      const focusScore = Math.max(100 - log.distractions * 10, 0);
      log.focusScore = focusScore;
      console.log(`Topic: ${log.topic}, Focus Score: ${focusScore}`);
      totalFocus += focusScore;
      topicsReviewed++;
    });

    const averageFocusScore = totalFocus / topicsReviewed;
    console.log(`\nAverage Focus Score: ${averageFocusScore}`);

    const optimalTimes =
      averageFocusScore > 75
        ? "morning or early afternoon"
        : "late afternoon or evening";
    console.log(`Suggested Study Times: ${optimalTimes} based on focus score.`);
  }
}

// Example Usage
const studyManager = new StudyManager();
studyManager.addTopic("JavaScript Fundamentals", 3);
studyManager.addTopic("Data Structures", 2);
studyManager.addTopic("Algorithms", 1);

studyManager.startSession();
setTimeout(() => studyManager.logDistraction(), 5000); // Simulate a distraction at 5s
setTimeout(() => studyManager.logDistraction(), 15000); // Another at 15s
