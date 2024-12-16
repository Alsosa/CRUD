import express from 'express';
import { getRecords, createRecord, updateRecord, deleteRecord } from '../controllers/recordsController.js';

const router = express.Router();

// Obtener todos los registros
router.get('/', getRecords);

// Crear un nuevo registro
router.post('/', createRecord);

// Actualizar un registro
router.put('/:id', updateRecord);

// Eliminar un registro
router.delete('/:id', deleteRecord);

export default router;
