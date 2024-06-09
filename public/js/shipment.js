// Función para mostrar los elementos almacenados en localStorage en el checkout
function displayItemsInCheckout() {
    const cartContent = document.getElementById('cart-content');
    let totalPrice = 0; // Variable para almacenar el total de precios

    // Limpiamos el contenido actual del carrito
    cartContent.innerHTML = '';

    // Recuperamos los elementos del localStorage
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || {};

    // Iteramos sobre los elementos y los mostramos en la interfaz de usuario
    Object.entries(storedItems).forEach(([itemName, quantity]) => {
        const newItem = document.createElement('div');
        newItem.classList.add('cart-item'); // Agregamos una clase para estilizar los elementos del carrito
        
        // Obtenemos el precio del producto
        const productPrice = parseFloat(itemName.split(' | Price: ')[1].slice(0, -1));
        
        // Multiplicamos el precio por la cantidad si la cantidad es mayor que 1
        const itemTotalPrice = quantity > 1 ? productPrice * quantity : productPrice;
        totalPrice += itemTotalPrice; // Agregamos el precio al total

        newItem.innerHTML = `
            <span class="item-text">${itemName} (x${quantity})</span>`;

        cartContent.appendChild(newItem); // Añadimos el nuevo elemento al carrito
    });


    // Mostramos el subtotal en la interfaz de usuario
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    subtotalElement.textContent = totalPrice.toFixed(2) + '€';
    totalElement.textContent = totalPrice.toFixed(2) + '€';
}

// Llamamos a la función para mostrar los elementos en el evento DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    displayItemsInCheckout();

    // Agregar el listener al formulario checkoutForm
    document.getElementById('checkoutForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente
        
        // Obtén los datos del formulario
        const formData = new FormData(this);

        // Realiza una solicitud POST al endpoint /checkout
        fetch('/checkout', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Maneja el resultado aquí, por ejemplo, muestra una alerta o actualiza la página
            alert(data);
            // Opcional: Actualiza la página después de enviar el formulario
            window.location.href = '/shipment'; // Redirige a la página de pago
        })
        .catch(error => console.error('Error:', error));
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('paymentButton').addEventListener('click', function() {
        const email = document.getElementById('emailID').textContent.trim();
        const total = document.getElementById('total').textContent.trim();
        window.location.href = `/payment?email=${email}&total=${total}`;
    });
});

function clearCartAndRedirect() {
    fetch('/payment') // Realizamos una solicitud GET a la ruta /payment
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(() => {
            // Redirigir al usuario a la página principal
            window.location.href = '/';
            
            // Limpiamos el carrito después de que se haya completado el pago
            clearCart();
        })
        .catch(error => console.error('Error:', error));
}

function clearCart() {
    // Obtener el elemento del carrito
    const cartContent = document.getElementById('cart-content');
    // Limpiar el contenido del carrito
    cartContent.innerHTML = '';
    // Eliminar el contenido del localStorage
    localStorage.removeItem('cartItems');
}