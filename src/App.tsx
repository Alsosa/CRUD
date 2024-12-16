import React from 'react';
import './App.css';
import CreateForm from './components/CreateForm';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">CRUD App</h1>
      <CreateForm />
    </div>
  );
};

export default App
