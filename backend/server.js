import express from 'express';
import cors from 'cors';
import { Low, JSONFile } from 'lowdb'; // Importamos LowDB
import recordsRoutes from './routes/records.js'; // Importamos las rutas de registros

// Crear una instancia de Express
const app = express();
app.use(express.json());  // Para manejar el cuerpo de las solicitudes en formato JSON
app.use(cors());  // Habilitamos CORS para solicitudes de diferentes orígenes

// Configuración de la base de datos con Lowdb
const adapter = new JSONFile('backend/db.json');
const db = new Low(adapter);

// Leer los datos de la base de datos
async function initDb() {
  await db.read();
  db.data ||= { records: [] };  // Si no existen registros, inicializamos un array vacío
  await db.write();
}

// Llamamos a la función para inicializar la base de datos
initDb();

// Usar las rutas para manejar los registros
app.use('/api/records', recordsRoutes);  // Conectamos las rutas de registros al servidor

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => console.log('Servidor en el puerto 5000'));

// Exportar la app para otros módulos, si es necesario
export default app;
