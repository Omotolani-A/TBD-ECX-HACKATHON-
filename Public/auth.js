document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulate authentication
            if (email && password) {
                // In a real app, this would be an API call
                localStorage.setItem('authToken', 'simulated-token');
                localStorage.setItem('userRole', email.includes('insurer') ? 'insurer' : 'user');
                
                // Redirect based on user role
                const role = email.includes('insurer') ? 'insurer' : 'user';
                window.location.href = `../${role}/dashboard.html`;
            } else {
                alert('Please enter both email and password');
            }
        });
    }
    
    // Logout functionality
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            window.location.href = '../index.html';
        });
    });
    
    // Check authentication on dashboard pages
    const isDashboard = window.location.pathname.includes('dashboard.html');
    if (isDashboard) {
        const authToken = localStorage.getItem('authToken');
        const userRole = localStorage.getItem('userRole');
        
        if (!authToken) {
            window.location.href = '../auth/login.html';
        }
        
        // Verify user is on the correct dashboard
        const currentRole = window.location.pathname.includes('insurer/') ? 'insurer' : 'user';
        if (userRole !== currentRole) {
            window.location.href = `../${userRole}/dashboard.html`;
        }
    }
});