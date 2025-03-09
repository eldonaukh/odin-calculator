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
  a = parseFloat(a);
  if (b === "") {
    return a;
  } else {
    b = parseFloat(b);
  }

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
  if (result % 1 > 0) {
    return result.toFixed(2);
  }
  return parseInt(result);
}

function screenUpdate() {
  let lastNum = "";
  let operand = "";
  let currNum = "";
  let result;

  const buttons = document.querySelector(".buttons");
  const screenTxt = document.querySelector(".screen");
  const dotBtn = document.querySelector("#decimal");
  const numbers = "0123456789".split("");
  const operands = "+-*/=".split("");
  // const details = document.createElement("p");
  // document.querySelector(".calculator").appendChild(details);

  function calculatorLogic(btnTxt) {
    if (numbers.includes(btnTxt)) {
      currNum += btnTxt;
      screenTxt.innerText = currNum;
    }
  
    if (operands.includes(btnTxt)) {
      if (btnTxt === "=" && lastNum && currNum) {
        result = operate(lastNum, currNum, operand);
        screenTxt.innerText = result;
        lastNum = "";
        currNum = result;
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
      if (dotBtn.disabled === true) dotBtn.disabled = false;
    }
  
    if (btnTxt === "AC") {
      lastNum = "";
      operand = "";
      currNum = "";
      result = "";
      screenTxt.innerText = "0";
    }
  
    if (btnTxt === ".") {
      if (!currNum.includes(".")) {
        currNum += btnTxt;
        dotBtn.disabled = true;
      }
    }
  }

  buttons.addEventListener("click", (e) => {    
    let btnTxt = e.target.innerText;
    calculatorLogic(btnTxt);
    // details.innerText = `lastNum: ${lastNum}\ncurrNum: ${currNum}\noperand: ${operand}\nresult: ${result}`;
  });

  document.addEventListener("keyup", (e) => {
    let btnTxt = e.key;
    if (btnTxt === "Enter" || btnTxt === "NumpadEnter") {
      btnTxt = "=";
    }
    calculatorLogic(btnTxt);
  })
}

screenUpdate();
