import { useState } from 'react';
import { calcularPerfil } from '../utils/algoritmo';
import { PERFILES } from '../constants/perfiles';
import preguntas from '../data/preguntas.json';
import feedbackData from '../data/feedback.json';
import Menu from './Menu';
import { CONFIG } from '../constants/config';
import { ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

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
    <header className="fixed top-0 left-0 w-full bg-primary h-20 px-6 flex items-center justify-between z-30 shadow-md">
      <div className="w-12">
        {fase !== 'bienvenida' && (
          <button 
            onClick={() => fase === 'test' ? setPaso(p => Math.max(0, p - 1)) : setFase('bienvenida')} 
            className="p-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        )}
      </div>
      <div className="flex items-center">
        <h1 className="text-xl font-bold tracking-widest uppercase text-white italic">{CONFIG.APP_NAME}</h1>
      </div>
      <div className="w-12 flex justify-end"><Menu /></div>
    </header>
  );

  if (fase === 'bienvenida') {
    return (
      <div className="min-h-screen bg-white pt-32 px-6 flex flex-col items-center">
        <HeaderSuperior />
        <main className="max-w-md w-full rounded-[2.5rem] p-10 shadow-lg border border-slate-100 text-center bg-white">
          <h2 className="text-[10px] font-bold text-primary tracking-[0.3em] mb-4 uppercase">Jade-Health • Test de bienestar</h2>
          <h1 className="text-3xl font-black text-slate-900 leading-tight mb-8 uppercase italic tracking-tighter">Tu bienestar familiar comienza aquí</h1>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">Descubre tu perfil de parentalidad y cómo influye en tu salud mental en solo 3 minutos.</p>
          <button 
            onClick={() => setFase('test')} 
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-primary-hover shadow-lg transition-all active:scale-95"
          >
            Empezar <ChevronRight size={20} />
          </button>
        </main>
        {/* Footer Verde añadido para consistencia */}
        <footer className="mt-auto py-10 text-primary text-[10px] uppercase tracking-widest text-center px-6 italic font-bold">
          {CONFIG.FOOTER_TEXT}
        </footer>
      </div>
    );
  }

  if (fase === 'resultado') {
    const info = feedbackData[perfil];
    return (
      <div className="min-h-screen bg-white pt-32 px-6 pb-20 flex flex-col items-center text-slate-900">
        <HeaderSuperior />
        <main className="bg-white max-w-md w-full rounded-[2.5rem] p-10 shadow-lg border border-slate-100 overflow-hidden">
          <h3 className="text-primary font-bold text-[10px] uppercase tracking-widest mb-2 italic">Análisis Jade Finalizado</h3>
          
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900 uppercase italic leading-none tracking-tighter mb-2">
              {info?.titulo}
            </h1>
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
              Estado: {info?.estado}
            </span>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            {info?.mensaje}
          </p>

          <div className="space-y-4 mb-10">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primeros pasos recomendados:</h4>
            {info?.recomendaciones?.map((rec, index) => (
              <div key={index} className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <CheckCircle2 className="text-primary shrink-0" size={18} />
                <p className="text-xs text-slate-700 font-medium leading-snug">{rec}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => window.location.href = '/auth?mode=signup'} 
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest shadow-lg hover:brightness-110 transition-all active:scale-95"
          >
            Ver mi Plan Detallado
          </button>
        </main>
        {/* Footer Verde Jade */}
        <footer className="mt-auto py-10 text-primary text-[10px] uppercase tracking-widest text-center px-6 italic font-bold">
          {CONFIG.FOOTER_TEXT}
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 px-6 flex flex-col">
      <HeaderSuperior />
      <div className="max-w-md mx-auto w-full mb-6 mt-4">
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-700" style={{ width: `${progreso}%` }}></div>
        </div>
        <div className="flex justify-between mt-2 px-1">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Progreso</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{Math.round(progreso)}%</span>
        </div>
      </div>
      <main className="max-w-md mx-auto w-full rounded-[2.5rem] p-8 border border-slate-100 shadow-lg bg-white mb-8">
        <h2 className="text-lg font-bold text-center mb-10 text-slate-900 leading-snug tracking-tight first-letter:uppercase">
          {preguntas[paso]?.texto.toLowerCase()}
        </h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((v) => (
            <button 
              key={v} 
              onClick={() => manejarRespuesta(v)} 
              className="w-full flex items-center p-4 border border-slate-100 rounded-xl hover:border-primary hover:bg-slate-50 transition-all group bg-white shadow-sm active:scale-[0.98]"
            >
              <div className="w-5 h-5 border-2 border-slate-200 rounded-full mr-4 group-hover:border-primary flex items-center justify-center transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
              </div>
              <span className="font-bold text-sm text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-tighter">
                {v === 1 ? 'Nunca' : v === 2 ? 'Casi nunca' : v === 3 ? 'A veces' : v === 4 ? 'Casi siempre' : 'Siempre'}
              </span>
            </button>
          ))}
        </div>
      </main>
      {/* Footer actualizado a Verde Jade y Negrita */}
      <footer className="mt-auto py-10 text-primary text-[10px] uppercase tracking-widest text-center px-6 italic font-bold">
        {CONFIG.FOOTER_TEXT}
      </footer>
    </div>
  );
}
