import bookEvent from './bookingForm.js';

function handleBookClick(id) {
  console.log('hej');
  bookEvent(id);
}

export default async function bookEvents() {
  const response = await fetch('http://localhost:3000/api/event');
  const result = await response.json();
  console.log(result);
  let html = '';
  result.sort();

  for (let data of result) {
    let date = `${data.startDate}`;
    let newDate = date.slice(4, 21);
    let endDate = `${data.endDate}`;
    let newEndDate = endDate.slice(16, 21);
    html += `
          <li id="event-li">
            <div>
              <h2>${data.name}</h2>
              <p>${data.description}</p>
              <p>${newDate}-${newEndDate}</p>
              <button onclick="handleBookClick('${data._id}')">Book now</button>
            </div>
            <img src="${data.imageURL}" alt="Event image"></img>
          </li>
        `;
  }

  return `
    <div id="main-container">
    <div id="calendar-container">
    <h1>EVENT CALENDAR</h1>
    <ul>${html}</ul>
    `;
}

window.handleBookClick = handleBookClick;
