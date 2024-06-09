document.addEventListener('DOMContentLoaded', async function() {
    const clienteID = localStorage.getItem('clienteID');
    if (clienteID) {
        const userData = await getUserData(clienteID);
        fillForm(userData);
    } else {
        window.location.href = '/login';
    }
});

async function getUserData(clienteID) {
    try {
        const response = await fetch(`/api/profile/${clienteID}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function fillForm(userData) {
    document.getElementById('clienteID').value = userData.ClienteID;
    document.getElementById('name').value = userData.Nombre;
    document.getElementById('surname').value = userData.Apellido;
    document.getElementById('email').value = userData.Email;
    document.getElementById('phone').value = userData.Telefono;
    document.getElementById('country').value = userData.Pais;
    document.getElementById('address').value = userData.Direccion;
    document.getElementById('city').value = userData.Ciudad;
    document.getElementById('zipcode').value = userData.CodigoPostal;
}

const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(profileForm);
    const userData = Object.fromEntries(formData.entries());
    await saveChanges(userData);
});

async function saveChanges(userData) {
    try {
        const response = await fetch('/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Server response:', result); // Para depuración
            if (result.success) {
                // Actualiza el nombre de usuario en localStorage si el cambio se realizó con éxito
                localStorage.setItem('nombreUsuario', userData.name);
                alert('Changes saved successfully!');
                window.location.href = '/';
            } else {
                alert('Failed to save changes.');
            }
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Failed to save changes.');
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Failed to save changes.');
    }
}