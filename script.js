const nxtBtnOne = document.querySelector(".btn-step-1");
const nxtBtnTwo = document.querySelector(".btn-step-2");
const submitButton = document.querySelector(".btn-submit");
const prevButton = document.querySelectorAll(".go-back");
const progress = document.querySelector("#progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const otpInputs = document.querySelectorAll(".otps");
const resendOTPLink = document.getElementById("resendOTP");
const wrongNumber = document.querySelector(".wrong-number");
let numberInput = document.getElementById("number").value.trim();
let phoneNumber = document.querySelector(".phone-number");
let formStepsNum = 0;
const container = document.querySelector(".container");
const successMessage = document.querySelector(".successMessage");

// buttons
prevButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    formStepsNum--;
    updateFormSteps();
    updateProgressBar();
  });
});

wrongNumber.addEventListener("click", (e) => {
  formStepsNum--;
  updateFormSteps();
  updateProgressBar();
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    if (formStep.classList.contains("form-step-active")) {
      formStep.classList.remove("form-step-active");
    }
  });
  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressBar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
    const progressActive = document.querySelectorAll(".progress-step-active");

    progress.style.width =
      ((progressActive.length - 1) / (progressSteps.length - 1)) * 56 + "%";
  });
}

// step one form validation
// email variables
function validateEmail() {
  let emailInput = document.getElementById("email").value;
  let errorText = document.querySelector(".emailError");
  let sideMessageEmail = document.querySelector(".sideMessageEmail");

  if (emailInput.trim().length === 0) {
    // Use trim() to remove leading/trailing spaces before checking length
    sideMessageEmail.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    errorText.innerHTML = "The email can't be empty.";
    errorText.style.background = "none";
    errorText.style.color = "red";
    errorText.style.fontSize = "11px";
    return false;
  } else if (
    !emailInput.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ) {
    sideMessageEmail.innerHTML = '<i class="bx bxs-error-circle"></i> '; // Show error icon in side indicator
    errorText.innerHTML = "The email is invalid.";
    errorText.style.background = "none";
    errorText.style.color = "red";
    errorText.style.fontSize = "11px";
    return false;
  } else {
    sideMessageEmail.innerHTML = '<i class="bx bxs-check-circle"></i>'; // Show checkmark icon in side indicator
    errorText.innerHTML = ""; // Clear error message when the email is valid
    errorText.style.background = "none";
    return true;
  }
}

// First name validation
function validateFname() {
  let nameInput = document.getElementById("Fname").value.trim();
  let errorText = document.querySelector(".FnError");
  let sideMessageName = document.querySelector(".sideMessageFname");

  if (nameInput.length === 0) {
    // Use trim() to remove leading/trailing spaces before checking length
    sideMessageName.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    errorText.innerHTML = "First name can't be empty.";
    errorText.style.background = "none";
    errorText.style.color = "red";
    errorText.style.fontSize = "11px";
    return false;
  } else if (!nameInput.match(/^[a-zA-Z]+$/)) {
    sideMessageName.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    errorText.innerHTML = "Invalid first name. Only letters are allowed.";
    errorText.style.background = "none";
    errorText.style.color = "red";
    errorText.style.fontSize = "11px";
    return false;
  }
  sideMessageName.innerHTML = '<i class="bx bxs-check-circle"></i>'; // Show checkmark icon in side indicator
  errorText.innerHTML = ""; // Clear error message when the first name is valid
  errorText.style.background = "none";
  return true;
}

// surname validation
function validateSname() {
  let surNameInput = document.getElementById("sname").value.trim();
  let errorText = document.querySelector(".SnError");
  let sideMessageSurname = document.querySelector(".sideMessageSname");

  if (surNameInput.length === 0) {
    // Use trim() to remove leading/trailing spaces before checking length
    sideMessageSurname.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    errorText.innerHTML = "Surname can't be empty.";
    errorText.style.background = "none";
    errorText.style.color = "red";
    errorText.style.fontSize = "11px";
    return false;
  } else if (!surNameInput.match(/^[a-zA-Z]+$/)) {
    sideMessageSurname.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    errorText.innerHTML = "Invalid first name. Only letters are allowed.";
    errorText.style.background = "none";
    errorText.style.color = "red";
    errorText.style.fontSize = "11px";
    return false;
  }
  sideMessageSurname.innerHTML = '<i class="bx bxs-check-circle"></i>'; // Show checkmark icon in side indicator
  errorText.innerHTML = ""; // Clear error message when the first name is valid
  errorText.style.background = "none";
  return true;
}

// date of birth validation
function validateDateOfBirth() {
  let dobInput = document.getElementById("dot").value;
  let errorText = document.querySelector(".dobError");
  let sideMessage = document.querySelector(".sideMessage");

  // Validate if the date is in the format "YYYY-MM-DD"
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(dobInput)) {
    sideMessage.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    errorText.innerHTML =
      "Invalid date format. Please use the format 'YYYY-MM-DD'.";
    errorText.style.color = "red";
    errorText.style.fontSize = "11px";
    return false;
  }

  // Convert the input date to a Date object
  const dobDate = new Date(dobInput);
  dobDate.max = new Date().toISOString().split("T")[0];
  // Validate if the date is a valid date
  if (isNaN(dobDate)) {
    sideMessage.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    errorText.innerHTML = "Invalid date. Please enter a valid date.";
    errorText.style.color = "red";
    errorText.style.fontSize = "11px";
    return false;
  }

  // Check if the user is at least 18 years old (adjust the age as needed)
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  if (dobDate > eighteenYearsAgo) {
    sideMessage.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    errorText.innerHTML = "You must be at least 18 years old to register.";
    errorText.style.color = "red";
    errorText.style.fontSize = "11px";
    return false;
  }

  sideMessage.innerHTML = '<i class="bx bxs-check-circle"></i>'; // Show checkmark icon in side indicator
  errorText.innerHTML = ""; // Clear error message when the date is valid
  return true;
}

// step one page validation
function validateStepOne(e) {
  e.preventDefault();
  // Call individual validation functions and store their results
  const isEmailValid = validateEmail();
  const isFnameValid = validateFname();
  const isSnameValid = validateSname();
  const isDateOfBirthValid = validateDateOfBirth();

  // Get the submit button and error element
  const btn = document.querySelector(".btn-step-1");
  const submitError = document.getElementById("btn-step-1-error");

  // Check if any of the validations failed
  if (!isEmailValid || !isFnameValid || !isSnameValid || !isDateOfBirthValid) {
    submitError.innerHTML = "Please fix error(s) to submit";
    setTimeout(function () {
      submitError.style.display = "none"; // Hide the error message after 2 seconds
    }, 2000);
    return false; // Prevent form submission
  }

  // If all validations pass, the "Next" button's opacity is set to 1,
  // and the form proceeds to the next step
  btn.style.opacity = 1;
  formStepsNum++;
  updateFormSteps();
  updateProgressBar();
}

// Attach the validateStepOne function to the "Next" button click event
nxtBtnOne.addEventListener("click", validateStepOne);

// step two form validation

// username validation
function validateUsername() {
  const unameInput = document.getElementById("uname").value.trim();
  const sideMessage = document.querySelector(".user");
  const insightMessage = document.querySelector(".username");

  if (unameInput.length === 0) {
    sideMessage.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    insightMessage.innerHTML = "Username must not be empty";
    insightMessage.style.color = "red";
    insightMessage.style.background = "transparent";
    return false;
  }

  // Regular expression for username validation (letters and numbers only)
  const usernameRegex = /^[a-zA-Z0-9]+$/;

  if (!usernameRegex.test(unameInput)) {
    sideMessage.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    insightMessage.innerHTML =
      "Username should contain letters and numbers only";
    insightMessage.style.color = "red";
    return false;
  }

  sideMessage.innerHTML = '<i class="bx bxs-check-circle"></i> ';
  insightMessage.style.background = "transparent";
  insightMessage.innerHTML = "";
  return true;
}

// password validation
function validatePassword() {
  const passwordInput = document.getElementById("password").value.trim();
  const sideMessage = document.querySelector(".userPassword");
  const insightMessage = document.querySelector(".password");

  if (passwordInput.length === 0) {
    sideMessage.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    insightMessage.innerHTML = "password must not be empty";
    insightMessage.style.color = "red";
    insightMessage.style.background = "transparent";
    return false;
  }
  // Regular expression for password validation (letters, numbers, and symbols)
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;

  if (!passwordRegex.test(passwordInput)) {
    sideMessage.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    insightMessage.innerHTML =
      "password must contain letters, numbers and special characters";
    insightMessage.style.color = "red";
    return false;
  }

  sideMessage.innerHTML = '<i class="bx bxs-check-circle"></i> ';
  insightMessage.style.background = "transparent";
  insightMessage.innerHTML = "";
  return true;
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const showIcon = document.querySelector(".show");
  const hideIcon = document.querySelector(".hide");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showIcon.style.display = "none";
    hideIcon.style.display = "block";
  } else {
    passwordInput.type = "password";
    showIcon.style.display = "block";
    hideIcon.style.display = "none";
  }
}

// state validation
function validateState() {
  const stateInput = document.getElementById("state").value;
  const sideMessage = document.querySelector(".userState");
  const insightMessage = document.querySelector(".stateMessage");

  // Check if a valid state option is selected (not the default empty value)
  if (stateInput === "") {
    sideMessage.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    insightMessage.innerHTML = "Please select a state.";
    insightMessage.style.color = "red";
    insightMessage.style.background = "none";
    return false;
  }

  sideMessage.innerHTML = '<i class="bx bxs-check-circle"></i> ';
  insightMessage.style.background = "transparent";
  insightMessage.innerHTML = "";
  return true;
}

// phone number validation
function validatePhoneNumber() {
  const numberInput = document.getElementById("number").value.trim();
  const sideMessage = document.querySelector(".number");
  const insightMessage = document.querySelector(".numberMessage");

  if (numberInput.length === 0) {
    sideMessage.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    insightMessage.innerHTML = "Phone Number must not be empty.";
    insightMessage.style.color = "red";
  }
  // Regular expression for mobile number validation (allowing only 10-digit numbers)
  const mobileNumberRegex = /^\d{11}$/;

  if (!mobileNumberRegex.test(numberInput)) {
    sideMessage.innerHTML = '<i class="bx bxs-error-circle"></i> ';
    insightMessage.innerHTML = "Please enter a valid 11-digit mobile number.";
    insightMessage.style.color = "red";
    return false;
  }

  sideMessage.innerHTML = '<i class="bx bxs-check-circle"></i> ';
  insightMessage.innerHTML = "";
  return true;
}

// validate step two page
function validateStepTwo(e) {
  e.preventDefault();
  // Call individual validation functions and store their results
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();
  const isStateValid = validateState();
  const isPhoneNumberValid = validatePhoneNumber();

  // Get the submit button and error element
  const btn = document.querySelector(".btn-step-2");
  const submitError = document.getElementById("btn-step-2-error");

  // Check if any of the validations failed
  if (
    !isUsernameValid ||
    !isPasswordValid ||
    !isStateValid ||
    !isPhoneNumberValid
  ) {
    submitError.innerHTML = "Please fix error(s) to submit";
    setTimeout(function () {
      submitError.style.display = "none"; // Hide the error message after 2 seconds
    }, 2000);
    return false; // Prevent form submission
  }

  // If all validations pass, the form proceeds to the next step
  formStepsNum++;
  updateFormSteps();
  updateProgressBar();
}

// Attach the validateStepTwo function to the "Next" button click event
nxtBtnTwo.addEventListener("click", validateStepTwo);

// final step validation
submitButton.addEventListener("click", () => {
  container.style.display = "none";
  successMessage.style.display = "block";
});
