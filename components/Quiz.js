import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { calcularPerfil } from '../utils/algoritmo';
import preguntas from '../data/preguntas.json';

export default function Quiz({ userId }) {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);

  const manejarRespuesta = async (valor) => {
    const nuevasRespuestas = [...respuestas, valor];
    
    if (paso < 12) {
      setRespuestas(nuevasRespuestas);
      setPaso(paso + 1);
    } else {
      const perfilFinal = calcularPerfil(nuevasRespuestas);
      
      // Guardar en Supabase
      await supabase.from('perfiles').upsert({
        id: userId,
        tipo_perfil: perfilFinal,
        test_completado: true
      });
      
      window.location.href = '/plan'; // Redirigir al plan de 3 semanas
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Pregunta {paso + 1} de 13</h2>
      <p className="text-gray-700 mb-6">{preguntas[paso].texto}</p>
      <div className="grid grid-cols-1 gap-3">
        {[1, 2, 3, 4, 5].map((num) => (
          <button 
            key={num} 
            onClick={() => manejarRespuesta(num)}
            className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {num === 1 ? 'Nunca' : num === 5 ? 'Siempre' : num}
          </button>
        ))}
      </div>
    </div>
  );
}
