export default async function clubList() {
  const response = await fetch('http://localhost:3000/api/clubs');
  const result = await response.json();

  console.log(result);

  return `
    <div id="main-club-list-container">
        <h1>OUR CLUBS</h1>
    </div>
    `;
}
