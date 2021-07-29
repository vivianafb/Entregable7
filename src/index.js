import express from 'express';
import fs from 'fs';

const puerto = 3000;

const app = express();

const server = app.listen(puerto, () =>
  console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR =>', err);
});

let visitas = 0;



const arrays = [
  {
    "id":"1",
    "titulo": "Anillos"
  },
  {
      "id":"2",
      "titulo": "Computadores"
  },
  {
      "id":3,
      "titulo": "Mouse"
  }
]

app.get('/items', (request, response) => {
  visitas++;
  const items = { items: [], cantidad: 0 };
    for (const a of arrays) {
      items.items.push(a.titulo);
    }
    items.cantidad = arrays.length;

  response.json({
    items,
  });
});

app.get('/item-random', (request, response) => {
  visitas++;
  const path = './src/productos.txt';
  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  let producto = JSON.parse(fs.readFileSync(path, 'utf-8'));
  let random = aleatorio(0,producto.length);
  
  response.json({
    producto: producto[random],
   });
  
});

app.get('/visitas', (request, response) => {
  visitas++;
  response.json({
    mensaje: `Visita numero ${visitas}`,
  });
});