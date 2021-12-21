const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

const calculator = {
    input: [],
    operator: "",
    val1: 0, // shown value
    val2: "start", // hidden value
    add () {
        return this.val1 + this.val2
    },
    subtract () {
        return this.val2 - this.val1
    },
    multiply () {
        return this.val2 * this.val1
    },
    divide () {
        return this.val2 / this.val1
    }
}

function toggleDecimal () {
    if (calculator.input.includes(".")) {
        document.getElementById("decimal").setAttribute("disabled", true);
    } else {
        document.getElementById("decimal").removeAttribute("disabled");
    }
}

function clear () {
    calculator.input = [];
    calculator.operator = "";
    calculator.val1 = 0;
    calculator.val2 = "start";
    document.getElementById("screen").innerHTML = 0;
}

function equals () {
    if (calculator.val2 == "start") {
        return
    }
    if (calculator.val1 == null || !calculator.operator) {
        document.getElementById("screen").innerHTML = calculator.val2;
    } else {
        switch (calculator.operator) {
            case "add":
                calculator.val2 = calculator.add();
                break;
    
            case "subtract":
                calculator.val2 = calculator.subtract();
                break;
            
            case "multiply":
                calculator.val2 = calculator.multiply();
            break;
    
            case "divide":
                calculator.val2 = calculator.divide();
            break;
        }
        calculator.val1 = calculator.val2;
        calculator.operator = "";           
        document.getElementById("screen").innerHTML = calculator.val2;
        if (calculator.val2 == undefined || calculator.val2 == Infinity) {
            clear();
            document.getElementById("screen").innerHTML = "Cannot divide by 0";
        }
    }
    calculator.input = [];
    toggleDecimal();
}

function handleNumberClick (e) {
    calculator.input.push(e.target.innerText);
    calculator.val1 = parseFloat(calculator.input.reduce((sum, elem) => sum + elem));
    document.getElementById("screen").innerHTML = calculator.input.reduce((sum, elem) => sum + elem);
    toggleDecimal()
}

function handleOperatorClick (e) {
    calculator.input = [];
    toggleDecimal()
    if (calculator.operator) {
        switch (calculator.operator) {
            case "add":
                calculator.val2 = calculator.add();
                break;
    
            case "subtract":
                calculator.val2 = calculator.subtract();
                break;
            
            case "multiply":
                calculator.val2 = calculator.multiply();
            break;
    
            case "divide":
                calculator.val2 = calculator.divide();
            break;
        }
    } else {
        calculator.val2 = calculator.val1;
        calculator.val1 = null;
    }
    calculator.operator = e.target.value;
    document.getElementById("screen").innerHTML = calculator.val2;
    if (calculator.val2 == undefined || calculator.val2 == Infinity) {
        clear("Cannot divide by 0");
    }
}

numberButtons.forEach((button) => button.addEventListener('click', handleNumberClick));

operatorButtons.forEach((button) => button.addEventListener('click', handleOperatorClick));

document.getElementById("clear").addEventListener('click', clear);

document.getElementById("equals").addEventListener('click', equals);