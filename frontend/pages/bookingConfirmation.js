export default async function bookingConfirmation(booking) {
  const userResponse = await fetch(`/api/user/${booking.user}`);
  const user = await userResponse.json();
  const eventResponse = await fetch(`/api/event/${booking.event}`);
  const event = await eventResponse.json();

  $('main').html(`
  <div id="confirmation-container">
    <h1>Thank you for your booking ${user.name}</h1>
    <h2>${event.name}</h2>
    <h2>Date: ${event.startDate.slice(4, 21)}</h2>
    <h2>Amount of tickets: ${booking.numberOfTickets}</h2>
    </div>
    `);
}
