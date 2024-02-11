export default async function clubList() {
  const response = await fetch('http://localhost:3000/api/clubs');
  const result = await response.json();

  console.log(result);

  let html = '';

  for (let data of result) {
    html += `
        <div id="club-container">
          <div>
            <h1>${data.name}</h1>
            <br/>
            <p>${data.description}</p>
            <br/>
            <button>Read more</button>
          </div>
          <img src="${data.imageURL}" alt="${data.name} picture"></img>
        </div>
      `;
  }

  return `
    <div id="main-club-list-container">
        <h1>OUR CLUBS</h1>
        <br/>
        <div>${html}</div>
    </div>
    `;
}
