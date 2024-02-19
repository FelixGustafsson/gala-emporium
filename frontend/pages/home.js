export default async function home() {
  const response = await fetch("http://localhost:3000/api/event");
  const result = await response.json();
  let html = "";

  for (let data of result) {
    let date = `${data.startDate}`;
    let newDate = date.slice(4, 21);
    let endDate = `${data.endDate}`;
    let newEndDate = endDate.slice(16, 21);

    html += `
        <li>${data.name}: <br/> ${newDate}-${newEndDate}</li>
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
