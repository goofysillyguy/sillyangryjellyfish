export function initWipe() {
  function computeNextWipe() {
    const now = new Date();
    const firstThu = d => {
      const dt = new Date(d.getFullYear(), d.getMonth(), 1, 14, 0, 0);
      while (dt.getDay() !== 4) dt.setDate(dt.getDate() + 1);
      return dt;
    };
    const wipe = firstThu(now) > now
      ? firstThu(now)
      : firstThu(new Date(now.getFullYear(), now.getMonth() + 1, 1));
    const diff = wipe - now;
    const days = Math.floor(diff / 86400000),
          hrs  = Math.floor((diff % 86400000) / 3600000),
          mins = Math.floor((diff % 3600000) / 60000),
          secs = Math.floor((diff % 60000) / 1000);

    // get the elements once
    const dateEl = document.getElementById('wipe-date');
    const timerEl = document.getElementById('wipe-timer');

    // only assign if they exist
    if (dateEl)  dateEl.textContent  = wipe.toLocaleString();
    if (timerEl) timerEl.textContent = `${days}d ${hrs}h ${mins}m ${secs}s`;
  }

  // run immediately and every second
  computeNextWipe();
  setInterval(computeNextWipe, 1000);
}
