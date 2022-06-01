// admin update info of customer
const update= document.getElementById("update-button");

update.addEventListener("click", function(){
    document.getElementById("view-fnameCustomer").disabled=false;
    document.getElementById("view-midnNameCustomer").disabled=false;
    document.getElementById("view-surnameCustomer").disabled=false;
    document.getElementById("view-suffixCustomer").disabled=false;
    document.getElementById("view-bdayCustomer").disabled=false;
    document.getElementById("view-male").disabled=false;
    document.getElementById("view-female").disabled=false;
    document.getElementById("view-addressCustomer").disabled=false;
    document.getElementById("view-emailCustomer").disabled=false;
    document.getElementById("view-contactCustomer").disabled=false;

    update.style.display="none"
    document.getElementById('save-update-button').style.display = "block";
    document.getElementById('cancel-update-button').style.display = "block";
});
