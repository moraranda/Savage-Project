/*    ADMINISTRADOR    */
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al botón "Administrators"
    const adminButton = document.getElementById('admin');

    // Agregar un event listener para escuchar el clic en el botón
    adminButton.addEventListener('click', function() {
        // Redirigir al usuario a la página de administradores
        window.location.href = '/get-administrators';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('#edit');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener el ID del administrador del registro correspondiente
            const adminID = this.closest('tr').querySelector('td:first-child').innerText;

            // Realizar la solicitud al servidor para editar el registro con el ID obtenido
            fetch(`/edit-administrator/${adminID}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Aquí puedes manejar la respuesta del servidor, por ejemplo, redireccionar a la página de edición
                    window.location.href = `/edit-administrator/${adminID}`;
                })
                .catch(error => console.error('Error:', error));
        });
    });
});

function confirmDelete(svgElement) {
    const adminID = svgElement.getAttribute('data-admin-id');
    const confirmDelete = confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
        fetch(`/delete-administrator/${adminID}`, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                alert('Administrator deleted successfully');
                window.location.reload();
            } else {
                // Error al eliminar el administrador
                alert('Failed to delete administrator');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An unexpected error occurred');
        });
    }
}