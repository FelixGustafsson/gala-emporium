export default async function login() {
  return `
    <div id="main-login-container">
        <div id="create-account-container">
            <form>
                <label>Full name</label>
                <input type="text" placeholder="Kalle anka..."/>
                <label>E-mail</label>
                <input type="email" placeholder="Kalleanka1@gmail.com..."/>
                <label>Password</label>
                <input type="password" placeholder="qwerty..."/>
                <button type="submit">Create account</button>
            </form>
        </div>
        <div id="login-container">
            <label>E-mail</label>
            <input type="email" placeholder="Kalleanka1@gmail.com"/>
            <label>Password</label>
            <input type="password" placeholder="qwerty..."/>
            <button type="submit">Log in</button>
        </div>
    </div>
    
    `;
}
