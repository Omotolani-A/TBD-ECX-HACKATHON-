// public/login.js

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // prevent page reload

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById('loginMessage').textContent = 'Login successful!';
      // Redirect to dashboard or other page
      window.location.href = '/dashboard.html'; // if you have a dashboard page
    } else {
      document.getElementById('loginMessage').textContent = data.message || 'Login failed';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('loginMessage').textContent = 'Server error';
  }
});
