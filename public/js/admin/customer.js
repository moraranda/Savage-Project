/*    CLIENTES    */
document.addEventListener('DOMContentLoaded', function() {
    const adminButton = document.getElementById('customer');

    // Agregar un event listener para escuchar el clic en el botón
    adminButton.addEventListener('click', function() {
        // Redirigir al usuario a la página de administradores
        window.location.href = '/get-customers';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('#edit-customer');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener el ID del cliente del registro correspondiente
            const customerID = this.closest('tr').querySelector('td:first-child').innerText;

            // Realizar la solicitud al servidor para editar el registro con el ID obtenido
            fetch(`/edit-customer/${customerID}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Aquí puedes manejar la respuesta del servidor, por ejemplo, redireccionar a la página de edición
                    window.location.href = `/edit-customer/${customerID}`;
                })
                .catch(error => console.error('Error:', error));
        });
    });
});

function confirmDelete(svgElement) {
    const customerID = svgElement.getAttribute('data-customer-id');
    const confirmDelete = confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
        fetch(`/delete-client/${customerID}`, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                alert('Customer deleted successfully');
                window.location.reload();
            } else {
                // Error al eliminar el administrador
                alert('Failed to delete customer');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An unexpected error occurred');
        });
    }
}