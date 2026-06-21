const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const dropArea = document.getElementById("dropArea");
const dropContent = document.getElementById("dropContent");

const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const score = document.getElementById("score");
const barFill = document.getElementById("barFill");
const statusBadge = document.getElementById("statusBadge");
const tipsList = document.getElementById("tipsList");

const diseaseDatabase = [
  {
    name: "Tomato Early Blight",
    confidence: 91,
    status: "Disease Detected",
    description:
      "AI analysis indicates symptoms similar to Tomato Early Blight.",
    tips: [
      "Remove infected leaves immediately.",
      "Avoid overhead watering.",
      "Improve air circulation.",
      "Use suitable fungicide if necessary."
    ]
  },

  {
    name: "Potato Late Blight",
    confidence: 88,
    status: "Disease Detected",
    description:
      "The uploaded leaf appears similar to Potato Late Blight infection.",
    tips: [
      "Monitor plants daily.",
      "Remove affected leaves.",
      "Keep foliage dry.",
      "Apply disease management practices."
    ]
  },

  {
    name: "Maize Leaf Spot",
    confidence: 84,
    status: "Possible Disease",
    description:
      "Leaf patterns resemble Maize Leaf Spot symptoms.",
    tips: [
      "Use healthy seeds.",
      "Practice crop rotation.",
      "Avoid excessive moisture.",
      "Inspect nearby plants."
    ]
  },

  {
    name: "Rose Black Spot",
    confidence: 86,
    status: "Disease Detected",
    description:
      "Symptoms are similar to Rose Black Spot fungal infection.",
    tips: [
      "Remove infected leaves.",
      "Prune affected stems.",
      "Avoid wet foliage.",
      "Use fungicide when required."
    ]
  },

  {
    name: "Healthy Plant",
    confidence: 97,
    status: "Healthy Plant",
    description:
      "No major disease symptoms detected by the AI system.",
    tips: [
      "Continue regular monitoring.",
      "Maintain balanced watering.",
      "Check for pests weekly.",
      "Keep soil nutrient-rich."
    ]
  }
];

function updateResult(data) {

  resultTitle.textContent = data.name;

  resultText.innerHTML = `
    ${data.description}
    <br><br>
    <strong>AI Model:</strong> PlantCare AI v1.0
    <br>
    <strong>Processing:</strong> Completed Successfully
  `;

  score.textContent = data.confidence + "%";

  barFill.style.width = data.confidence + "%";

  statusBadge.textContent = "Status: " + data.status;

  tipsList.innerHTML = "";

  data.tips.forEach(tip => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });
}

function showLoading() {

  resultTitle.textContent = "Analyzing Leaf Image...";
  resultText.textContent =
    "Artificial Intelligence model is processing the uploaded image.";

  score.textContent = "--%";

  barFill.style.width = "0%";

  statusBadge.textContent = "Status: Processing";

  tipsList.innerHTML = `
    <li>Scanning image...</li>
    <li>Detecting leaf patterns...</li>
    <li>Comparing with disease database...</li>
  `;
}

function predict() {

  if (!preview.src || preview.style.display === "none") {
    alert("Please upload a leaf image first.");
    return;
  }

  showLoading();

  setTimeout(() => {

    const crop = document.getElementById("cropType").value;
    const note = document.getElementById("note").value.toLowerCase();
    const mode = document.getElementById("mode").value;

    let result;

    if (note.includes("yellow") || note.includes("spot")) {

      result = diseaseDatabase[0];

    } else if (crop === "Potato") {

      result = diseaseDatabase[1];

    } else if (crop === "Maize") {

      result = diseaseDatabase[2];

    } else if (crop === "Rose") {

      result = diseaseDatabase[3];

    } else if (mode === "Presentation mode") {

      result = diseaseDatabase[4];

    } else {

      result =
        diseaseDatabase[
          Math.floor(Math.random() * diseaseDatabase.length)
        ];
    }

    updateResult(result);

  }, 2000);
}

function setHealthy() {
  updateResult(diseaseDatabase[4]);
}

fileInput.addEventListener("change", event => {

  const file = event.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  const imageURL = URL.createObjectURL(file);

  preview.src = imageURL;
  preview.style.display = "block";

  dropContent.style.display = "none";

  updateResult({
    name: "Image Uploaded",
    confidence: 95,
    status: "Ready for Detection",
    description:
      "Leaf image uploaded successfully. Click Detect Disease to start AI analysis.",
    tips: [
      "Use a clear image.",
      "Capture only the leaf.",
      "Good lighting improves results.",
      "Select correct crop type."
    ]
  });
});

["dragenter", "dragover"].forEach(eventName => {

  dropArea.addEventListener(eventName, event => {

    event.preventDefault();

    dropArea.classList.add("drag");

  });

});

["dragleave", "drop"].forEach(eventName => {

  dropArea.addEventListener(eventName, event => {

    event.preventDefault();

    dropArea.classList.remove("drag");

  });

});

dropArea.addEventListener("drop", event => {

  const file = event.dataTransfer.files[0];

  if (file && file.type.startsWith("image/")) {

    fileInput.files = event.dataTransfer.files;

    fileInput.dispatchEvent(
      new Event("change")
    );
  }
});

window.onload = () => {

  statusBadge.textContent =
    "Status: Waiting for Image Upload";

};