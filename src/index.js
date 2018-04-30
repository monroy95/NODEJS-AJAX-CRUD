const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// db
const products = [];

// Configuraciones
// Esto permite evitar conflictos con otros puestos, si no hay conflicto usar el port:3000
app.set('port', process.env.PORT || 3000)

// middlewares: procesa lo que recibimos en las rutas antes de que lleguen
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Rutas
app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const {
        name
    } = req.body;
    products.push({
        id: products.length + 1,
        name
    });
    res.json('success')
});

// Actualizar
app.put('/products/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        name
    } = req.body;

    products.forEach((product, i) => {
        if (product.id == id) {
            product.name = name;
        }
    });

    res.json('Actualizado con exito');
});

app.delete('/products/:id', (req, res) => {
    const {
        id
    } = req.params;
    products.forEach((product, i) => {
        if (product.id == id) {
            products.splice(i, 1);
        }
    });

    res.json('Elimanación Exitosa')
});

// Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`servidor en el puerto ${app.get('port')}`);
});