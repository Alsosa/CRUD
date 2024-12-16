import { Low, JSONFile } from 'lowdb';

// Crear una instancia de la base de datos
const adapter = new JSONFile('backend/db.json');
const db = new Low(adapter);

// Leer los datos de la base de datos
async function readData() {
  await db.read();
  db.data ||= { records: [] }; // Si no existe 'records', inicializamos
  return db.data.records;
}

// Obtener todos los registros
export async function getRecords(req, res) {
  const records = await readData();
  res.json(records);
}

// Crear un nuevo registro
export async function createRecord(req, res) {
  const newRecord = req.body;
  const records = await readData();
  records.push(newRecord);
  await db.write();
  res.status(201).json(newRecord);
}

// Actualizar un registro
export async function updateRecord(req, res) {
  const { id } = req.params;
  const updatedRecord = req.body;
  const records = await readData();
  const recordIndex = records.findIndex(record => record.id === id);

  if (recordIndex === -1) {
    return res.status(404).json({ message: 'Registro no encontrado' });
  }

  records[recordIndex] = { ...records[recordIndex], ...updatedRecord };
  await db.write();
  res.json(records[recordIndex]);
}

// Eliminar un registro
export async function deleteRecord(req, res) {
  const { id } = req.params;
  const records = await readData();
  const recordIndex = records.findIndex(record => record.id === id);

  if (recordIndex === -1) {
    return res.status(404).json({ message: 'Registro no encontrado' });
  }

  records.splice(recordIndex, 1);
  await db.write();
  res.status(204).end(); // No content
}