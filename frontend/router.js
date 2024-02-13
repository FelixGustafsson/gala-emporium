import home from "./pages/home.js";
import login from "./pages/login.js";
import clubList from "./pages/clubList.js";
import about from "./pages/about.js";
import club from "./pages/club.js";
import bookEvents from "./pages/bookEvents.js";

async function route() {
  let check = await fetch("/api/login");
  let userLoggedIn = await check.json();
  if (userLoggedIn.login) {
    $("#logout-button").show();
    $("#logout-button").off("click");
    $("#logout-button").on("click", async function () {
      let result = await fetch("/api/login", {
        method: "delete",
      });
      console.log(result);
      if (result.status == 200) {
        alert("successfully logged out");
        $("#logout-button").hide();
      }
    });
  } else {
    $("#logout-button").hide();
  }
  switch (location.hash.replace("#", "")) {
    case "":
      $("main").html(await home());
      break;
    case "clubs":
      $("main").html(await clubList());
      break;
    case "about":
      $("main").html(await about());
      break;
    case "kalle-anka-klubb":
      $("main").html(await club("65c8dbc4a1c8cb7e6dad9f04"));
      break;
    case "klubb-lille-skutt":
      $("main").html(await club("65c8dd2ef830e97c1bc0e406"));
      break;
    case "book-events":
      $("main").html(await bookEvents());
      break;
    case "profile":
      console.log("hej");
      $("main").html(await login());
      break;
    default:
      console.log("404 Page Not found");
  }
}

window.onhashchange = route;
window.onload = route;
