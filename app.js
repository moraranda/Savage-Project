// Se requiere del módulo express - framework node.js
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path');
const app = express();
const port = 2525;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: '2804', // Cambia esto por una cadena aleatoria y segura
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // Ajusta el tiempo de vida de la cookie según tus necesidades
}));

// Cuando reciba solicitud en la raíz '/' que responda con una página 
app.use(express.static('public'));
app.get('/', (req,res) => {
    res.sendFile('views/pages/index.html', { root: __dirname });});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Aplicación escuchará en el puerto 5050
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);});
  
/* ----------------------------------------------------------------- */

// Se requiere del módulo MySQL - database phpMyAdmin
const mysql = require('mysql');
const { serialize } = require('v8');

// Creamos una conexión contra la base de datos 'savage-project', creada previamente
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'savage-project'
});

// Controlamos si hay error en la conexión a la base de datos
con.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos.', err);
        return;}
    console.log('Conexión establecida correctamente.');
});

/* ----------------------------------------------------------------- */

// Ruta para hacer el sign
app.get('/sign-up', (req, res) => {
    res.sendFile(__dirname + '/views/pages/sign-up.html');
});

// Ruta para manejar la solicitud POST del sign up
app.post('/sign-up', async (req, res) => {
    const { name, surname, email, phone, country, address, city, zipcode } = req.body;

    // Inserta el nuevo usuario en la base de datos
    const query = 'INSERT INTO clientes (Nombre, Apellido, Email, Telefono, Pais, Direccion, Ciudad, CodigoPostal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    con.query(query, [name, surname, email, phone, country, address, city, zipcode], (err, results) => {
        if (err) {
            return res.status(500).send('Error in database insertion.');
        }
        res.redirect('/login');
    });
});


// Obtener el estado de las prendas
app.get('/prendas', (req, res) => {
    const querySelectPrendas = `SELECT p.PrendasID, p.nombre AS nombre_prenda, p.precio, e.talla, e.stock FROM prendas p INNER JOIN especificaciones e ON p.PrendasID = e.PrendaID ORDER BY p.PrendasID, e.talla;`;
    
    con.query(querySelectPrendas, (err, results) => {
        if (err) {
            console.log('Error al realizar la consulta:', err);
            return res.status(500).send('Error en el servidor');}

        // Agrupar resultados por prenda
        const prendas = results.reduce((acc, result) => {
            if (!acc[result.PrendasID]) {
                acc[result.PrendasID] = {
                    PrendasID: result.PrendasID,
                    nombre_prenda: result.nombre_prenda,
                    precio: result.precio,
                    tallas: {}
                };
            }
            acc[result.PrendasID].tallas[result.talla] = result.stock;
            return acc;
        }, {});

        res.json({ prendasStock: Object.values(prendas) });
    });
});


// Obtener el número de productos por categoría
app.get('/num-productos', (req, res) => {
    const query = 'SELECT c.CategoriaID, c.nombre AS Categoria, COALESCE(COUNT(p.PrendasID), 0) AS num_prendas FROM categorias c LEFT JOIN prendas p ON p.CategoriaID = c.CategoriaID GROUP BY c.CategoriaID, c.nombre;';

    con.query(query, (err, results) => {
        if (err) {
            console.log('Error al obtener el número de productos por categoría:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        const numProducts = {};
        results.forEach(row => {
            numProducts[row.CategoriaID] = row.num_prendas;
        });

        res.json(numProducts);
    });
});


// Ruta para hacer el login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/pages/login.html');
});
 
// Ruta para manejar la solicitud POST del login
app.post('/login', (req, res) => {
    const { email, phone } = req.body;
    const query = 'SELECT ClienteID, Nombre FROM clientes WHERE Email = ? AND Telefono = ?';

    con.query(query, [email, phone], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const userData = results[0];
        res.json({ success: true, nombre: userData.Nombre, clienteID: userData.ClienteID });
    });
});


// Ruta para hacer modificaciones en el usuario
app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/views/pages/profile.html');
});

app.get('/api/profile/:clienteID', (req, res) => {
    const clienteId = req.params.clienteID;
    const query = 'SELECT ClienteID, Nombre, Apellido, Email, Telefono, Pais, Direccion, Ciudad, CodigoPostal FROM clientes WHERE ClienteID = ?';
    
    con.query(query, [clienteId], (err, results) => {
        if (err) {
            console.error('Error retrieving user data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userData = results[0];
        res.json(userData);
    });
});

app.post('/update-profile', async (req, res) => {
    const { name, surname, email, phone, country, address, city, zipcode, clienteID } = req.body;
    const query = 'UPDATE clientes SET Nombre = ?, Apellido = ?, Email = ?, Telefono = ?, Pais = ?, Direccion = ?, Ciudad = ?, CodigoPostal = ? WHERE ClienteID = ?';
    
    con.query(query, [name, surname, email, phone, country, address, city, zipcode, clienteID], (err, results) => {
        if (err) {
            console.error('Error updating user data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.redirect('/');
    });
});


// Ruta para manejar el eliminado de un registro
app.post('/delete', (req, res) => {
    const { clienteID } = req.body;
    const query = 'DELETE FROM clientes WHERE ClienteID = ?';

    con.query(query, [clienteID], (err, results) => {
        if (err) {
            console.error('Error during removal:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(401).json({ success: false, message: 'Account not found' });
        }
        res.status(200).json({ success: true, message: 'Account deleted successfully' });
    });
});

// Ruta para mostrar información
app.get('/about-us', (req, res) => {
    res.sendFile(__dirname + '/views/pages/about-us.html');
});


// Ruta para manejar la consulta cuando se selecciona una talla
app.get('/talla/:tallaID/prenda/:prendaID', (req, res) => {
    const tallaID = req.params.tallaID;
    const prendaID = req.params.prendaID;
  
    const sql = `SELECT p.nombre AS nombre_prenda, FORMAT(p.Precio, 2) AS precio, e.talla AS talla,  p.CategoriaID as categoria FROM prendas p INNER JOIN especificaciones e ON p.PrendasID = e.PrendaID WHERE e.EspecificacionesID = ? AND e.PrendaID = ? AND e.stock > 0;`;
    con.query(sql, [tallaID, prendaID], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            const nombre = result[0].nombre_prenda;
            const precio = result[0].precio;
            const talla = result[0].talla;
            const categoria = result[0].categoria;

            // Aquí puedes añadir la información al carrito
            if (categoria === 1) {
                res.send(`Top ${nombre} | Price: ${precio}€<br>Size: ${talla}`);

            } else if (categoria === 2) {
                res.send(`Short ${nombre} | Price: ${precio}€<br>Size: ${talla}`);}

        } else {
            res.send('No se encontraron resultados');
        }
    });
});


// Ruta para realizar las compras
app.get('/checkout', (req, res) => {
    res.sendFile(__dirname + '/views/pages/checkout/checkout.html');
});


app.post('/checkout', (req, res) => {
    const { name, surname, email, phone, country, address, city, zipcode } = req.body;

    const checkIfExistsQuery = 'SELECT * FROM clientes WHERE Telefono = ?';
    const insertNewClientQuery = 'INSERT INTO clientes (Nombre, Apellido, Email, Telefono, Pais, Direccion, Ciudad, CodigoPostal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    // Primero, verificamos si el cliente ya existe en la base de datos
    con.query(checkIfExistsQuery, [phone], (err, results) => {
        if (err) {
            console.error('Error checking if client exists:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            con.query(insertNewClientQuery, [name, surname, email, phone, country, address, city, zipcode], (err, insertResult) => {
                if (err) {
                    console.error('Error inserting new client:', err);
                    return res.status(500).send('Internal Server Error');
                }
                // Establecer los datos en la sesión
                req.session.shipmentData = { email, address, zipcode, city, country };
                res.redirect('/shipment');
            });
        } else {
            // El cliente ya existe, también establecemos los datos en la sesión
            req.session.shipmentData = { email, address, zipcode, city, country };
            res.redirect('/shipment');
        }
    });
});

// Ruta para mostrar la página de envío
app.get('/shipment', (req, res) => {
    // Obtener los datos de la sesión
    const shipmentData = req.session.shipmentData;
    res.render('pages/checkout/shipment', { shipmentData });
});

app.get('/payment', (req, res) => {
    const email = req.query.email;
    const total = req.query.total;

    const querySearch = "SELECT ClienteID FROM clientes WHERE Email = ?";
    con.query(querySearch, email, (err, results) => {
        if (err) {
            console.error('Error during search:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const clienteID = results[0].ClienteID;

        const queryCreatePurchase = "INSERT INTO `pedidos`(`ClienteID`, `Total`) VALUES (?, ?);";
        con.query(queryCreatePurchase, [clienteID, total], (err, results) => {
            if (err) {
                console.error('Error during purchase creation:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // Redirigir al usuario a la página principal
            res.redirect('/');
        });
    });
});



/*    ADMINISTRADOR    */
// Registrar administrador
app.get('/register-admin', (req, res) => {
    res.sendFile(__dirname + '/views/pages/admin/form.html');
});

// Ruta para manejar la solicitud POST del sign up
app.post('/register-admin', async (req, res) => {
    const { email, pass, rol } = req.body;
    const hashedPass = md5(pass);

    // Inserta el nuevo usuario en la base de datos
    const query = 'INSERT INTO administradores (Email, Contrasena, Rol) VALUES (?, MD5(?), ?)';

    con.query(query, [email, hashedPass, rol], (err, results) => {
        if (err) {
            return res.status(500).send('Error in database insertion.');
        }

        const filePath = path.join(__dirname, '/views/pages/admin/admin.html');
        res.sendFile(filePath);
    });
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/views/pages/admin/admin.html');
});

app.post('/admin', (req, res) => {
    const { email, pass } = req.body;
    const searchPass = md5(pass);

    const query = 'SELECT Email, Contrasena FROM administradores WHERE Email = ? AND Contrasena = ?';

    con.query(query, [email, searchPass], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Establecer la sesión
        req.session.user = {
            email: results[0].Email,
            password: results[0].Contrasena
        };
        
        res.redirect('/admin/settings');
    });
});

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();

    } else {
        res.redirect('/admin');}}

app.get('/admin/settings', isAuthenticated, (req, res) => {
    const { email, password } = req.session.user;

    res.render('pages/admin/settings', { email, password });
});


app.get('/get-administrators', (req, res) => {
    const query = 'SELECT * FROM administradores';

    con.query(query, (err, results) => {
        if (err) {
            console.error('Error searching administrators', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Administrators not found' });
        }
        
        res.render('pages/admin/administrators', { administrators: results });
    });
});

app.get('/edit-administrator/:id', (req, res) => {
    const adminID = req.params.id;
    const sql = 'SELECT * FROM `administradores` WHERE AdministradorID = ?;';

    con.query(sql, adminID, (err, result) => {
        if (err) {
            console.error('Error al buscar el administrador:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        if (result.length === 0) {
            res.status(404).send('Administrador no encontrado');
            return;
        }

        // Renderizar la página EJS con los datos del administrador
        res.render('pages/admin/edit-administrator', { admin: result[0] });
    });
});

app.post('/edit-administrator/:id', isAuthenticated, (req, res) => {
    const adminID = req.params.id;
    const { email, password, rol } = req.body;
    const hashedPassword = password ? md5(password) : req.session.user.password;

    const sql = 'UPDATE administradores SET Email = ?, Contrasena = ?, Rol = ? WHERE AdministradorID = ?';

    con.query(sql, [email, hashedPassword, rol, adminID], (err, result) => {
        if (err) {
            console.error('Error updating administrator:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.redirect('/admin/settings');
    });
});

app.post('/delete-administrator/:id', (req, res) => {
    const adminID = req.params.id;
    const query = 'DELETE FROM administradores WHERE AdministradorID = ?';

    con.query(query, [adminID], (err, results) => {
        if (err) {
            console.error('Error during removal:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Administrator not found' });
        }
        res.status(200).json({ success: true, message: 'Administrator deleted successfully' });
    });
});


/*    CLIENTE    */
app.get('/get-customers', (req, res) => {
    const query = 'SELECT * FROM clientes';

    con.query(query, (err, results) => {
        if (err) {
            console.error('Error searching customers', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Customers not found' });
        }
        
        res.render('pages/admin/customers', { customers: results });
    });
});

app.get('/edit-customer/:id', (req, res) => {
    const clientID = req.params.id;
    const sql = 'SELECT * FROM clientes WHERE ClienteID = ?;';

    con.query(sql, clientID, (err, result) => {
        if (err) {
            console.error('Error searching for client:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.length === 0) {
            res.status(404).send('Customer not found');
            return;
        }

        res.render('pages/admin/edit-customer', { customer: result[0] });
    });
});

app.post('/edit-customer/:id', (req, res) => {
    const { name, surname, email, phone, country, address, city, zipcode, clienteID } = req.body;
    const query = 'UPDATE clientes SET Nombre = ?, Apellido = ?, Email = ?, Telefono = ?, Pais = ?, Direccion = ?, Ciudad = ?, CodigoPostal = ? WHERE ClienteID = ?';

    con.query(query, [name, surname, email, phone, country, address, city, zipcode, clienteID], (err, result) => {
        if (err) {
            console.error('Error updating customer:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.redirect('/admin/settings');
    });
});

app.post('/delete-client/:id', (req, res) => {
    const customerID = req.params.id;
    const query = 'DELETE FROM clientes WHERE ClienteID = ?';

    con.query(query, [customerID], (err, results) => {
        if (err) {
            console.error('Error during removal:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    });
});


/*    PEDIDO    */
app.get('/get-orders', (req, res) => {
    const query = 'SELECT * FROM pedidos';

    con.query(query, (err, results) => {
        if (err) {
            console.error('Error searching orders', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Orders not found' });
        }
        
        res.render('pages/admin/orders', { orders: results });
    });
});

app.get('/edit-order/:id', (req, res) => {
    const orderID = req.params.id;
    const sql = 'SELECT * FROM pedidos WHERE PedidoID = ?;';

    con.query(sql, orderID, (err, result) => {
        if (err) {
            console.error('Error searching for order:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.length === 0) {
            res.status(404).send('Order not found');
            return;
        }

        res.render('pages/admin/edit-order', { order: result[0] });
    });
});

app.post('/edit-order/:id', (req, res) => {
    const { status, pedidoID } = req.body;
    const query = 'UPDATE pedidos SET Estado = ? WHERE PedidoID = ?';

    con.query(query, [status, pedidoID], (err, result) => {
        if (err) {
            console.error('Error updating order:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.redirect('/admin/settings');
    });
});

app.post('/delete-order/:id', (req, res) => {
    const orderID = req.params.id;
    const query = 'DELETE FROM pedidos WHERE PedidoID = ?';

    con.query(query, [orderID], (err, results) => {
        if (err) {
            console.error('Error during removal:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    });
});
