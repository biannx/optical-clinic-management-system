let subtotal = document.getElementById("subtotal");
let total = document.getElementById("total");
let shippingFee = document.getElementById("shippingFee");

function checkAll() {
    let checkboxs = document.getElementsByName("cart-check[]");
    let checkAll = document.getElementById("check-all");
   
    if(checkAll.checked == true) {
        for(let checkbox of checkboxs) {
            checkbox.checked = true;
        }
    }
    else {
        for(let checkbox of checkboxs) {
            checkbox.checked = false;
        }
    }

    updateItemCount()
}

function updateItemCount() {
    let checkboxs = document.getElementsByName("cart-check[]");
    let checkCount = 0;
    let price = 0;
    let quantity = 0;
    let totalPrice = 0;
    let itemCounter = document.getElementById("item-counter");

    for(let checkbox of checkboxs) {
        if(checkbox.checked == true) {
            price = checkbox.parentElement.childNodes[3].childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[3].childNodes[1].textContent;
            quantity = parseInt(checkbox.parentElement.childNodes[3].childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[3].textContent);
            price = price.replace("PHP ", "");
            totalPrice += (parseInt(price) * quantity);
            checkCount += 1;
        }
    }


    itemCounter.textContent = itemCounter.textContent.replace(/[0-9]/g, checkCount);
    if(checkCount > 0) {
        shippingFee.textContent = "PHP 50.00"
        total.textContent = "PHP " + (totalPrice + 50);
        subtotal.textContent = "PHP " + totalPrice;

    }
    else {
        shippingFee.textContent = "PHP 0.00"
        total.textContent = "PHP 0.00";
        subtotal.textContent = "PHP 0.00";
    }
}

function checkout() {
    const checkoutForm = document.getElementById("checkout-form");

    const hiddenField = document.createElement("input");
    let tempValue = [];
    hiddenField.type = "hidden";
    hiddenField.name = "cart-checks";
    hiddenField.value = [];
    
    let checkboxs = document.getElementsByName("cart-check[]");

    for(let checkbox of checkboxs) {
        if(checkbox.checked == true) {
            tempValue.push(checkbox.value.trim());
        }
    }

    console.log(tempValue);
    hiddenField.value = tempValue;

    checkoutForm.appendChild(hiddenField);

    checkoutForm.submit();
}