class Light {
  /**
   * Represents a light in the building.
   * @param {string} name - The name of the light.
   * @param {string} location - The location of the light in the building.
   */
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.isOn = false;
    this.color = "white"; // default color
    this.previousColor = "white";
  }

  /**
   * Turns the light on or off.
   * @param {boolean} on - True to turn on, false to turn off.
   */
  turn(on) {
    console.log(this.color);
    if (on && !this.isOn) {
      this.isOn = true;
      this.color = this.previousColor;
      console.log(`${this.name} is turned on with color ${this.color}.`);
    } else if (!on && this.isOn) {
      this.isOn = false;
      this.previousColor = this.color;
      console.log(`${this.name} is turned off.`);
    }
  }

  /**
   * Changes the color of the light.
   * @param {string} color - The new color of the light.
   */
  changeColor(color) {
    const validColors = [
      "white",
      "red",
      "blue",
      "pink",
      "yellow",
      "green",
      "purple",
    ];
    if (validColors.includes(color)) {
      this.color = color;
      if (this.isOn) {
        console.log(`${this.name} color changed to ${color}.`);
      } else {
        console.log(`Turn on ${this.name} before changing its color.`);
      }
    } else {
      console.log(`Invalid color: ${color}.`);
    }
  }
}

class Control {
  /**
   * Represents a control for a light in the building.
   * @param {string} name - The name of the control.
   * @param {string} location - The location of the control in the building.
   * @param {Light} light - The light associated with this control.
   */
  constructor(name, location, light) {
    this.name = name;
    this.location = location;
    this.light = light;
  }

  /**
   * Turns the associated light on or off using this control.
   * @param {boolean} on - True to turn on, false to turn off.
   */
  turn(on) {
    this.light.turn(on);
  }

  /**
   * Changes the color of the associated light using this control.
   * @param {string} color - The new color of the light.
   */
  changeColor(color) {
    this.light.changeColor(color);
  }
}

class Building {
  /**
   * Represents a building with lights and controls.
   * @param {string} name - The name of the building.
   * @param {Object} parts - An object containing the parts of the building.
   */
  constructor(name, parts) {
    this.name = name;
    this.parts = parts;
    this.lights = {};
    this.controls = {};
  }

  /**
   * Installs a light in a certain location of the building.
   * @param {string} location - The location to install the light.
   * @param {string} name - The name of the light.
   */
  installLight(location, name) {
    if (this.parts[location]) {
      this.lights[name] = new Light(name, location);
      console.log(`Light ${name} installed in ${location}.`);
    } else {
      console.log(`Invalid location: ${location}.`);
    }
  }

  /**
   * Installs a control for a light in a certain location of the building.
   * @param {Light} light - The light associated with this control.
   * @param {string} controlName - The name of the control.
   * @param {string} controlLocation - The location to install the control.
   */
  installControl(light, controlName, controlLocation) {
    if (this.parts[controlLocation]) {
      this.controls[controlName] = new Control(
        controlName,
        controlLocation,
        light
      );
      console.log(
        `Control ${controlName} installed in ${controlLocation} for light ${light.name}.`
      );
    } else {
      console.log(`Invalid location: ${controlLocation}.`);
    }
  }

  /**
   * Installs a master control that controls all lights of the building.
   * @param {string} controlName - The name of the control.
   * @param {string} controlLocation - The location to install the control.
   */
  installMasterControl(controlName, controlLocation) {
    if (this.parts[controlLocation]) {
      const masterControl = new Control(controlName, controlLocation, null);
      masterControl.lights = this.lights;
      masterControl.turn = (on) => {
        Object.values(this.lights).forEach((light) => light.turn(on));
      };

      masterControl.changeColor = (color) => {
        Object.values(this.lights).forEach((light) => {
          light.changeColor(color);
        });
      };
      this.controls[controlName] = masterControl;
      console.log(`Master control installed in ${controlLocation}.`);
    } else {
      console.log(`Invalid location: ${controlLocation}.`);
    }
  }
}

// Create a building
const building = new Building("Alan's house", {
  "living room": true,
  kitchen: true,
  bedroom: true,
  garage: true,
  porch: true,
});

// Install lights
building.installLight("living room", "Living Room Light");
building.installLight("kitchen", "Kitchen Light");
building.installLight("bedroom", "Bedroom Light");
building.installLight("garage", "Garage Light");

// Install controls
building.installControl(
  building.lights["Living Room Light"],
  "Living Room Control",
  "living room"
);
building.installControl(
  building.lights["Kitchen Light"],
  "Kitchen Control",
  "kitchen"
);
building.installControl(
  building.lights["Bedroom Light"],
  "Bedroom Control",
  "bedroom"
);
building.installControl(
  building.lights["Garage Light"],
  "Garage Control",
  "garage"
);

building.installMasterControl("master control", "porch");

console.log("Master Control installed in porch for all lights.");

// Sample usage
building.controls["Living Room Control"].turn(true);
building.controls["Living Room Control"].changeColor("blue");
building.controls["Living Room Control"].turn(false);
building.controls["Living Room Control"].changeColor("red");
building.controls["Living Room Control"].turn(true);
/* building.controls["Kitchen Control"].turn(true);
building.controls["master control"].turn(false);
building.controls["Bedroom Control"].changeColor("green");
building.controls["master control"].turn(true);
building.controls["master control"].changeColor("green");

// Error handling
building.installLight("backyard", "Backyard Light"); // invalid location
building.lights["Living Room Light"].changeColor("orange"); // invalid color */
