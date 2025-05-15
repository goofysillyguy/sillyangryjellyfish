export async function initCommits() {
  const el = document.getElementById('commits-list');
  if (!el) return;
  el.textContent = 'Loading…';

  try {
    const proxy = 'https://api.allorigins.win/raw?url=' +
      encodeURIComponent('https://commits.facepunch.com/?format=json');
    const res = await fetch(proxy);
    const data = await res.json();
    el.innerHTML = data.results
      .slice(0,10)
      .map(c =>
        `<li><strong>${c.message}</strong><br>
         by ${c.user.name} @ ${c.created}</li>`
      ).join('');
  } catch {
    el.textContent = 'Could not load commits.';
  }
}
