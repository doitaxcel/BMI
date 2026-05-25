// US Customary Units
const feet = document.getElementById("ft-input");
const inch = document.getElementById("inch-input");
const pounds = document.getElementById("lbs-input");

// Metric Units
const cm = document.getElementById("cm-input");
const kg = document.getElementById("kg-input");

// Display Controllers
const resetBtn = document.getElementById("reset");
const calculateBtn = document.getElementById("calculate");
const BMI = document.getElementById("BMI");
const result = document.getElementById("result");

function resetFields() {
  feet.value = "";
  inch.value = "";
  pounds.value = "";
  cm.value = "";
  kg.value = "";
  BMI.innerHTML = "";
  result.innerHTML = "";
}

resetBtn.addEventListener("click", () => {
  resetFields();
  validateFields();
});

// RegEx for Numbers Only
function NumbersOnly(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9]/g, "");
  });
}

NumbersOnly(feet);
NumbersOnly(inch);
NumbersOnly(pounds);
NumbersOnly(cm);
NumbersOnly(kg);

const usRadio = document.getElementById("US-Units");
const MetricRadio = document.getElementById("Metric-Units");

const usUI = document.getElementById("us-ui");
const metricUI = document.getElementById("metric-ui");

function CalculateUS() {
  let lbsVal = parseFloat(pounds.value);
  let ftVal = parseFloat(feet.value);
  let inVal = parseFloat(inch.value);

  const height = ftVal * 12 + inVal;
  let answer = (703 * lbsVal) / (height * height);

  let resultValue;
  if (answer < 18.5) {
    resultValue = "Underweight";
  } else if (answer >= 18.5 && answer <= 24.9) {
    resultValue = "Healthy Weight";
  } else if (answer >= 25 && answer <= 29.9) {
    resultValue = "Healthy Weight";
  } else {
    resultValue = "Obesity";
  }

  BMI.innerHTML = `BMI: ${answer.toFixed(1)}`;
  result.innerHTML = `Result: ${resultValue}`;
}

function CalculateMetric() {
  let cmVal = parseFloat(cm.value);
  let kgVal = parseFloat(kg.value);

  const meters = cmVal / 100;

  let answer = kgVal / (meters * meters);

  let resultValue;
  if (answer < 18.5) {
    resultValue = "Underweight";
  } else if (answer >= 18.5 && answer <= 24.9) {
    resultValue = "Healthy Weight";
  } else if (answer >= 25 && answer <= 29.9) {
    resultValue = "Healthy Weight";
  } else {
    resultValue = "Obesity";
  }

  BMI.innerHTML = `BMI: ${answer.toFixed(1)}`;
  result.innerHTML = `Result: ${resultValue}`;
}

usRadio.addEventListener("change", () => {
  if (usRadio.checked) {
    resetFields();
    usUI.style.display = "block";
    metricUI.style.display = "none";

    BMI.innerHTML = "";
    result.innerHTML = "";
    validateFields();
  }
});

MetricRadio.addEventListener("change", () => {
  if (MetricRadio.checked) {
    resetFields();
    usUI.style.display = "none";
    metricUI.style.display = "block";

    BMI.innerHTML = "";
    result.innerHTML = "";
    validateFields();
  }
});

calculateBtn.addEventListener("click", () => {
  if (usRadio.checked) {
    CalculateUS();
  } else if (MetricRadio.checked) {
    CalculateMetric();
  }
});

function fieldsChecker(inputFields) {
  return inputFields.some((input) => input.value.trim() === "");
}

function validateFields() {
  let hasEmptyValue;

  if (usRadio.checked) {
    hasEmptyValue = fieldsChecker([feet, inch, pounds]);
  } else if (MetricRadio.checked) {
    hasEmptyValue = fieldsChecker([cm, kg]);
  }

  calculateBtn.disabled = hasEmptyValue;
}

feet.addEventListener("input", validateFields);
inch.addEventListener("input", validateFields);
pounds.addEventListener("input", validateFields);
cm.addEventListener("input", validateFields);
kg.addEventListener("input", validateFields);

validateFields();
