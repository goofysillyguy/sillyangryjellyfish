const searchInput = document.getElementById('server-search-input');
const searchButton = document.getElementById('search-server-button');
const resultsContainer = document.getElementById('search-results');
const detailsContainer = document.getElementById('server-details');

async function searchServers() {
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
}

searchButton.addEventListener('click', searchServers);

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchServers();
  }
});

function showServerInfo(server) {
  const attr = server.attributes;
  const details = attr.details || {};
  const serverName = attr.name;

  const wipeRaw = details.rust_last_wipe;
  const wipeDate = wipeRaw ? new Date(wipeRaw) : null;
  const formattedWipe = wipeDate ? wipeDate.toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'EST'
  }) + ' EST' : 'Unknown';

  const detailsContainer = document.getElementById('server-details');
  detailsContainer.innerHTML = `
    <h3>${attr.name}</h3>
    <p><strong>Player Count:</strong> ${attr.players}/${attr.maxPlayers}</p>
    <p><strong>Address:</strong> ${attr.ip}:${attr.port}</p>
    <p><strong>Status:</strong> ${attr.status}</p>
    <p><strong>Last Wipe:</strong> ${formattedWipe}</p>
  `;
}

