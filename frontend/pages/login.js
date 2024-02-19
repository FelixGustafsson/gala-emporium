import profile from "./profile.js";

export default async function login() {
  let check = await fetch("/api/login");
  let userLoggedIn = await check.json();
  if (userLoggedIn.login) {
    $("main").html(await profile());
  } else {
    let clubList = "";
    let response = await fetch("/api/club");
    let data = await response.json();
    for (let row of data) {
      clubList += `<option value=${row._id}>${row.name}</option>`;
    }
    return `
    <div id="main-login-container">
        <div id="create-account-container">
          <h1>Create Account</h1>
            <form id="create-account" onsubmit="createUser(); return false">
                <label>Full name</label>
                <input type="text" name="name" placeholder="Kalle anka..." required/>
                <label>E-mail</label>
                <input type="email" name="email" placeholder="Kalleanka1@gmail.com..." required/>
                <label>Password</label>
                <input type="password" name="password" placeholder="qwerty..." required/>
                <label>Check the box if you are a club owner:</label>
                <input type="checkbox" id="isClubOwner" name="isClubOwner" onchange="checkBoxSwitch()"/>
                <select id="clubList"  style="display:none" name="clubList">${clubList}</select>
                <input type="submit" value="Create account"/>
            </form>
        </div>
        <br>
        <p id="registration-text"></p>
        <br>
        <div id="login-container">
          <h1>Log in</h1>
            <form id="login-form" onsubmit="newLogin(); return false">
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
}

async function checkBoxSwitch() {
  if ($("[name=isClubOwner]:checked").val()) {
    $("#clubList").show();
  } else {
    $("#clubList").hide();
  }
}

window.checkBoxSwitch = checkBoxSwitch;

async function createUser() {
  let newUser = {
    name: $("[name=name]").val(),
    email: $("[name=email]").val(),
    password: $("[name=password]").val(),
    isClubOwner: $("#isClubOwner").is(":checked"),
  };
  if ($("#isClubOwner").is(":checked")) {
    newUser.club = $("[name=clubList]").val();
  }
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
  $("[name=login-email]").val("");
  $("[name=login-password]").val("");
  $("#login-text").text(result.message);
  if (result.message == "Login successful") {
    location.reload();
  }
}

window.newLogin = newLogin;
