export default async function profile() {
  const userResponse = await fetch('/api/login');
  const user = await userResponse.json();
  const profileUserResponse = await fetch(`/api/user/${user.login}`);
  const profileUser = await profileUserResponse.json();

  let html = '';

  if (profileUser.isClubOwner) {
    html += `
    <div>Club Owner (tbc)</div>
    `;
    return `
    <div id="main-profile-container">
        <h1>Welcome ${profileUser.name}</h1>
        <br/>
        <h2>Create a new event:</h2>
        <form id="event-form" onsubmit="createNewEvent('${profileUser.club}'); return false">
          <label>Name<input name="event-name" placeholder="Enter event name" required/></label>
      
          <label>Start date/time<input type="datetime-local" name="start-date" required/></label>
          
          <label>End date/time<input type="datetime-local" name="end-date" required/></label>
          
          <label>Description<input type="text" name="description" required/></label>

          <label>Image URL<input type="text" name="imageURL" required/></label>
          
          <label>Price per ticket<input type="number" name="price" required/></label>
          
          <input type="submit" value="Create event"/>
        </form>
        <br>
        <p id="registration-text"></p>
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
