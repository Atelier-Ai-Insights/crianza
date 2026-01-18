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
  const progreso = ((paso + 1) / 13) * 100;

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
      setRespuestas(respuestas.slice(0, -1));
    } else { setFase('bienvenida'); }
  };

  const HeaderSuperior = () => (
    <header className="fixed top-0 left-0 w-full bg-[#111827] h-20 px-6 flex items-center justify-between z-30 shadow-md">
      <div className="w-12">
        {fase !== 'bienvenida' && (
          <button onClick={retroceder} className="p-2 text-slate-400 hover:text-white transition-all"><ArrowLeft size={24} /></button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">❤️</div>
        <h1 className="text-xl font-bold tracking-widest uppercase text-white italic">Sintonía</h1>
      </div>
      <div className="w-12 flex justify-end"><Menu /></div>
    </header>
  );

  if (fase === 'bienvenida') {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center pt-32 px-6">
        <HeaderSuperior />
        <main className="bg-white text-slate-800 w-full max-w-md rounded-[3rem] p-10 shadow-sm border border-slate-100 text-center">
          <h2 className="text-[10px] font-bold text-blue-600 tracking-[0.3em] mb-4 uppercase">Test de tres minutos</h2>
          <h1 className="text-3xl font-black text-slate-900 leading-tight mb-8 uppercase italic tracking-tighter">Tu bienestar familiar comienza aquí</h1>
          <div className="space-y-4 text-slate-500 text-sm leading-relaxed mb-10 text-left">
            <p>Este cuestionario te ayudará a entender la dinámica actual de tu hogar y cómo te sientes hoy.</p>
            <p className="font-bold text-slate-800 border-l-4 border-blue-600 pl-4">Responde con total sinceridad. No hay respuestas malas.</p>
          </div>
          <button onClick={() => setFase('test')} className="w-full bg-[#111827] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-blue-900 transition-all shadow-lg">Empezar Test <ChevronRight size={20} /></button>
        </main>
      </div>
    );
  }

  if (fase === 'resultado') {
    const info = feedbackData[perfilCalculado];
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center pt-32 px-6 pb-20">
        <HeaderSuperior />
        <main className="bg-white text-slate-800 w-full max-w-md rounded-[3rem] p-10 shadow-sm border border-slate-100 relative">
          <h3 className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-4">Tu Resultado</h3>
          <h1 className="text-3xl font-black text-slate-900 mb-6 uppercase italic leading-none">{info?.titulo}</h1>
          <p className="text-slate-500 leading-relaxed mb-8 text-lg">{info?.descripcion}</p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-10 italic text-slate-600">"{info?.sugerencia}"</div>
          <button onClick={() => window.location.href = '/auth?mode=signup'} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold uppercase tracking-widest shadow-lg hover:bg-blue-700 transition-all">Ver Plan de Capacitación</button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] pt-32 px-6">
      <HeaderSuperior />
      <div className="max-w-md mx-auto mb-10">
        <div className="flex justify-between text-[10px] mb-2 text-slate-400 font-bold uppercase tracking-widest"><span>Progreso</span> <span>{Math.round(progreso)}%</span></div>
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-blue-600 transition-all duration-700" style={{ width: `${progreso}%` }}></div></div>
      </div>
      <main className="max-w-md mx-auto bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-center mb-12 text-slate-900 leading-tight uppercase italic">{preguntas[paso]?.texto}</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((v) => (
            <button key={v} onClick={() => manejarRespuesta(v)} className="w-full flex items-center p-5 border border-slate-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all group shadow-sm bg-white">
              <div className="w-5 h-5 border-2 border-slate-200 rounded-full mr-4 group-hover:border-blue-600 transition-colors"></div>
              <span className="font-bold text-slate-500 group-hover:text-blue-900 transition-colors">{v === 1 ? 'Nunca' : v === 2 ? 'Casi nunca' : v === 3 ? 'A veces' : v === 4 ? 'Casi siempre' : 'Siempre'}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
