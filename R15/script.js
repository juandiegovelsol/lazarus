const readline = require("readline");

class UrbanGrowthSimulator {
  constructor() {
    this.transportFactor = 0;
    this.greenSpaceFactor = 0;
    this.wasteManagementFactor = 0;
    this.economyFactor = 0;
    this.totalUrbanGrowth = 0;
  }

  setTransportFactor(value) {
    if (value < 0 || value > 100) throw new Error("Invalid transport factor");
    this.transportFactor = value;
  }

  setGreenSpaceFactor(value) {
    if (value < 0 || value > 100) throw new Error("Invalid green space factor");
    this.greenSpaceFactor = value;
  }

  setWasteManagementFactor(value) {
    if (value < 0 || value > 100)
      throw new Error("Invalid waste management factor");
    this.wasteManagementFactor = value;
  }

  setEconomyFactor(value) {
    if (value < 0 || value > 100) throw new Error("Invalid economy factor");
    this.economyFactor = value;
  }

  calculateUrbanGrowth() {
    this.totalUrbanGrowth = (
      this.transportFactor * 0.3 +
      this.greenSpaceFactor * 0.25 +
      this.wasteManagementFactor * 0.25 +
      this.economyFactor * 0.2
    ).toFixed(2);
    return this.totalUrbanGrowth;
  }

  async promptForInput(prompt, setter) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    while (true) {
      try {
        const answer = await this.getInputFromUser(rl, prompt);
        setter(parseFloat(answer));
        break;
      } catch (error) {
        console.error(error.message);
      }
    }

    rl.close();
  }

  getInputFromUser(rl, prompt) {
    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }

  async runSimulation() {
    console.log("Urban Growth Simulator");
    console.log("------------------------");

    while (true) {
      await this.promptForInput("Enter transport factor (0-100): ", (value) =>
        this.setTransportFactor(value)
      );
      await this.promptForInput("Enter green space factor (0-100): ", (value) =>
        this.setGreenSpaceFactor(value)
      );
      await this.promptForInput(
        "Enter waste management factor (0-100): ",
        (value) => this.setWasteManagementFactor(value)
      );
      await this.promptForInput("Enter economy factor (0-100): ", (value) =>
        this.setEconomyFactor(value)
      );

      const totalUrbanGrowth = this.calculateUrbanGrowth();
      console.log(`Total Urban Growth: ${totalUrbanGrowth}`);

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await this.getInputFromUser(
        rl,
        "Do you want to continue? (yes/no): "
      );
      if (answer.toLowerCase() !== "yes") {
        break;
      }

      rl.close();
    }
  }
}

const simulator = new UrbanGrowthSimulator();
simulator.runSimulation();
