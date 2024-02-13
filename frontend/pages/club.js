export default async function club(clubID) {
  const clubResponse = await fetch(`http://localhost:3000/api/club/${clubID}`);
  const club = await clubResponse.json();
  const eventResponse = await fetch('http://localhost:3000/api/event');
  const events = await eventResponse.json();

  let html = ``;

  for (let data of events) {
    if (data.club === club._id)
      html += `
            <li id="club-event-li">
                <div id="event-info">
                    <h2>${data.name} - ${data.startDate}</h2>
                    <p>${data.description}</p>
                    <button>Book ${data.name}</button>
                </div>
                <img src="${data.imageURL}" alt="${data.name} image"/>
            </li>
          `;
  }

  return `
    <div id="main-club-container">
        <div id="club-info-container">
            <h1>${club.name}</h1>
            <br/>
            <p>${club.description}</p>
            <img src="${club.imageURL}" alt="${club.name} image"/>
        </div>
        <div id="club-events-container">
            <ul>${html}</ul>
        </div>
    </div>
    `;
}
