import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Low, JSONFile } from 'lowdb';

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
    db.data.users.push({ name, email });

    // Guardar los cambios en la base de datos
    await db.write();

    // Responder con un mensaje de éxito
    res.status(201).json({ message: 'Usuario creado con éxito', user: { name, email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
});

// Iniciar el servidor en el puerto 5000
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
