import { useState } from 'react';
import { calcularPerfil } from '../utils/algoritmo';
import preguntas from '../data/preguntas.json';
import feedbackData from '../data/feedback.json';
import Menu from './Menu';
import { ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';

export default function Quiz() {
  const [fase, setFase] = useState('bienvenida'); 
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [perfilCalculado, setPerfilCalculado] = useState(null);
  
  const totalPreguntas = 13;
  const progreso = ((paso + 1) / totalPreguntas) * 100;

  const manejarRespuesta = (valor) => {
    const nuevas = [...respuestas, valor];
    if (paso < 12) {
      setRespuestas(nuevas);
      setPaso(paso + 1);
    } else {
      const perfil = calcularPerfil(nuevas);
      setPerfilCalculado(perfil);
      localStorage.setItem('temp_perfil', perfil);
      setFase('resultado');
    }
  };

  const retroceder = () => {
    if (paso > 0) {
      setPaso(paso - 1);
      const nuevasRespuestas = [...respuestas];
      nuevasRespuestas.pop();
      setRespuestas(nuevasRespuestas);
    } else if (paso === 0) {
      setFase('bienvenida');
    }
  };

  // COMPONENTE DE BARRA SUPERIOR (HEADER)
  const HeaderSuperior = () => (
    <header className="fixed top-0 left-0 w-full bg-[#002855] h-20 px-6 flex items-center justify-between z-30 shadow-xl border-b border-white/5">
      {/* Izquierda: Flecha retroceder (solo si no es bienvenida) */}
      <div className="w-12">
        {fase !== 'bienvenida' && (
          <button onClick={retroceder} className="p-2 text-white hover:bg-white/10 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
        )}
      </div>

      {/* Centro: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-sm shadow-lg">❤️</div>
        <h1 className="text-xl font-black tracking-widest uppercase text-white">Sintonía</h1>
      </div>

      {/* Derecha: Menú */}
      <div className="w-12 flex justify-end">
        <Menu />
      </div>
    </header>
  );

  if (fase === 'bienvenida') {
    return (
      <div className="min-h-screen bg-[#003366] text-white flex flex-col items-center pt-24 px-6">
        <HeaderSuperior />
        <main className="bg-white text-slate-800 w-full max-w-md rounded-[3rem] p-10 shadow-2xl text-center mt-8 border-b-[10px] border-blue-500">
          <h2 className="text-[10px] font-black text-blue-600 tracking-[0.3em] mb-4 uppercase">Cuestionario de tres minutos</h2>
          <h1 className="text-3xl font-black text-[#003366] leading-tight mb-8 uppercase italic tracking-tighter">Tu salud mental importa</h1>
          <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-10 text-left">
            <p>Sabemos que la crianza es un reto diario. Este test te ayudará a encontrar el equilibrio.</p>
            <p className="font-bold text-[#003366] border-l-4 border-blue-500 pl-4">No hay respuestas malas, solo un camino para mejorar.</p>
          </div>
          <button onClick={() => setFase('test')} className="w-full bg-[#003366] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl hover:bg-blue-800 flex items-center justify-center gap-3 uppercase tracking-widest transition-all">
            Empezar <ChevronRight size={20} />
          </button>
        </main>
      </div>
    );
  }

  if (fase === 'resultado') {
    const info = feedbackData[perfilCalculado];
    return (
      <div className="min-h-screen bg-[#003366] text-white flex flex-col items-center pt-24 px-6 pb-12">
        <HeaderSuperior />
        <main className="bg-white text-slate-800 w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden mt-8">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={60} className="text-blue-600" /></div>
          <h3 className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4">Resultado Obtenido</h3>
          <h1 className="text-3xl font-black text-[#003366] mb-6 leading-tight uppercase italic">{info?.titulo}</h1>
          <p className="text-slate-600 leading-relaxed mb-10 text-lg">{info?.descripcion}</p>
          <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 mb-12 shadow-inner">
            <p className="text-blue-900 font-black text-[10px] uppercase mb-2">Consejo del día</p>
            <p className="text-blue-800 italic leading-relaxed text-sm">"{info?.sugerencia}"</p>
          </div>
          <button onClick={() => window.location.href = '/auth?mode=signup'} className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-blue-700 transition-all uppercase tracking-[0.1em]">
            Obtener Capacitación Personalizada
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#003366] text-white flex flex-col pt-24">
      <HeaderSuperior />
      
      {/* Barra de Progreso debajo del menú superior */}
      <div className="w-full max-w-md mx-auto px-8 py-4">
        <div className="flex justify-between text-[10px] mb-2 text-blue-200 uppercase font-black tracking-[0.2em]">
          <span>Progreso</span> <span>{Math.round(progreso)}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-700 ease-out" style={{ width: `${progreso}%` }}></div>
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center px-6 pb-16 mt-4">
        <div className="bg-white text-slate-800 w-full max-w-md rounded-[3.5rem] p-10 shadow-2xl border-4 border-white/10">
          <h2 className="text-2xl font-black text-center mb-12 text-[#003366] leading-tight tracking-tight uppercase italic">
            {preguntas[paso]?.texto}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((v) => (
              <button key={v} onClick={() => manejarRespuesta(v)} className="w-full flex items-center p-5 border-2 border-slate-50 rounded-[1.8rem] hover:border-blue-500 hover:bg-blue-50 transition-all group shadow-sm">
                <div className="w-6 h-6 border-2 border-slate-200 rounded-full mr-5 flex-shrink-0 group-hover:border-blue-500 group-hover:bg-blue-500 transition-all"></div>
                <span className="font-bold text-slate-600 group-hover:text-[#003366] transition-colors">
                  {v === 1 ? 'Nunca' : v === 2 ? 'Casi nunca' : v === 3 ? 'A veces' : v === 4 ? 'Casi siempre' : 'Siempre'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
