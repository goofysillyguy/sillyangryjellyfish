function timeSince(utcDateString) {
  const created = new Date(utcDateString + "Z");
  const now = new Date();
  const seconds = Math.floor((now - created) / 1000);
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  if (days > 0) return `${days} Day${days !== 1 ? 's' : ''} Ago`;
  if (hrs > 0) return `${hrs} Hour${hrs !== 1 ? 's' : ''} Ago`;
  if (mins > 0) return `${mins} Minute${mins !== 1 ? 's' : ''} Ago`;
  return `Just now`;
}

export async function initCommits() {
  const listEl = document.getElementById('commits-list');
  const loaderEl = document.getElementById('commits-loading');

  if (!listEl || !loaderEl) return;

  listEl.style.display = 'none';
  loaderEl.style.display = 'block';
  loaderEl.style.opacity = '1';

  
  try {
    const proxy = 'https://api.allorigins.win/raw?url=' +
      encodeURIComponent('https://commits.facepunch.com/?format=json');
    const res = await fetch(proxy);
    const data = await res.json();

    const rustCommits = data.results.filter(c => c.repo?.startsWith("rust_"));

    if (rustCommits.length === 0) {
      listEl.textContent = 'No Rust-related commits found.';
      loaderEl.style.display = 'none';
      return;
    }

    listEl.innerHTML = rustCommits.slice(0, 10).map(c => {
      const timeAgo = timeSince(c.created);
      const username = c.user?.name ?? "Unknown";
      const avatar = c.user?.avatar ?? "https://via.placeholder.com/48";
      const commitId = c.id ?? "???";
      const commitMessage = c.message ?? "(no message)";
      const commitLink = `https://commits.facepunch.com/${commitId}`;
      const repoName = c.repo ?? "unknown_repo";
      const branchName = c.branch ?? "unknown_branch";

      return `
        <li class="commit-entry">
          <div class="commit-inner">
            <div class="commit-top">
              <div class="commit-author-block">
                <img class="commit-avatar" src="${avatar}" alt="${username}" />
                <div class="commit-meta">
                  <span class="commit-author">${username}</span>
                  <span class="commit-time">${timeAgo}</span>
              </div>
          </div>
          <div class="commit-path">
            <span class="repo">${repoName}</span>
            ${branchName ? `/<span class="branch">${branchName}</span>` : ''}
            <a href="${commitLink}" target="_blank" class="commit-id">#${commitId}</a>
          </div>
        </div>
        <div class="commit-message">${commitMessage}</div>
      </div>
    </li>
  `;

    }).join('');

    setTimeout(() => {
      loaderEl.style.opacity = '0';
      setTimeout(() => {
        loaderEl.style.display = 'none';
        listEl.style.display = 'block';
      }, 500);
    }, 500); 


  } catch (err) {
    console.error("Failed to load commits:", err);
    loaderEl.style.display = 'none';
    listEl.style.display = 'block';
    listEl.textContent = 'Could not load commits.';
  }
}
