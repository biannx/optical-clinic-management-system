function checkAll() {
    let checkboxs = document.getElementsByName("archive-check");
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
    
    updateArchiveCount();
}

function updateArchiveCount() {
    let checkboxs = document.getElementsByName("archive-check");
    let checkCount = 0;
    let archiveCounter = document.getElementById("archive-counter");

    for(let checkbox of checkboxs) {
        if(checkbox.checked == true) {
            checkCount += 1;
        }
    }

    archiveCounter.textContent = archiveCounter.textContent.replace(/[0-9]/g, checkCount);

}
