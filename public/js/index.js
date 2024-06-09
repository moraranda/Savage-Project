// Función para tachar las prendas sin stock
function updateDetailsAndPrices(data) {
    // Itera sobre cada sección en tu HTML
    document.querySelectorAll('.section, .section-bottoms').forEach(section => {
        const id = section.querySelector('img').id;
        const prenda = data.find(item => item.PrendasID == id);
        if (!prenda) return;

        // Formatea el precio a dos decimales
        const formattedPrice = prenda.precio.toFixed(2);

        // Actualiza el nombre de la prenda y el precio
        const detailsElement = section.querySelector('.details');
        detailsElement.innerHTML = `<strong>${prenda.nombre_prenda}</strong><br>${formattedPrice}€`;

        // Actualiza las tallas y marca las que no tienen stock
        const hoverDetailsElement = section.querySelector('.hover-details');
        const sizeOptions = hoverDetailsElement.querySelectorAll('.size-options');
        sizeOptions.forEach(sizeOption => {
            const talla = sizeOption.textContent.trim();
            const stock = prenda.tallas[talla];
            if (stock === 0) {
                sizeOption.style.pointerEvents = 'none';
                sizeOption.style.textDecoration = 'line-through';

            } else {
                sizeOption.style.textDecoration = 'none';}});});}

// Función para obtener el stock de las prendas
fetch('/prendas')
    .then(response => response.json())
    .then(data => {
        updateDetailsAndPrices(data.prendasStock);
    })
    .catch(error => console.error('Error al obtener los datos de las prendas:', error));


    function actualizarProductos() {
        fetch('/num-productos')
        .then(response => response.json())
        .then(data => {
            const boxes = document.querySelectorAll('.text');
            boxes.forEach(box => {
                const categoryId = box.id;
                if (data[categoryId] !== undefined) {
                    const numProducts = data[categoryId] === 0 ? 0 : data[categoryId];
                    box.innerHTML = `${box.innerHTML.replace('(num products)', `<br>(${numProducts} products)`)}`;
                } else {
                    box.innerHTML = `${box.innerHTML.replace('(num products)', `<br>(0 products)`)}`;
                }
            });
        })
        .catch(error => console.error('Error al obtener datos del servidor:', error));
    }
    

fetch('/num-productos')
    .then(response => response.json())
    .then(data => {
        actualizarProductos(data.numProducts);
    })
    .catch(error => console.error('Error al obtener los datos de las prendas', error));