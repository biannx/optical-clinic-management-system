const confirm_form = document.getElementsByClassName("confirm_form");
const attendant_name = document.getElementsByName("attendant_name");
const appointment_status = document.getElementsByName("appointment_status");

function cancelAppointment() {
    for(let status of appointment_status) {
        status.value = 3;
    }

    for(let attendant of attendant_name) {
        attendant.disabled = true;
    }
    
    event.target.type = "submit";
    event.target.click();
}