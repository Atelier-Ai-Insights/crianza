import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import feedbackData from '../data/feedback.json';
import Menu from '../components/Menu';

export default function Plan() {
  const [recursos, setRecursos] = useState([]);
  const [perfil, setPerfil] = useState('');
  const info = feedbackData[perfil];

  useEffect(() => {
    const p = localStorage.getItem('user_perfil');
    if (p) setPerfil(p);
    
    async function load() {
      if (!p) return;
      const { data } = await supabase
        .from('recursos_formacion')
        .select('*')
        .eq('perfil_objetivo', p)
        .order('semana', { ascending: true })
        .order('dia', { ascending: true });
      setRecursos(data || []);
    }
    load();
  }, [perfil]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar con Menú */}
      <div className="w-full max-w-2xl mx-auto px-6 pt-6 flex justify-end">
        <div className="bg-[#003366] rounded-full p-1 shadow-lg">
          <Menu />
        </div>
      </div>

      <main className="max-w-2xl mx-auto p-6 flex-grow">
        {/* Card de Resultado (Feedback) */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl mb-10 border-t-[12px] border-blue-600 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-6xl">❤️</div>
          
          <h3 className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4">Tu Resultado</h3>
          <h1 className="text-3xl font-black text-[#003366] mb-4 leading-tight">
            {info?.titulo || "Calculando tu perfil..."}
          </h1>
          <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            {info?.descripcion}
          </p>
          
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-4 items-start">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-blue-900 font-bold text-sm uppercase mb-1">Sugerencia para hoy</p>
              <p className="text-blue-800 italic leading-relaxed">"{info?.sugerencia}"</p>
            </div>
          </div>
        </div>
        
        {/* Sección de Formación */}
        <h2 className="text-2xl font-black mb-8 text-slate-800 flex items-center gap-3">
          <span className="w-2 h-8 bg-[#003366] rounded-full"></span>
          Tu formación de 3 semanas
        </h2>

        <div className="space-y-4">
          {recursos.length > 0 ? (
            recursos.map(r => (
              <div key={r.id} className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all flex justify-between items-center gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wider">
                      Semana {r.semana}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Día {r.dia}
                    </span>
                  </div>
                  <h3 className="font-black text-lg text-slate-800 group-hover:text-blue-700 transition-colors">
                    {r.titulo}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1 line-clamp-1">{r.descripcion}</p>
                </div>
                <a 
                  href={r.url_recurso} 
                  className="bg-[#003366] text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all flex-shrink-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-xl">▶</span>
                </a>
              </div>
            ))
          ) : (
            <div className="text-center p-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">Preparando tus contenidos personalizados...</p>
            </div>
          )}
        </div>
      </main>

      <footer className="p-12 text-center text-slate-300 text-[10px] uppercase tracking-[0.4em] font-bold">
        Sintonía • Ateliê AI • 2026
      </footer>
    </div>
  );
}
