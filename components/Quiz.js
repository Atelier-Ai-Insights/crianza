import { useState } from 'react';
import { calcularPerfil } from '../utils/algoritmo';
import preguntas from '../data/preguntas.json';
import feedbackData from '../data/feedback.json';
import Menu from './Menu';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function Quiz() {
  const [fase, setFase] = useState('bienvenida'); 
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const progreso = ((paso + 1) / 13) * 100;

  const manejarRespuesta = (valor) => {
    const nuevas = [...respuestas, valor];
    if (paso < 12) {
      setRespuestas(nuevas);
      setPaso(paso + 1);
    } else {
      const res = calcularPerfil(nuevas);
      setPerfil(res);
      localStorage.setItem('temp_perfil', res);
      setFase('resultado');
    }
  };

  const HeaderSuperior = () => (
    <header className="fixed top-0 left-0 w-full bg-primary h-20 px-6 flex items-center justify-between z-30 shadow-md transition-colors">
      <div className="w-12">
        {fase !== 'bienvenida' && (
          <button onClick={() => fase === 'test' ? setPaso(p => Math.max(0, p - 1)) : setFase('bienvenida')} className="p-2 text-white/80 hover:text-white">
            <ArrowLeft size={24} />
          </button>
        )}
      </div>
      <div className="flex items-center">
        <h1 className="text-xl font-bold tracking-widest uppercase text-white italic">Estilos Parentales</h1>
      </div>
      <div className="w-12 flex justify-end"><Menu /></div>
    </header>
  );

  if (fase === 'bienvenida') {
    return (
      <div className="min-h-screen bg-white pt-32 px-6 flex flex-col items-center">
        <HeaderSuperior />
        <main className="max-w-md w-full rounded-[2.5rem] p-10 shadow-lg border border-slate-100 text-center">
          <h2 className="text-[10px] font-bold text-primary tracking-[0.3em] mb-4 uppercase">Test de tres minutos</h2>
          <h1 className="text-3xl font-black text-slate-900 leading-tight mb-8 uppercase italic tracking-tighter">Tu bienestar familiar comienza aquí</h1>
          <button onClick={() => setFase('test')} className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-primary-hover shadow-lg transition-all">
            Empezar <ChevronRight size={20} />
          </button>
        </main>
      </div>
    );
  }

  if (fase === 'resultado') {
    const info = feedbackData[perfil];
    return (
      <div className="min-h-screen bg-white pt-32 px-6 pb-20 flex flex-col items-center">
        <HeaderSuperior />
        <main className="bg-white max-w-md w-full rounded-[2.5rem] p-10 shadow-lg border border-slate-100">
          <h3 className="text-primary font-bold text-[10px] uppercase tracking-widest mb-4 tracking-tighter italic">Resultado</h3>
          <h1 className="text-3xl font-black text-slate-900 mb-6 uppercase italic leading-none tracking-tighter">{info?.titulo}</h1>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-10 italic text-slate-600">"{info?.sugerencia}"</div>
          <button onClick={() => window.location.href = '/auth?mode=signup'} className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest shadow-lg hover:bg-primary-hover transition-all">
            Ver mi Plan
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 px-6">
      <HeaderSuperior />
      <div className="max-w-md mx-auto mb-10">
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-700" style={{ width: `${progreso}%` }}></div>
        </div>
      </div>
      <main className="max-w-md mx-auto rounded-[2.5rem] p-10 border border-slate-100 shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-12 text-slate-900 leading-tight uppercase italic tracking-tighter">{preguntas[paso]?.texto}</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((v) => (
            <button key={v} onClick={() => manejarRespuesta(v)} className="w-full flex items-center p-5 border border-slate-100 rounded-2xl hover:border-primary hover:bg-slate-50 transition-all group">
              <div className="w-5 h-5 border-2 border-slate-200 rounded-full mr-4 group-hover:border-primary transition-colors"></div>
              <span className="font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-tighter">{v === 1 ? 'Nunca' : v === 2 ? 'Casi nunca' : v === 3 ? 'A veces' : v === 4 ? 'Casi siempre' : 'Siempre'}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
