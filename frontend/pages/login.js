export default async function login() {
  return `
    <div id="main-login-container">
        <div id="create-account-container">
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
            <form onsubmit="newLogin(); return false">
                <label>E-mail</label>
                <input type="email" name="login-email" placeholder="Kalleanka1@gmail.com"/>
                <label>Password</label>
                <input type="password" name="login-password" placeholder="qwerty..."/>
                <button type="submit">Log in</button>
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
  if ((await response.status) == 200) {
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
  console.log(currentUser);
  let response = await fetch("/api/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentUser),
  });
  let result = await response.json();
  $("#login-text").text(result.message);
}

window.newLogin = newLogin;
