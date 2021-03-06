const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, msg) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = msg;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid!");
  }
}
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required!`);
    } else {
      showSuccess(input);
    }
  });
}
function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must have length between ${min} and ${max}`
    );
  } else {
    showSuccess(input);
  }
}
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `Passwords donot match!`);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 5, 20);
  checkLength(password, 6, 20);
  validateEmail(email);
  checkPasswordsMatch(password, password2);
});
