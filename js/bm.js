const searchInput = document.getElementById('server-search-input');
const searchButton = document.getElementById('search-server-button');
const resultsContainer = document.getElementById('search-results');
const detailsContainer = document.getElementById('server-details');

searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  resultsContainer.innerHTML = 'Searching...';

  try {
    const response = await fetch(`https://api.battlemetrics.com/servers?filter[search]=${encodeURIComponent(query)}&filter[game]=rust`);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      resultsContainer.innerHTML = 'No servers found.';
      return;
    }

    resultsContainer.innerHTML = '<h3>Results:</h3>';
    data.data.forEach(server => {
      const btn = document.createElement('button');
      btn.textContent = server.attributes.name;
      btn.className = 'server-button';
      btn.addEventListener('click', () => showServerInfo(server));
      resultsContainer.appendChild(btn);
    });

  } catch (err) {
    resultsContainer.innerHTML = 'Error searching for servers.';
    console.error(err);
  }
});

function showServerInfo(server) {
  const attr = server.attributes;
  detailsContainer.innerHTML = `
    <h3>${attr.name}</h3>
    <p><strong>Player Count:</strong> ${attr.players}/${attr.maxPlayers}</p>
    <p><strong>Address:</strong> ${attr.ip}:${attr.port}</p>
    <p><strong>Status:</strong> ${attr.status}</p>
    <p><strong>Last Wipe:</strong> ${attr.details.rust_last_wipe || 'Unknown'}</p>
  `;
}
