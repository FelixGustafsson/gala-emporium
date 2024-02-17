export default async function bookingConfirmation(booking) {
  return `
        <h1>Thank you for your ${booking.user}</h1>
        <h2>${booking.event}</h2>
        <h2>Date: ${booking.date}</h2>
        <h2>Amount of tickets: ${booking.tickets}</h2>
    `;
}
