document.addEventListener('DOMContentLoaded', () => {
  const loadBtn = document.getElementById('loadBtn');
  const output = document.getElementById('output');

  loadBtn.addEventListener('click', async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Not logged in!');
      window.location.href = '/login.html';
      return;
    }

    try {
      const res = await fetch('/api/admin/dashboard', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await res.json();
      output.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      console.error(err);
      output.textContent = 'Failed to load data';
    }
  });
});
