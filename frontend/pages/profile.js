export default async function profile() {
  const userResponse = await fetch("/api/login");
  const user = await userResponse.json();
  console.log(user);
  const profileUserResponse = await fetch(`/api/user/${user.login}`);
  const profileUser = await profileUserResponse.json();
  console.log(profileUser);

  let html = "";

  if (profileUser.isClubOwner) {
    html += `
    <div>Club Owner (tbc)</div>
    `;
    return `
    <div id="main-profile-container">
        <h1>Welcome ${profileUser.name}</h1>
        <br/>
        <br/>
        <br/>
        <p>${html}</p>
        `;
  } else {
    for (let data of profileUser.bookedEvents) {
      const eventResponse = await fetch(`/api/event/${data.event[0]}`);
      const event = await eventResponse.json();

      html += `
        <li>
            <h3>${event.name} - ${data.numberOfTickets} Tickets</h3>
            <button onclick="cancelBooking('${data._id}')">Cancel booking</button>
        </li>
    `;
    }
    return `
    <div id="main-profile-container">
        <h1>Welcome ${profileUser.name}</h1>
        <br/>
        <br/>
        <br/>
        <h2>Your bookings:</h2>
        <br/>
        <ul>${html}</ul>
    </div>
  `;
  }
}

async function cancelBooking(id) {
  let response = await fetch(`/api/booking/${id}`, {
    method: "delete",
  });
  let result = response.json();
  console.log(result);
  location.reload();
}

window.cancelBooking = cancelBooking;
