const updateInfo = document.getElementById("update-info");

updateInfo.addEventListener("click", function () {
  document.getElementById("firstName").disabled = false;
  document.getElementById("middleName").disabled = false;
  document.getElementById("lastName").disabled = false;
  document.getElementById("suffix").disabled = false;
  document.getElementById("birthdate").disabled = false;
  document.getElementById("male").disabled = false;
  document.getElementById("female").disabled = false;
  document.getElementById("contactNumber").disabled = false;
  document.getElementById("email").disabled = false;

  updateInfo.style.display = "none";
  document.getElementById("customer-info").style.display = "block";
});

// attendant upload profile picture
const imgDiv = document.querySelector(".profile-pic-div");
const img = document.querySelector("#photo");
const file = document.querySelector("#file");
const uploadBtn = document.querySelector("#uploadBtn");

// if user hover
imgDiv.addEventListener("mouseenter", function () {
  uploadBtn.style.opacity = "1";
});

// if we hover out from img div
imgDiv.addEventListener("mouseleave", function () {
  uploadBtn.style.opacity = "0.7";
});

// showing image functionality when uploaded an image
file.addEventListener("change", function () {
  // refers to file
  const choosedFile = this.files[0];

  if (choosedFile) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      img.setAttribute("src", reader.result);
    });

    reader.readAsDataURL(choosedFile);
  }
});

const edit = document.getElementById("edit-photo");

edit.addEventListener("click", function () {
  document.getElementById("file").disabled = false;

  document.getElementById("edit-photo-div").style.display = "none";
  document.getElementById("update-photo").style.display = "block";
  document.getElementById("customer-photo1").style.display = "block";

});