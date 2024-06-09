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

/*  NEWSLETTER  */
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
});