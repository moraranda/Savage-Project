/*  NAVBAR  */
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-modal');
    
    // Mostrar modal
    function showModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';}
    
    // Cerrar modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';}
    
    // Evento al hacer clic en el enlace "STORES"
    const storesLink = document.getElementById('stores-link');
    storesLink.addEventListener('click', function(event) {
        event.preventDefault();
        showModal();});

    // Evento al hacer clic en el enlace "SEARCH"
    const searchLink = document.getElementById('search-link');
    searchLink.addEventListener('click', function(event) {
        event.preventDefault();
        showModal();});
    
    // Evento al hacer clic en el botón de cerrar modal
    closeModalButton.addEventListener('click', closeModal);});


document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-country');
    const closeModalButton = document.getElementById('close-modal-country');

    // Mostrar modal
    function showModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';}
    
    // Cerrar modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';}

    // Evento al hacer clic en el enlace "COUNTRY"
    const storesLink = document.getElementById('country-link');
    storesLink.addEventListener('click', function(event) {
        event.preventDefault();
        showModal();});

    // Evento al hacer clic en el botón de cerrar modal
    closeModalButton.addEventListener('click', closeModal);});
    


/*  BANNER  */
const tiempoDeEspera = 10000;

function alternarMensajes() {
    const mensaje1 = document.getElementById("msg-1");
    const mensaje2 = document.getElementById("msg-2");

    if (mensaje1.style.display === "none") {
        mensaje1.style.display = "block";
        mensaje2.style.display = "none";

    } else {
        mensaje1.style.display = "none";
        mensaje2.style.display = "block";}}

setInterval(alternarMensajes, tiempoDeEspera);


/*  FIRST SECTION  */
function showDetails(section) {
    const details = section.querySelector('.details');
    const hoverDetails = section.querySelector('.hover-details');
    
    details.style.display = 'none';
    hoverDetails.style.display = 'flex';}
    
function hideDetails(section) {
    const details = section.querySelector('.details');
    const hoverDetails = section.querySelector('.hover-details');
    
    details.style.display = 'block';
    hoverDetails.style.display = 'none';}

    
/*  USER  */
document.addEventListener('DOMContentLoaded', function() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
        showWelcomeMessage(nombreUsuario);
        updateDropdownMenu(true);
    } else {
        updateDropdownMenu(false);
    }

    function showWelcomeMessage(nombre) {
        const userNavItem = document.getElementById('user');
        userNavItem.innerHTML = `WELCOME, ${nombre}`;
    }

    function updateDropdownMenu(isLoggedIn) {
        const dropdownMenu = document.querySelector('#dynamic-dropdown');
        const userNavItem = document.getElementById('user');

        if (isLoggedIn) {
            dropdownMenu.innerHTML = `
                <li><a class="dropdown-item" href="/profile">PROFILE</a></li>
                <li><a class="dropdown-item" id="logout" href="#">LOG OUT</a></li>
            `;
            document.getElementById('logout').addEventListener('click', function() {
                localStorage.removeItem('nombreUsuario');
                window.location.href = '/'; // Redireccionar a la página principal
            });
        } else {
            userNavItem.innerHTML = `
                <svg class="blue-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill:#072C70;">
                    <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                </svg>
            `;
            dropdownMenu.innerHTML = `
                <li><a class="dropdown-item" id="setting-sign" href="/sign-up">SIGN UP</a></li>
                <li><a class="dropdown-item" id="setting-login" href="/login">LOGIN</a></li>
            `;
        }
    }
});


/*  CART  */
function addToCart(tallaID, prendaID) {
    fetch(`/talla/${tallaID}/prenda/${prendaID}`)
        .then(response => response.text())
        .then(data => {
            const itemName = data; // Guardamos el nombre del elemento
            
            cartItems[itemName] = (cartItems[itemName] || 0) + 1; // Incrementamos la cantidad del elemento o establecemos en 1 si es la primera vez
            
            updateCartUI(); // Actualizamos la interfaz del carrito
            updateCartCounter(); // Actualizamos el contador del carrito

            alert(`An item has been added to the cart.`);
            
            // Actualizamos el localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        })
        .catch(error => console.error('Error:', error));
}

function updateCartUI() {
    const cartContent = document.getElementById('info-cart');
    cartContent.innerHTML = ''; // Limpiamos el contenido actual del carrito

    // Iteramos sobre los elementos del carrito y los mostramos en la interfaz de usuario
    Object.entries(cartItems).forEach(([itemName, quantity]) => {
        const newItem = document.createElement('li');
        newItem.classList.add('cart-item'); // Agregamos una clase para estilizar los elementos del carrito
        newItem.innerHTML = `
            <span class="item-text">${itemName} (x${quantity})</span>
            <svg class="increment" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style="fill: #072C70; margin-bottom: 5px; cursor: pointer;">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
            <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style="fill: #072C70; margin-bottom: 5px; cursor: pointer;">
                <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
            </svg><br><br>`;

        // Agregamos los eventos de clic para incrementar y eliminar el elemento
        newItem.querySelector('.increment').addEventListener('click', () => {
            cartItems[itemName]++;
            updateCartUI();
            updateCartCounter();
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        });
        newItem.querySelector('.delete').addEventListener('click', () => {
            cartItems[itemName]--;
            if (cartItems[itemName] <= 0) delete cartItems[itemName];
            updateCartUI();
            updateCartCounter();
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        });

        cartContent.appendChild(newItem); // Añadimos el nuevo elemento al carrito
    });

    // Mostramos u ocultamos el mensaje por defecto según el total de elementos
    const cartDefaultContent = document.getElementById('default-cart-message');
    const checkoutButton = document.getElementById('checkoutButton');
    const infoMessage = document.getElementById('info-message');
    cartDefaultContent.style.display = Object.keys(cartItems).length === 0 ? 'block' : 'none';
    checkoutButton.style.display = Object.keys(cartItems).length === 0 ? 'none' : 'block';
    infoMessage.style.display = Object.keys(cartItems).length === 0 ? 'none' : 'block';
    cartContent.style.display = Object.keys(cartItems).length === 0 ? 'none' : 'block';
}


function updateCartCounter() {
    const totalItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);
    document.getElementById('cart').textContent = `CART (${totalItems})`;
}

window.addEventListener('DOMContentLoaded', () => {
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || {}; // Inicializamos cartItems desde localStorage o un objeto vacío si no hay datos
    updateCartUI(); // Actualizamos la interfaz del carrito al cargar la página
    updateCartCounter(); // Actualizamos el contador del carrito al cargar la página
});


/*  NEWSLETTER  
document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    
    fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        alert('Subscription successful! Please check your email.');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});*/