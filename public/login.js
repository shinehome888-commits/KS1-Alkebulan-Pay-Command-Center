document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const errorDiv = document.getElementById('error');

  // Pre-fill credentials
  emailInput.value = "shine@ks1egf.org";
  passwordInput.value = "ks1_command_2026";

  loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        window.location.href = '/dashboard.html';
      } else {
        errorDiv.textContent = data.message || 'Login failed';
      }
    } catch (err) {
      errorDiv.textContent = 'Network error – check console';
      console.error(err);
    }
  });
});
