let buttons = document.querySelectorAll(".time");
let appointment_time = document.getElementById("appointment_time");

function getTime() {
    appointment_time.value =  "09:00";
    for(let button of buttons) {
        if(button.style.backgroundColor == "rgb(82, 183, 136)") {
            appointment_time.value = button.textContent;
        }
    }
}

for(let button of buttons) {
    button.addEventListener("click", function() {
        for(let insideButton of buttons) {
            if(insideButton === event.target) {
                insideButton.style.backgroundColor = "#52B788";
            }
            else {
                insideButton.style.backgroundColor = "#50ABF1";
            }
        }

        getTime()
    })
}

