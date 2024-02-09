export default async function home() {
  const response = await fetch("http://localhost:3000/api/event");
  const result = await response.json();
  let html = "";

  for (let data of result) {
    html += `
        <li>${data.name} - (${data.startDate} - ${data.endDate})</li>
      `;
  }

  return `
  <div id="main-container">
  <div id="calendar-container">
  <h1>EVENT CALENDAR</h1>
  <ul>${html}</ul>
  <button>Book now</button>
  </div>
  <img src="../assets/venue.jpg" alt="Our venue"></img>
  </div>
  `;
}
