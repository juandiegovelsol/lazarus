// Define valid colors
const validColors = [
  "white",
  "red",
  "blue",
  "pink",
  "yellow",
  "green",
  "purple",
];

// Define the Building class
class Building {
  constructor(name, parts) {
    this.name = name;
    this.parts = parts;
    this.lights = {};
    this.controls = {};
  }

  // Install a light in a specific location
  installLight(location, name) {
    if (!this.parts.includes(location)) {
      throw new Error(
        `Invalid location: ${location}. Must be one of: ${this.parts.join(
          ", "
        )}`
      );
    }
    this.lights[name] = {
      location,
      status: "off",
      color: "white",
    };
    console.log(`Light ${name} installed in ${location}.`);
  }

  // Install a control for a light
  installControl(lightName, controlName, controlLocation) {
    if (!this.lights[lightName]) {
      throw new Error(`Light ${lightName} does not exist.`);
    }
    if (!this.parts.includes(controlLocation)) {
      throw new Error(
        `Invalid control location: ${controlLocation}. Must be one of: ${this.parts.join(
          ", "
        )}`
      );
    }
    this.controls[controlName] = {
      light: lightName,
      location: controlLocation,
    };
    console.log(
      `Control ${controlName} installed in ${controlLocation} for light ${lightName}.`
    );
  }

  // Turn a light on or off using its control
  toggleLight(controlName) {
    const lightName = this.controls[controlName].light;
    const light = this.lights[lightName];
    if (light.status === "off") {
      light.status = "on";
      console.log(`Light ${lightName} turned on with color ${light.color}.`);
    } else {
      light.status = "off";
      console.log(`Light ${lightName} turned off.`);
    }
  }

  // Change the color of a light using its control
  changeLightColor(controlName, color) {
    if (!validColors.includes(color)) {
      throw new Error(
        `Invalid color: ${color}. Must be one of: ${validColors.join(", ")}`
      );
    }
    const lightName = this.controls[controlName].light;
    const light = this.lights[lightName];
    if (light.status === "off") {
      console.log(`Cannot change color of light ${lightName} when it is off.`);
    } else {
      light.color = color;
      console.log(`Light ${lightName} changed to color ${color}.`);
    }
  }

  // Install a master control
  installMasterControl(controlName, controlLocation) {
    this.installControl("master", controlName, controlLocation);
    this.controls[controlName].lights = Object.keys(this.lights);
  }

  // Toggle all lights using the master control
  toggleAllLights(controlName) {
    if (!this.controls[controlName].lights) {
      throw new Error(`Control ${controlName} is not a master control.`);
    }
    for (const lightName of this.controls[controlName].lights) {
      const light = this.lights[lightName];
      if (light.status === "off") {
        light.status = "on";
        console.log(`Light ${lightName} turned on with color ${light.color}.`);
      } else {
        light.status = "off";
        console.log(`Light ${lightName} turned off.`);
      }
    }
  }

  // Change the color of all lights using the master control
  changeAllLightsColor(controlName, color) {
    if (!validColors.includes(color)) {
      throw new Error(
        `Invalid color: ${color}. Must be one of: ${validColors.join(", ")}`
      );
    }
    if (!this.controls[controlName].lights) {
      throw new Error(`Control ${controlName} is not a master control.`);
    }
    for (const lightName of this.controls[controlName].lights) {
      const light = this.lights[lightName];
      if (light.status === "off") {
        console.log(
          `Cannot change color of light ${lightName} when it is off.`
        );
      } else {
        light.color = color;
        console.log(`Light ${lightName} changed to color ${color}.`);
      }
    }
  }
}

// Create a building
const building = new Building("Alan's house", [
  "living room",
  "kitchen",
  "bedroom",
  "garage",
  "porch",
]);

// Install lights and controls
building.installLight("living room", "living room light");
building.installControl(
  "living room light",
  "living room control",
  "living room"
);
building.installLight("kitchen", "kitchen light");
building.installControl("kitchen light", "kitchen control", "kitchen");
building.installLight("bedroom", "bedroom light");
building.installControl("bedroom light", "bedroom control", "bedroom");
building.installLight("garage", "garage light");
building.installControl("garage light", "garage control", "garage");

// Install master control
building.installMasterControl("master control", "porch");

// Test controls
building.toggleLight("living room control");
building.changeLightColor("living room control", "blue");
building.toggleLight("living room control");
building.toggleLight("living room control");
building.changeLightColor("living room control", "invalid color"); // Error

// Test master control
building.toggleAllLights("master control");
building.changeAllLightsColor("master control", "red");
building.toggleAllLights("master control");
building.toggleAllLights("master control");
building.changeAllLightsColor("master control", "invalid color"); // Error

// Test installing light in invalid location
try {
  building.installLight("invalid location", "invalid light");
} catch (error) {
  console.log(error.message);
}

// Test installing control for non-existent light
try {
  building.installControl(
    "non-existent light",
    "invalid control",
    "living room"
  );
} catch (error) {
  console.log(error.message);
}
