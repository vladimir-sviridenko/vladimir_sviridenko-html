const ClearRadioButton = document.querySelectorAll(".radio-button__clear-button");

ClearRadioButton.forEach((button) => {
  button.onclick = (event) => {
    const targetCheckBoxId = event.target.getAttribute("data-for");
    const checkBoxToDisable = document.getElementById(targetCheckBoxId);
    checkBoxToDisable.checked = false;
  }
});
