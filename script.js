// Get the main area to display content
const main = document.getElementsByTagName("main")[0];

// Task one: display content
const task1_content = `
<h4>A simple program that captures user input, 
makes decisions using if/else, and outputs results.</h4>
<br/><hr/><br/>
<div id="response"></div>
<form id="ageForm">
    <h4>
        Enter your age and we will tell you if you are eligible to drink or drive in Kenya.
    </h4>
    <br/>
    <label for="ageInput">Enter Your Age:</label>
    <input id="ageInput" type="number" min="0" placeholder="Type your age here" required />
    <input type="submit" value="Check" />
</form>
`;

const task2_content = `
<h4>A custom function that takes input, processes it, 
and displays the result</h4>
<br/><hr/><br/>
<p>
    This is a simple calculator that uses custom functions to 
    perform addition, subtraction, multiplication, and division 
    based on user input, and then displays the result.
</p>
<br/><hr/><br/>
<div  class="calc">
    <h5>Calculator</h5>
    <h6>Enter to submit</h6>
    <form>
        <input type="text" class="values" placeholder="1 + 1">
    </form>
    <div id="result"></div>
</div>
`
const task3_content = `
<h4>Using Loops to Build a Multiplication Table</h4>
<br/><hr/><br/>
<p>
    This task demonstrates the power of JavaScript loops by generating 
    a multiplication table dynamically based on user input. 
    The user enters a number, and a <code>for</code> loop is used 
    to display the full table for that number, from 1 to 12.
</p>
<br/><hr/><br/>
<div id="tableResult" style="margin-top: 1em;"></div>
<form id="tableForm">
    <label for="tableInput">Enter a number:</label>
    <input type="number" id="tableInput" min="1" required placeholder="e.g. 5" />
    <input type="submit" value="Generate Table" />
</form>
`;

const task4_content = `
<h4>Interactive Theme Switcher Using JavaScript and DOM Manipulation</h4>
<br/><hr/><br/>
<p>
    This demo shows how JavaScript can be used to interact with the DOM to change styles and respond to user actions. 
    Click a button below to change the theme of the page dynamically.
</p>
<br/><hr/><br/>

<div class="theme-switcher">
    <button class="btn light">🌞 Light Mode</button>
    <button class="btn dark">🌙 Dark Mode</button>
    <button class="btn random">🎨 Random Color</button>
</div>
`;


document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementsByTagName("main")[0];
    const options = document.querySelectorAll(".option");

    // Utility to remove .active from all navs
    const removeActiveClass = () => {
        options.forEach(option => option.classList.remove("active"));
    };

    // Render the selected task and attach its logic
    function renderTask(taskNumber) {
        removeActiveClass();

        switch (taskNumber) {
            case 1:
                main.innerHTML = task1_content;
                document.querySelector(".one").classList.add("active");
                attachTask1Logic();
                break;
            case 2:
                main.innerHTML = task2_content;
                document.querySelector(".two").classList.add("active");
                attachTask2Logic();
                break;
            case 3:
                main.innerHTML = task3_content;
                document.querySelector(".three").classList.add("active");
                attachTask3Logic();
                break;
            case 4:
                main.innerHTML = task4_content;
                document.querySelector(".four").classList.add("active");
                attachTask4Logic();
                break;
        }
    }

    // Task 1 logic
    function attachTask1Logic() {
        const form = document.getElementById("ageForm");
        const response = document.getElementById("response");

        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            const age = parseInt(document.getElementById("ageInput").value, 10);

            if (isNaN(age)) {
                response.textContent = "Please enter a valid number.";
                response.style.color = "crimson";
                return;
            }

            const messages = [];

            if (age >= 18) {
                messages.push("✅ You are eligible to drive.");
                messages.push("✅ You are eligible to drink.");
            } else {
                messages.push("🚫 You are not eligible to drive.");
                messages.push("🚫 You are not eligible to drink.");
            }

            response.innerHTML = messages.join("<br/>");
            response.style.color = "#111827";
        });
    }

    // Task 2 logic
    function attachTask2Logic() {
        const form = document.querySelector(".calc form");
        const input = document.querySelector(".calc .values");
        const resultDiv = document.getElementById("result");

        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            const expression = input.value.trim();

            if (!expression) {
                resultDiv.textContent = "⚠️ Please enter a math expression.";
                return;
            }

            const output = evaluateExpression(expression);
            resultDiv.textContent = output;
        });

        function evaluateExpression(expression) {
            try {
                const safePattern = /^[\d+\-*/().\s]+$/;

                if (!safePattern.test(expression)) {
                    return "❌ Invalid characters in expression.";
                }

                const result = eval(expression);

                if (typeof result !== "number" || isNaN(result)) {
                    return "⚠️ Invalid expression. Please check your input.";
                }

                return `Result: ${Math.round(result * 100) / 100}`;
            } catch (err) {
                return "⚠️ Invalid expression. Please check your input.";
            }
        }
    }

    // Task 3 logic
    function attachTask3Logic() {
    const form = document.getElementById("tableForm");
    const input = document.getElementById("tableInput");
    const output = document.getElementById("tableResult");

    form?.addEventListener("submit", (e) => {
        e.preventDefault();

        const number = parseInt(input.value, 10);

        if (isNaN(number) || number < 1) {
            output.innerHTML = `<p style="color:crimson;">⚠️ Please enter a valid number greater than 0.</p>`;
            return;
        }

        let tableHTML = `<h5>Multiplication Table for ${number}</h5>
        <br>
        <ul style="list-style: none; padding-left: 0;">`;

        for (let i = 1; i <= 12; i++) {
            tableHTML += `<li>${number} × ${i} = ${number * i}</li>`;
        }

        tableHTML += `</ul>`;
        output.innerHTML = tableHTML;
    });
}

// Task 4 logic
function attachTask4Logic() {
    const lightBtn = document.querySelector(".btn.light");
    const darkBtn = document.querySelector(".btn.dark");
    const randomBtn = document.querySelector(".btn.random");

    const body = document.body;

    lightBtn?.addEventListener("click", () => {
        body.style.backgroundColor = "#f9fafb"; // light gray
    });

    darkBtn?.addEventListener("click", () => {
        body.style.backgroundColor = "#111827"; // dark background
    });

    randomBtn?.addEventListener("click", () => {
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        body.style.backgroundColor = randomColor;
    });
}


    // Attach click handlers to nav options
    options.forEach(option => {
        option.addEventListener("click", () => {
            if (option.classList.contains("one")) renderTask(1);
            else if (option.classList.contains("two")) renderTask(2);
            else if (option.classList.contains("three")) renderTask(3);
            else renderTask(4);
        });
    });

    // Initial render
    renderTask(1);
});
