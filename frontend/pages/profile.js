export default async function profile() {
  const userResponse = await fetch('/api/login');
  const user = await userResponse.json();
  const profileUserResponse = await fetch(`/api/user/${user.login}`);
  const profileUser = await profileUserResponse.json();

  let html = '';

  if (profileUser.isClubOwner) {
    const eventsResponse = await fetch('/api/event');
    const events = await eventsResponse.json();

    for (let data of events) {
      if (data.club === profileUser.club) {
        //add delete method for the event both in backend and onCick at the button
        html += `
        <li>
          <h2>${data.name}</h2>
          <p>${data.description}</p>
          <img src="${data.imageURL}"/>
          <button onclick="deleteEvent('${data._id}')">Delete event</button>
        </li>
      `;
      }
    }
    return `
    <div id="main-profile-container">
      <div>
        <h1>Welcome ${profileUser.name}</h1>
        <br/>
        <h2>Create a new event:</h2>
        <form id="event-form" onsubmit="createNewEvent('${profileUser.club}'); return false">
          <label>Name<input name="event-name" placeholder="Enter event name" required/></label>
      
          <label>Start date/time<input type="datetime-local" name="start-date" required/></label>
          
          <label>End date/time<input type="datetime-local" name="end-date" required/></label>
          
          <label>Description<input id="description-input" type="text" name="description" required/></label>

          <label>Image URL<input type="text" name="imageURL" required/></label>
          
          <label>Price per ticket<input type="number" name="price" required/></label>
          
          <input type="submit" value="Create event"/>
        </form>
        <br>
        <p id="registration-text"></p>

        <div id="color-theme-form-container">
          <form onsubmit="updateColorTheme('${profileUser.club}'); return false" id="color-theme-form">
          <h3>Choose you clubs color theme:</h3>
          
          <label>Red</label>
          <input type="radio" value="1" name="colorTheme" id="themeRed"/>
          <label>Green</label>
          <input type="radio" value="2" name="colorTheme" id="themeGreen"/>
          <label>Blue</label>
          <input type="radio" value="3" name="colorTheme" id="themeBlue"/>
          <input type="submit" value="Choose"/>
          
          </form>
        </div>
      </div>

      <div id="profile-club-events-container">
        <h1>Your events:</h1>
        <ul>${html}</ul>
      </div>
    </div>
        `;
  } else {
    for (let data of profileUser.bookedEvents) {
      const eventResponse = await fetch(`/api/event/${data.event[0]}`);
      const event = await eventResponse.json();

      html += `
        <li>
            <h3>${event.name} - ${data.numberOfTickets} Tickets</h3>
            <button onclick="cancelBooking('${data._id}')">Cancel booking</button>
        </li>
    `;
    }
    return `
    <div id="main-profile-container">
        <h1>Welcome ${profileUser.name}</h1>
        <br/>
        <br/>
        <br/>
        <h2>Your bookings:</h2>
        <br/>
        <ul>${html}</ul>
    </div>
  `;
  }
}

async function cancelBooking(id) {
  let response = await fetch(`/api/booking/${id}`, {
    method: 'delete',
  });
  let result = response.json();
  console.log(result);
  location.reload();
}

async function deleteEvent(id) {
  let response = await fetch(`/api/event/${id}`, {
    method: 'delete',
  });
  location.reload();
}

async function updateColorTheme(id) {
  const theme = $('[name=colorTheme]:checked').val();

  console.log(theme)
  let response = await fetch(`/api/club/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ colorTheme: theme })
  })

  console.log(response)
}

async function createNewEvent(clubID) {
  let newEvent = {
    name: $('[name=event-name]').val(),
    description: $('[name=description]').val(),
    imageURL: $('[name=imageURL]').val(),
    pricePerTicket: $('[name=price]').val(),
    startDate: $('[name=start-date]').val(),
    endDate: $('[name=end-date]').val(),
    tickets: 500,
    club: clubID,
  };
  let response = await fetch('/api/event', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEvent),
  });
  console.log(response);
  $('#event-form')[0].reset();
  if (response.status == 200) {
    $('#registration-text').text('New event created!');
  } else {
    $('#registration-text').text('Oops, something went wrong.');
  }
}

window.cancelBooking = cancelBooking;
window.createNewEvent = createNewEvent;
window.deleteEvent = deleteEvent;
window.updateColorTheme = updateColorTheme;