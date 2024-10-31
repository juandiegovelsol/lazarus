// script.js
let isForeign = false;
let hospitalDoctors = {
  hospital1: ["Doctor 1", "Doctor 2"],
  hospital2: ["Doctor 3", "Doctor 4"],
};

document.getElementById("login-btn").addEventListener("click", () => {
  let nationalId = document.getElementById("national-id").value;
  let gender = document.getElementById("gender").value;

  if (!isForeign && !/^\d+$/.test(nationalId)) {
    if (confirm("Are you foreign?")) {
      isForeign = true;
    } else {
      alert("Please enter a valid National ID.");
      return;
    }
  }

  document.getElementById("login-page").style.display = "none";
  document.getElementById("hospital-page").style.display = "block";

  let hospitalSelect = document.getElementById("hospital");
  hospitalSelect.addEventListener("change", () => {
    let doctorSelect = document.getElementById("doctor");
    doctorSelect.innerHTML = "";
    hospitalDoctors[hospitalSelect.value].forEach((doctor) => {
      let option = document.createElement("option");
      option.value = doctor;
      option.text = doctor;
      doctorSelect.appendChild(option);
    });
  });
});

document.getElementById("hospital-btn").addEventListener("click", () => {
  let hospital = document.getElementById("hospital").value;
  let doctor = document.getElementById("doctor").value;

  if (hospital && doctor) {
    document.getElementById("hospital-page").style.display = "none";
    document.getElementById("blood-page").style.display = "block";
  } else {
    alert("Please select a hospital and a doctor.");
  }
});

document.getElementById("evaluate-btn").addEventListener("click", () => {
  let hgb = parseFloat(document.getElementById("hgb").value);
  let hct = parseFloat(document.getElementById("hct").value);
  let wbc = parseFloat(document.getElementById("wbc").value);
  let plt = parseFloat(document.getElementById("plt").value);
  let rbc = parseFloat(document.getElementById("rbc").value);
  let gender = document.getElementById("gender").value;

  let result = "";
  let badCount = 0;

  if (gender === "male") {
    if (hgb < 13 || hgb > 17) {
      result += "Hemoglobin (Hgb): Bad\n";
      badCount++;
    } else {
      result += "Hemoglobin (Hgb): Good\n";
    }

    if (hct < 41 || hct > 50) {
      result += "Hematocrit (Hct): Bad\n";
      badCount++;
    } else {
      result += "Hematocrit (Hct): Good\n";
    }

    if (rbc < 5 || rbc > 6) {
      result += "Red Blood Cells (RBC): Bad\n";
      badCount++;
    } else {
      result += "Red Blood Cells (RBC): Good\n";
    }
  } else {
    if (hgb < 12 || hgb > 15) {
      result += "Hemoglobin (Hgb): Bad\n";
      badCount++;
    } else {
      result += "Hemoglobin (Hgb): Good\n";
    }

    if (hct < 36 || hct > 44) {
      result += "Hematocrit (Hct): Bad\n";
      badCount++;
    } else {
      result += "Hematocrit (Hct): Good\n";
    }

    if (rbc < 4 || rbc > 5) {
      result += "Red Blood Cells (RBC): Bad\n";
      badCount++;
    } else {
      result += "Red Blood Cells (RBC): Good\n";
    }
  }

  if (wbc < 4000 || wbc > 11000) {
    result += "White Blood Cell (WBC): Bad\n";
    badCount++;
  } else {
    result += "White Blood Cell (WBC): Good\n";
  }

  if (plt < 150000 || plt > 450000) {
    result += "Platelets (Plt): Bad\n";
    badCount++;
  } else {
    result += "Platelets (Plt): Good\n";
  }

  document.getElementById("result").innerText = result;

  if (badCount >= 3) {
    if (confirm("Do you want me to call the ambulance?")) {
      alert("Ambulance is on the way.");
    }
  }
});
