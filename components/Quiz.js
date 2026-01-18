import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { calcularPerfil } from '../utils/algoritmo';
import preguntas from '../data/preguntas.json';

export default function Quiz() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);

  const handleRespuesta = async (valor) => {
    const nuevas = [...respuestas, valor];
    if (paso < 12) {
      setRespuestas(nuevas);
      setPaso(paso + 1);
    } else {
      const perfil = calcularPerfil(nuevas);
      // Guardamos en la tabla 'perfiles' que ya creaste en Supabase
      await supabase.from('perfiles').insert([{ tipo_perfil: perfil, test_completado: true }]);
      localStorage.setItem('user_perfil', perfil);
      window.location.href = '/plan';
    }
  };

  return (
    <div className="p-6 border rounded shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-lg font-bold">Pregunta {paso + 1} de 13</h2>
      <p className="my-4">{preguntas[paso].texto}</p>
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4, 5].map(v => (
          <button key={v} onClick={() => handleRespuesta(v)} className="bg-blue-500 text-white p-2 rounded">
            {v === 1 ? 'Nunca (1)' : v === 5 ? 'Siempre (5)' : v}
          </button>
        ))}
      </div>
    </div>
  );
}
