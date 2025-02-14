function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operand) {
  let result;
  a = parseInt(a);
  b === "" ? (b = 0) : (b = parseInt(b));
  if (operand === "") operand = 0;
  switch (operand) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
  }
  return result;
}

function screenUpdate() {
  let lastNum = "";
  let operand = "";
  let currNum = "";
  let result;

  const buttons = document.querySelector(".buttons");
  const screenTxt = document.querySelector(".screen");

  buttons.addEventListener("click", (e) => {
    const numbers = "0123456789".split("");
    const operands = "+-*/=".split("");
    let btnTxt = e.target.innerText;

    if (numbers.includes(btnTxt)) {
      currNum += btnTxt;
      screenTxt.innerText = currNum;
    }

    if (operands.includes(btnTxt)) {
      if (btnTxt === "=") {
        result = operate(lastNum, currNum, operand);
        screenTxt.innerText = result;
        lastNum = result;
        operand = "+";
        currNum = "0";
      } else {
        operand = btnTxt;
        if (lastNum === "") {
          lastNum = currNum;
        } else {
          result = operate(lastNum, currNum, operand);
          screenTxt.innerText = result;
          lastNum = result;
        }
        currNum = "";
      }
    }

    if (btnTxt === "AC") {
      lastNum = "";
      operand = "";
      currNum = "";
      screenTxt.innerText = "0";
    }
  });
}

screenUpdate();
