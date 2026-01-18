import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { calcularPerfil } from '../utils/algoritmo';
import preguntas from '../data/preguntas.json';

export default function Quiz() {
  const [comenzado, setComenzado] = useState(false); // Estado para la bienvenida
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  
  const totalPreguntas = 13;
  const progreso = ((paso + 1) / totalPreguntas) * 100;

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

  // PANTALLA DE BIENVENIDA
  if (!comenzado) {
    return (
      <div className="min-h-screen bg-[#003366] text-white font-sans flex flex-col justify-center items-center px-6">
        <header className="mb-10 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-xl">❤️</div>
            <h1 className="text-2xl font-bold tracking-widest uppercase">Sintonía</h1>
          </div>
        </header>

        <main className="bg-white text-slate-800 w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl text-center">
          <h2 className="text-xs font-black text-blue-600 tracking-[0.2em] mb-4 uppercase">
            Cuestionario de tres minutos
          </h2>
          <h1 className="text-2xl font-black text-[#003366] leading-tight mb-6 uppercase">
            Mejora tu salud mental y la de tu familia con nuestro plan personalizado
          </h1>
          
          <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-8">
            <p>
              Todos queremos lo mejor para nuestros hijos y para nosotros mismos, pero sabemos que el trabajo y el cansancio a veces nos ponen las cosas difíciles.
            </p>
            <p className="font-medium text-[#003366]">
              Este cuestionario no es un examen y no hay respuestas buenas ni malas. Nadie lo va a juzgar.
            </p>
            <p>
              El objetivo es ayudarlo a entender cómo se siente hoy y cómo está la convivencia en su hogar. Responda con total sinceridad.
            </p>
          </div>

          <button 
            onClick={() => setComenzado(true)}
            className="w-full bg-[#003366] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-700 transition-all uppercase tracking-wider"
          >
            Continuar
          </button>
        </main>

        <footer className="mt-10 text-blue-300 text-xs opacity-60 uppercase tracking-widest">
          Ateliê © 2026
        </footer>
      </div>
    );
  }

  // PANTALLA DE PREGUNTAS (Se activa al dar click en Continuar)
  return (
    <div className="min-h-screen bg-[#003366] text-white font-sans flex flex-col">
      <header className="p-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">❤️</div>
          <h1 className="text-xl font-bold tracking-widest uppercase">Sintonía</h1>
        </div>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-[10px] mb-2 text-blue-200 uppercase font-bold tracking-widest">
            <span>Progreso</span> <span>{paso + 1}/{totalPreguntas}</span>
          </div>
          <div className="h-1.5 bg-blue-900/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 transition-all duration-500 ease-out" 
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pb-12">
        <div className="bg-white text-slate-800 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border-4 border-blue-100/10">
          <h2 className="text-xl font-bold text-center mb-10 text-[#003366] leading-snug px-2">
            {preguntas[paso]?.texto}
          </h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((v) => (
              <button 
                key={v} 
                onClick={() => manejarRespuesta(v)}
                className="w-full flex items-center p-4 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
              >
                <div className="w-6 h-6 border-2 border-slate-200 rounded-full mr-4 flex-shrink-0 group-hover:border-blue-500 transition-colors"></div>
                <span className="font-semibold text-slate-700">
                  {v === 1 ? 'Nunca' : v === 2 ? 'Casi nunca' : v === 3 ? 'A veces' : v === 4 ? 'Casi siempre' : 'Siempre'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-8 text-center text-blue-300 text-[10px] uppercase tracking-[0.3em] opacity-40">
        Ateliê • 2026
      </footer>
    </div>
  );
}
