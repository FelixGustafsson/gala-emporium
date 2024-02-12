export default async function bookEvents() {
    const response = await fetch("http://localhost:3000/api/event");
    const result = await response.json();
    let html = "";

    for (let data of result) {
        html += `
        <div id="event-container">
          <li>
            <h1>${data.name}</h1>
            <p>${data.description}</p>
            <button>Book ${data.name}</button>
            <img src="../assets/venue.jpg" alt="Our venue"></img>
        
          </li>
        </div>
        `;
        }

    return `
    <div id="main-container">
    <div id="events-container">
    <h1>Book Events</h1>
    <ul>${html}</ul>
    </div>
  </div>
    `;
}
