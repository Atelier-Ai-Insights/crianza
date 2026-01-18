import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { calcularPerfil } from '../utils/algoritmo';
import preguntas from '../data/preguntas.json';

export default function Quiz() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const progreso = ((paso + 1) / 13) * 100;

  const manejarRespuesta = async (valor) => {
    const nuevas = [...respuestas, valor];
    if (paso < 12) {
      setRespuestas(nuevas);
      setPaso(paso + 1);
    } else {
      const perfil = calcularPerfil(nuevas);
      await supabase.from('perfiles').insert([{ tipo_perfil: perfil, test_completado: true }]);
      localStorage.setItem('user_perfil', perfil);
      window.location.href = '/plan';
    }
  };

  return (
    <div className="min-h-screen bg-[#003366] text-white font-sans flex flex-col">
      <header className="p-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">❤️</div>
          <h1 className="text-2xl font-bold tracking-widest uppercase">Sintonía</h1>
        </div>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-xs mb-2 text-blue-200">
            <span>Progreso</span> <span>{paso + 1}/13</span>
          </div>
          <div className="h-1.5 bg-blue-900 rounded-full">
            <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${progreso}%` }}></div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6">
        <div className="bg-white text-slate-800 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-center mb-8 text-[#003366]">
            {preguntas[paso]?.texto}
          </h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((v) => (
              <button 
                key={v} 
                onClick={() => manejarRespuesta(v)}
                className="w-full flex items-center p-4 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="w-6 h-6 border-2 border-slate-300 rounded-full mr-4 group-hover:border-blue-500"></div>
                <span className="font-medium text-slate-600">
                  {v === 1 ? 'Nunca' : v === 2 ? 'Casi nunca' : v === 3 ? 'A veces' : v === 4 ? 'Casi siempre' : 'Siempre'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-8 text-center text-blue-300 text-xs">
        Ateliê © 2024 - Todos los derechos reservados
      </footer>
    </div>
  );
}
