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
}

const simulator = new UrbanGrowthSimulator();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptForInput = () => {
  rl.question("Enter transport factor (0-100): ", (transportInput) => {
    try {
      simulator.setTransportFactor(parseFloat(transportInput));
      rl.question("Enter green space factor (0-100): ", (greenSpaceInput) => {
        try {
          simulator.setGreenSpaceFactor(parseFloat(greenSpaceInput));
          rl.question(
            "Enter waste management factor (0-100): ",
            (wasteManagementInput) => {
              try {
                simulator.setWasteManagementFactor(
                  parseFloat(wasteManagementInput)
                );
                rl.question(
                  "Enter economy factor (0-100): ",
                  (economyInput) => {
                    try {
                      simulator.setEconomyFactor(parseFloat(economyInput));
                      const totalUrbanGrowth = simulator.calculateUrbanGrowth();
                      console.log(`Total Urban Growth: ${totalUrbanGrowth}`);
                      promptForInput();
                    } catch (error) {
                      console.error(error.message);
                      promptForInput();
                    }
                  }
                );
              } catch (error) {
                console.error(error.message);
                promptForInput();
              }
            }
          );
        } catch (error) {
          console.error(error.message);
          promptForInput();
        }
      });
    } catch (error) {
      console.error(error.message);
      promptForInput();
    }
  });
};

promptForInput();
