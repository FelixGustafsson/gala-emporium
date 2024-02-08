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
  <div>
  <ul>${html}</ul>
  </div>
  </div>
  `;
}
