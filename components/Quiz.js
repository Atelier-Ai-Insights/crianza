import { useState } from 'react';
import { calcularPerfil } from '../utils/algoritmo';
import preguntas from '../data/preguntas.json';
import Menu from './Menu';
import { ArrowLeft } from 'lucide-react'; // Necesitas importar esto

export default function Quiz() {
  const [comenzado, setComenzado] = useState(false);
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  
  const totalPreguntas = 13;
  const progreso = ((paso + 1) / totalPreguntas) * 100;

  const manejarRespuesta = (valor) => {
    const nuevas = [...respuestas, valor];
    if (paso < 12) {
      setRespuestas(nuevas);
      setPaso(paso + 1);
    } else {
      const perfil = calcularPerfil(nuevas);
      // Guardamos temporalmente en localStorage para vincularlo tras el registro
      localStorage.setItem('temp_perfil', perfil);
      window.location.href = '/auth?mode=signup'; // Redirigir a registro
    }
  };

  const retroceder = () => {
    if (paso > 0) {
      setPaso(paso - 1);
      setRespuestas(respuestas.slice(0, -1));
    }
  };

  if (!comenzado) {
    return (
      <div className="min-h-screen bg-[#003366] text-white font-sans flex flex-col items-center px-6">
        <header className="w-full max-w-md py-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-sm shadow-inner">❤️</div>
            <h1 className="text-xl font-bold tracking-widest uppercase">Sintonía</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth?mode=login" className="text-xs font-bold uppercase tracking-widest hover:text-blue-300 transition-colors">Ingresar</a>
            <Menu />
          </div>
        </header>

        <main className="bg-white text-slate-800 w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl text-center mt-4">
          <h2 className="text-[10px] font-black text-blue-600 tracking-[0.2em] mb-4 uppercase">Cuestionario de tres minutos</h2>
          <h1 className="text-2xl font-black text-[#003366] leading-tight mb-8 uppercase">Mejora tu salud mental y la de tu familia</h1>
          <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-10 text-left">
            <p>Todos queremos lo mejor para nuestros hijos, pero el trabajo y el cansancio a veces nos ponen las cosas difíciles.</p>
            <p className="font-bold text-[#003366] border-l-4 border-blue-500 pl-4">Tus respuestas nos servirán para darte consejos útiles.</p>
          </div>
          <button onClick={() => setComenzado(true)} className="w-full bg-[#003366] text-white py-5 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-800 transition-all uppercase tracking-widest">Continuar</button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#003366] text-white font-sans flex flex-col">
      <header className="p-8 pb-4 flex justify-between items-start max-w-md mx-auto w-full">
        <div className="flex-grow pr-4">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={retroceder} className={`p-2 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all ${paso === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-[10px]">❤️</div>
              <h1 className="text-sm font-bold tracking-widest uppercase">Sintonía</h1>
            </div>
          </div>
          <div className="flex justify-between text-[10px] mb-2 text-blue-200 uppercase font-bold tracking-widest">
            <span>Pregunta {paso + 1}</span> <span>{Math.round(progreso)}%</span>
          </div>
          <div className="h-1.5 bg-blue-900/50 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${progreso}%` }}></div>
          </div>
        </div>
        <Menu />
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pb-12">
        <div className="bg-white text-slate-800 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border-4 border-blue-100/10">
          <h2 className="text-xl font-bold text-center mb-10 text-[#003366] leading-snug">{preguntas[paso]?.texto}</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((v) => (
              <button key={v} onClick={() => manejarRespuesta(v)} className="w-full flex items-center p-4 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <div className="w-6 h-6 border-2 border-slate-200 rounded-full mr-4 flex-shrink-0 group-hover:border-blue-500"></div>
                <span className="font-semibold text-slate-700">{v === 1 ? 'Nunca' : v === 2 ? 'Casi nunca' : v === 3 ? 'A veces' : v === 4 ? 'Casi siempre' : 'Siempre'}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
