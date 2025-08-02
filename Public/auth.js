document.addEventListener('DOMContentLoaded', function () {

const baseURL = 'https://upgraded-computing-machine-q76p97gxq56g3495w-5000.app.github.dev';

    // LOGIN FUNCTIONALITY
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch( baseURL + '/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('authToken', data.token);
                        localStorage.setItem('userRole', data.user.role || 'user');

                        // Redirect to dashboard based on role
                        const role = data.user.role === 'insurer' ? 'insurer' : 'user';
                        window.location.href = `../${role}/dashboard.html`;
                    } else {
                        alert(data.message || 'Login failed');
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('Server error. Please try again.');
                });
        });
    }

    // REGISTRATION FUNCTIONALITY
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const role = document.getElementById('role').value;

            if (!email || !password || !confirmPassword || !role) {
                alert('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            fetch( baseURL + '/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('authToken', data.token);
                        localStorage.setItem('userRole', data.user.role || 'user');

                        const redirectRole = data.user.role === 'insurer' ? 'insurer' : 'user';
                        window.location.href = `../${redirectRole}/dashboard.html`;
                    } else {
                        alert(data.message || 'Registration failed');
                    }
                })
                .catch(error => {
                    console.error('Registration error:', error);
                    alert('Something went wrong. Try again.');
                });
        });
    }

    // LOGOUT FUNCTIONALITY
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function () {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            window.location.href = '../index.html';
        });
    });

    // DASHBOARD ACCESS CONTROL
    const isDashboard = window.location.pathname.includes('dashboard.html');
    if (isDashboard) {
        const authToken = localStorage.getItem('authToken');
        const userRole = localStorage.getItem('userRole');

        if (!authToken) {
            window.location.href = '../auth/login.html';
        }

        const currentRole = window.location.pathname.includes('insurer/') ? 'insurer' : 'user';
        if (userRole !== currentRole) {
            window.location.href = `../${userRole}/dashboard.html`;
        }
    }
});

