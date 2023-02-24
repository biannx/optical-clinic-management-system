// add active class in selected list item
const list = document.querySelectorAll('.list');
let url = window.location.href;
url = url.replace("http://localhost:3000/api/", "");

switch(url) {

  case "dashboard":
    list[0].className = "active";
  break;

  case "customers":
    list[1].className = "active";
  break;

  case "attendants":
    list[2].className = "active";
  break;

  case "products":
    list[3].className = "active";
  break;

  case "orders":
    list[4].className = "active";
  break;

  case "appointments":
    list[5].className = "active";
  break;

  case "admin":
    list[6].className = "active";
  break;

  case "change-password":
    list[7].className = "active";
  break;
}

