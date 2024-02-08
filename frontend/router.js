import home from "./pages/home.js";

async function route() {
  switch (location.hash.replace("#", "")) {
    case "":
      $("main").html(await home());
      break;
    default:
      console.log("404 Page Not found");
  }
}

window.onhashchange = route;
window.onload = route;
