function clearValue() {
  document.getElementById("result").value = "";
}

function get(value) {
  document.getElementById("result").value += value;
}

function calculate() {
  var result = 0;
  result = document.getElementById("result").value;
  document.getElementById("result").value = "";
  document.getElementById("result").value = eval(result);
};
