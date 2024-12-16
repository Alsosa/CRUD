import React, { useState } from 'react';

// Formulario basico con un boton.
// Evito que la pagina se recargue y
// muestro un mensaje en la consola.

const CreateForm: React.FC = () => {
    // Estado para manejar los valores de los inputs
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    // Funcion para manejar el cambio en los inputs
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Funcion para manejar el envio del formulario
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Formulario enviado');
        // Aca puedo hacer una llamada a la API
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <h2 className="text-lg font-bold mb-4">Crear Nuevo Registro</h2>

        {/* Campo de nombre */}
        <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Nombre'
            className='border p-2 rounder mb-2 w-full'
        />

        {/* Campo de descripcion */}
        <input
            type='text'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Descripcion'
            className='border p-2 rounded mb-2 w-full'
        />

        {/* Boton de envio */}
        <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Crear
        </button>
        </form>
    );
};

export default CreateForm;
