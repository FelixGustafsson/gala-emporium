export default async function club(clubID) {
  const clubResponse = await fetch(`http://localhost:3000/api/club/${clubID}`);
  const club = await clubResponse.json();
  const eventResponse = await fetch("http://localhost:3000/api/event");
  const events = await eventResponse.json();

  let html = ``;

  for (let data of events) {
    if (data.club === club._id) {
      html += `
            <li id="club-event-li">
                <div id="event-info">
                    <h2>${data.name}: ${data.startDate.slice(
        4,
        21
      )} - ${data.endDate.slice(16, 21)}</h2>
                    <p>${data.description}</p>
                    <button onclick="bookEvent('${data._id}')">Book ${
        data.name
      }</button>
                </div>
                <img src="'${data.imageURL}'" alt="'${data.name}' image"/>
            </li>
          `;
    }
  }

  return `
    <div id="main-club-container">

    <div id="club-events-container">
         <ul>${html}</ul>
    </div>
    <div id="club-info-container">
        <h1>${club.name}</h1>
        <br/>
        <p>${club.description}</p>
        <img src="${club.imageURL}" alt="${club.name} image"/>
    </div>
    </div>
    `;
}

async function bookEvent(id) {
  let response = await fetch(`/api/event/${id}`);
  let result = await response.json();
  console.log(result);
  $("main").html(`<div id="booking-form">
      <h1>Book tickets for ${result.name} now!</h1>
      <p>Tickets available: ${result.tickets}</p>
        <form onsubmit="newBooking('${id}'); return false">
          <label>Number of tickets:</label>
          <input id="tickets" name="tickets" type="number" required/>
          <input type="submit" value="Confirm"/>
        <form>
      <p id="booking-text"></p>
    </div>`);
}

async function newBooking(id) {
  console.log(id);
  let check = await fetch("/api/login");
  let userLoggedIn = await check.json();
  if (!userLoggedIn.login) {
    $("#booking-text").text("Please log in to reserve tickets.");
    return;
  }
  let currentBooking = {
    user: userLoggedIn.login,
    event: id,
    numberOfTickets: $("[name=tickets]").val(),
  };
  let check2 = await fetch(`api/event/${id}`);
  let availability = await check2.json();
  if (currentBooking.numberOfTickets > availability.tickets) {
    $("#booking-text").text("Sorry, we don't have that many tickets left.");
    return;
  }
  let result = await fetch(`api/booking/${id}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentBooking),
  });
  result.status == 200
    ? $("#booking-text").text("Tickets successfully booked!")
    : $("#booking-text").text("Something went wrong, please try again later.");
  $("#tickets").val("");
}

window.bookEvent = bookEvent;
window.newBooking = newBooking;
