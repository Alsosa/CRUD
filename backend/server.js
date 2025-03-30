import express from 'express';
import cors from 'cors';
import { Low, JSONFile } from 'lowdb';
import { randomUUID } from 'crypto'; // Importar para generar un ID único

// Inicializar la aplicación de Express
const app = express();
const port = 5000;

// Usar body-parser para analizar el cuerpo de las solicitudes POST
// app.use(bodyParser.json());

app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite manejar JSON en el cuerpo de las solicitudes


// Configuración de la base de datos (lowdb)
const db = new Low(new JSONFile('./db.json'));

// Inicializar la base de datos si no está definida
async function initializeDatabase() {
  await db.read();
  
  console.log('Contenido inicial de db.json:', db.data);

  // Si la base de datos no está definida, inicialízala con una colección 'users' vacía
  if (!db.data) {
    db.data = { users: [] };
  }

  // Verificar que 'users' sea un array
  if (!Array.isArray(db.data.users)) {
    db.data.users = [];
  }

  // Escribimos la base de datos si hubo cambios
  await db.write();
}

// // Ruta GET para obtener los usuarios
// app.get('/api/users', (req, res) => {
//   res.json(db.data.users);  // Enviar todos los usuarios como respuesta
// });

app.get('/api/users', async (req, res) => {
  await initializeDatabase(); // Asegura que la base de datos está cargada
  
  console.log('Datos de la base de datos:', db.data); // Para ver qué tiene db.data

  if (!db.data || !db.data.users) {
    return res.status(500).json({ message: 'Error: base de datos no inicializada correctamente' });
  }

  res.json(db.data.users);  // Enviar todos los usuarios como respuesta
});

// Ruta para el registro de usuarios
app.post('/api/register', async (req, res) => {
  const { name, email } = req.body;

  // Validar que los campos 'name' y 'email' estén presentes
  if (!name || !email) {
    return res.status(400).json({ message: 'Faltan campos requeridos: nombre y correo.' });
  }

  try {
    // Inicializar la base de datos y verificar que 'users' esté disponible
    await initializeDatabase();

    // Asegurarse de que 'users' esté inicializado como un array
    if (!Array.isArray(db.data.users)) {
      db.data.users = [];
    }

    // Agregar el nuevo usuario al arreglo 'users'
    db.data.users.push({id: randomUUID(), name, email });

    // Guardar los cambios en la base de datos
    await db.write();

    // Responder con un mensaje de éxito
    res.status(201).json({ message: 'Usuario creado con éxito', user: { name, email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
});

// Ruta DELETE para eliminar un registro
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  // Filtrar registros y eliminar el que coincida con el id
  const initialLength = db.data.users.length;
  db.data.users = db.data.users.filter(user => user.id !== id);

  // Verificar si se eliminó un registro
  if (db.data.users.length === initialLength) {
    return res.status(404).json({ message: 'Registro no encontrado' });
  }

  await db.write(); // Guardar los cambios en el archivo db.json
  res.status(200).json({ message: 'Registro eliminado correctamente' });
});

// Iniciar el servidor en el puerto 5000
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Ruta raíz para evitar "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente.'); // Respuesta simple
});