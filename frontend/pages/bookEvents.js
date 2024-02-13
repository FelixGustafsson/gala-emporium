export default async function bookEvents() {
  const response = await fetch("http://localhost:3000/api/event");
  const result = await response.json();
  let html = "";

  for (let data of result) {
    html += ` 
          <li id="event-li">
            <div>
              <h2>${data.name}</h2>
              <p>${data.description}</p>
              <button>Book ${data.name}</button>
            </div>
            <img src="${data.imageURL}" alt="Event image"></img>
          </li>
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
