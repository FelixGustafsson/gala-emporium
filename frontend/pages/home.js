export default async function home() {
  const response = await fetch("http://localhost:3000/api/event");
  const result = await response.json();
  console.log(result);
  let html = "";

  for (let data of result) {
    let date = `${data.startDate}`;
    let newDate = date.slice(4, 21);
    let endDate = `${data.endDate}`;
    let newEndDate = endDate.slice(16, 21);

    html += `
        <li>${data.name}:  ${newDate}-${newEndDate}</li>
      `;
  }

  return `
  <div id="main-container">
  <div id="calendar-container">
  <h1>EVENT CALENDAR</h1>
  <ul>${html}</ul>
  <a href="#book-events" id="book-now-button")">Book now</a>
  </div>
  <img src="../assets/venue.jpg" alt="Our venue"></img>
  </div>
  `;
}
/*
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

  // patch request to update ticket availability - not currently working - 400 error
  /*let ticketsLeft = availability.tickets - currentBooking.numberOfTickets;
  console.log(ticketsLeft); // this works
  let updatedAvailability = { tickets: ticketsLeft };
  console.log(updatedAvailability);
  let update = await fetch(`api/event/${id}`, {
    method: "patch",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedAvailability),
  });
  console.log(update);
  let outcome = await update.json();
  console.log(outcome);
}*/

//window.bookEvent = bookEvent;
//window.newBooking = newBooking;
