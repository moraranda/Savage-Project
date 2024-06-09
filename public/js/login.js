document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, phone })
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('nombreUsuario', result.nombre);
                localStorage.setItem('clienteID', result.clienteID);
                window.location.href = '/'; // Redireccionar a la página principal
            } else {
                alert('Invalid credentials');
            }
        });
    }
});