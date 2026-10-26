const display = document.getElementById("display");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".box");

let expression = "";
let finished = false;

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.textContent.trim();

        if (value === "C") {
            expression = "";
            display.textContent = "0";
            history.textContent = "";
            finished = false;
        }

        else if (value === "=") {
            try {
                const calculation = expression
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/−/g, "-");

                if (!/^[0-9+\-*/.() ]+$/.test(calculation)) {
                    throw new Error("Invalid calculation");
                }

                const result = new Function("return " + calculation)();

                history.textContent = expression;
                display.textContent = result;
                finished = true;
            } catch {
                display.textContent = "Error";
                finished = true;
            }
        }


        else if (value === "±") {
            if (expression !== "") {
                if (expression.startsWith("-")) {
                    expression = expression.slice(1);
                } else {
                    expression = "-" + expression;
                }

                display.textContent = expression;
            }
        }

        else if (value === "%") {
            if (expression !== "") {
                expression = String(Number(expression) / 100);
                display.textContent = expression;
            }
        }

        else {
            if (finished && value !== ".") {
                expression = "";
                history.textContent = "";
            }

            if (value === "." && expression.split(/[+\-×÷]/).pop().includes(".")) {
                return;
            }

            expression += value;
            display.textContent = expression;
            finished = false;
        }

    });
});
