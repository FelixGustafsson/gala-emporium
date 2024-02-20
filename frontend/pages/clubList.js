export default async function clubList() {
  const response = await fetch('http://localhost:3000/api/club');
  const result = await response.json();

  console.log(result);

  let html = '';

  for (let data of result) {
    const shortDescription = data.description.substring(0, 80);
    let urlName = data.name;
    urlName = urlName.toLowerCase().replaceAll(" ", "-");

    console.log(urlName)
    html += `
          <div class="club-info">
            <h1>${data.name}</h1>
            <p>${shortDescription}...</p>
            <img src="${data.imageURL}" alt="${data.name} picture"></img>
            <button type="button" onclick="window.location.href='http://localhost:3000/#${urlName}'">Read more</button>
          </div>
      `;
  }

  return `
    <div id="main-club-list-container">
        <h1>OUR CLUBS</h1>
        <br/>
        <div id="club-container">
        ${html}</div>
    </div>
    `;
}
