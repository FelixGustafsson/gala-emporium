export default async function login() {
  return `
    <div id="main-login-container">
        <div id="create-account-container">
          <h1>Create Account</h1>
            <form onsubmit="createUser(); return false">
                <label>Full name</label>
                <input type="text" name="name" placeholder="Kalle anka..." required/>
                <label>E-mail</label>
                <input type="email" name="email" placeholder="Kalleanka1@gmail.com..." required/>
                <label>Password</label>
                <input type="password" name="password" placeholder="qwerty..." required/>
                <label>Check the box if you are a club owner:</label>
                <input type="checkbox" id="isClubOwner" name="isClubOwner">
                <input type="submit" value="Create account">
                </form>
        </div>
        <br>
        <p id="registration-text"></p>
        <br>
        <div id="login-container">
          <h1>Log in</h1>
            <form onsubmit="newLogin(); return false">
                <label>E-mail</label>
                <input type="email" name="login-email" placeholder="Kalleanka1@gmail.com"/>
                <label>Password</label>
                <input type="password" name="login-password" placeholder="qwerty..."/>
                <input type="submit" value="Log in"/>
            <form>
            <br>
            <p id="login-text"></p>
        </div>
    </div>
    
    `;
}

async function createUser() {
  let newUser = {
    name: $("[name=name]").val(),
    email: $("[name=email]").val(),
    password: $("[name=password]").val(),
    isClubOwner: $("#isClubOwner").is(":checked"),
  };
  let response = await fetch("/api/user", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  console.log(response);
  if (response.status == 200) {
    $("#registration-text").text("New user successfully registered.");
  } else {
    $("#registration-text").text("Oops, something went wrong.");
  }
}

window.createUser = createUser;

async function newLogin() {
  let currentUser = {
    email: $("[name=login-email]").val(),
    password: $("[name=login-password]").val(),
  };
  let response = await fetch("/api/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentUser),
  });
  let result = await response.json();
  $("[name=login-email]").val(" ");
  $("[name=login-password]").val("");
  $("#login-text").text(result.message);
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
}

window.newLogin = newLogin;
