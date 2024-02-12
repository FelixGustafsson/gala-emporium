import home from "./pages/home.js";
import login from "./pages/login.js";

async function route() {
  let check = await fetch("/api/login");
  let userLoggedIn = await check.json();
  if (userLoggedIn.login) {
    $("#login-button").text("Logout");
    $("#login-button").prop("href", "#");
    $("#login-button").on("click", async function () {
      let result = await fetch("/api/login", {
        method: "delete",
      });
      console.log(result);
      if (result.status == 200) {
        alert("successfully logged out");
      }
    });
  } else {
    $("#login-button").text("Login");
    $("#login-button").off("click");
    $("#login-button").prop("href", "#profile");
  }
  switch (location.hash.replace("#", "")) {
    case "":
      $("main").html(await home());
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
