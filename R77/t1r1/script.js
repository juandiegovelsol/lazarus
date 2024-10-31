let isForeign = false;

// Event listener for login button click
document.getElementById("login-button").addEventListener("click", () => {
  const nationalId = document.getElementById("national-id").value;
  const gender = document.getElementById("gender").value;
  // Check if the user is foreign or entered a valid National ID
  if (!isForeign && isNaN(nationalId)) {
    if (confirm("Are you foreign?")) {
      isForeign = true;
      return;
    } else {
      alert("Please enter a valid National ID");
      return;
    }
  }
  // Hide login page and show hospital selection page
  document.getElementById("login-page").style.display = "none";
  document.getElementById("hospital-page").style.display = "block";
  // Event listener for hospital selection change
  const hospital = document.getElementById("hospital");
  hospital.addEventListener("change", () => {
    const doctor = document.getElementById("doctor");
    doctor.innerHTML = "";
    // Populate doctor dropdown based on selected hospital
    if (hospital.value === "hospital1") {
      const options = ["Doctor 1", "Doctor 2"];
      options.forEach((option) => {
        const element = document.createElement("option");
        element.value = option;
        element.textContent = option;
        doctor.appendChild(element);
      });
    } else if (hospital.value === "hospital2") {
      const options = ["Doctor 3", "Doctor 4"];
      options.forEach((option) => {
        const element = document.createElement("option");
        element.value = option;
        element.textContent = option;
        doctor.appendChild(element);
      });
    }
  });
});
// Event listener for proceed button click
document.getElementById("proceed-button").addEventListener("click", () => {
  const hospital = document.getElementById("hospital").value;
  const doctor = document.getElementById("doctor").value;
  // Ensure hospital and doctor are selected before proceeding
  if (hospital === "" || doctor === "") {
    alert("Please select hospital and doctor");
    return;
  }
  // Hide hospital page and show blood sample input page
  document.getElementById("hospital-page").style.display = "none";
  document.getElementById("blood-sample-page").style.display = "block";
  // Event listener for evaluate button click
  document.getElementById("evaluate-button").addEventListener("click", () => {
    // Get the blood sample values
    const hgb = parseFloat(document.getElementById("hgb").value);
    const hct = parseFloat(document.getElementById("hct").value);
    const wbc = parseFloat(document.getElementById("wbc").value);
    const plt = parseFloat(document.getElementById("plt").value);
    const rbc = parseFloat(document.getElementById("rbc").value);
    const gender = document.getElementById("gender").value;

    let badCount = 0;
    let result = "";

    // Evaluate hemoglobin based on gender
    if (
      (gender === "male" && (hgb < 13 || hgb > 17)) ||
      (gender === "female" && (hgb < 12 || hgb > 15))
    ) {
      result += "Hemoglobin: Bad\n";
      badCount++;
    } else {
      result += "Hemoglobin: Good\n";
    }
    // Evaluate hematocrit based on gender
    if (
      (gender === "male" && (hct < 41 || hct > 50)) ||
      (gender === "female" && (hct < 36 || hct > 44))
    ) {
      result += "Hematocrit: Bad\n";
      badCount++;
    } else {
      result += "Hematocrit: Good\n";
    }
    // Evaluate white blood cell count
    if (wbc < 4000 || wbc > 11000) {
      result += "White Blood Cell: Bad\n";
      badCount++;
    } else {
      result += "White Blood Cell: Good\n";
    }
    // Evaluate platelets count
    if (plt < 150000 || plt > 450000) {
      result += "Platelets: Bad\n";
      badCount++;
    } else {
      result += "Platelets: Good\n";
    }
    // Evaluate red blood cell count based on gender
    if (
      (gender === "male" && (rbc < 5 || rbc > 6)) ||
      (gender === "female" && (rbc < 4 || rbc > 5))
    ) {
      result += "Red Blood Cells: Bad\n";
      badCount++;
    } else {
      result += "Red Blood Cells: Good\n";
    }

    document.getElementById("result").innerText = result;

    if (badCount >= 3) {
      if (confirm("Do you want me to call the ambulance?")) {
        // Call ambulance API or logic here
      }
    }
  });
});
