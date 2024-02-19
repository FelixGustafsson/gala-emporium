import bookingConfirmation from './bookingConfirmation.js';

export default async function bookEvent(id) {
  let response = await fetch(`/api/event/${id}`);
  let result = await response.json();

  $('main').html(`<div id="booking-form">
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
  let check = await fetch('/api/login');
  let userLoggedIn = await check.json();
  if (!userLoggedIn.login) {
    $('#booking-text').text('Please log in to reserve tickets.');
    return;
  }
  let currentBooking = {
    user: userLoggedIn.login,
    event: id,
    numberOfTickets: $('[name=tickets]').val(),
  };
  let check2 = await fetch(`api/event/${id}`);
  let availability = await check2.json();
  if (currentBooking.numberOfTickets > availability.tickets) {
    $('#booking-text').text("Sorry, we don't have that many tickets left.");
    return;
  }
  let result = await fetch(`api/booking/${id}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(currentBooking),
  });
  result.status == 200
    ? $('#booking-text').text('Tickets successfully booked!')
    : $('#booking-text').text('Something went wrong, please try again later.');
  $('#tickets').val('');

  bookingConfirmation(currentBooking);
}

window.bookEvent = bookEvent;
window.newBooking = newBooking;
