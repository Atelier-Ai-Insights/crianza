import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import feedbackData from '../data/feedback.json';
import Menu from '../components/Menu';

export default function Plan() {
  const router = useRouter();
  const [recursos, setRecursos] = useState([]);
  const [perfil, setPerfil] = useState('');
  const [loading, setLoading] = useState(true);
  const info = feedbackData[perfil];

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth?mode=login');
        return;
      }

      const { data: userData } = await supabase.from('perfiles').select('tipo_perfil').eq('id', session.user.id).single();
      
      if (userData) {
        setPerfil(userData.tipo_perfil);
        const { data: res } = await supabase.from('recursos_formacion').select('*').eq('perfil_objetivo', userData.tipo_perfil).order('semana', { ascending: true }).order('dia', { ascending: true });
        setRecursos(res || []);
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#003366] flex flex-col items-center justify-center text-white">
      <div className="w-10 h-10 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
      <p className="font-black uppercase tracking-[0.4em] text-[10px]">Cargando tu Plan...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      {/* Header Fijo */}
      <header className="fixed top-0 left-0 w-full bg-[#002855] h-20 px-6 flex items-center justify-between z-30 shadow-xl">
        <div className="w-12"></div> {/* Espacio para equilibrar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-sm shadow-lg">❤️</div>
          <h1 className="text-xl font-black tracking-widest uppercase text-white italic">Sintonía</h1>
        </div>
        <div className="w-12 flex justify-end">
          <Menu />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 flex-grow pb-24">
        <div className="mt-8 mb-12 text-center">
          <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))} className="text-[9px] font-black text-slate-400 hover:text-red-500 uppercase tracking-[0.3em] transition-colors border border-slate-200 px-4 py-1 rounded-full">Finalizar Sesión</button>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl mb-12 border-t-[14px] border-blue-600 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-50"></div>
          <h1 className="text-4xl font-black text-[#003366] mb-6 leading-[0.9] uppercase italic tracking-tighter">Capacitación Amorosa</h1>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">{info?.descripcion}</p>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-[2.5rem] text-white shadow-lg">
             <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Enfoque Semanal</p>
             <p className="text-xl font-bold leading-snug">Hoy trabajaremos en fortalecer tu paciencia reactiva.</p>
          </div>
        </div>
        
        {/* Lista de Formación */}
        <h2 className="text-2xl font-black mb-8 text-slate-800 uppercase italic tracking-tight flex items-center gap-3 px-4">
          <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
          Tu Ruta de 21 Días
        </h2>

        <div className="space-y-4 px-2">
          {recursos.map(r => (
            <div key={r.id} className="group bg-white p-6 rounded-[2.2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:scale-[1.02] transition-all flex justify-between items-center gap-6">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Semana {r.semana}</span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Sesión {r.dia}</span>
                </div>
                <h3 className="font-black text-xl text-slate-800 group-hover:text-blue-700 transition-colors uppercase leading-tight tracking-tighter">{r.titulo}</h3>
              </div>
              <a href={r.url_recurso} target="_blank" className="bg-[#003366] text-white w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-xl group-hover:bg-blue-600 group-hover:rotate-6 transition-all flex-shrink-0">
                <span className="text-2xl ml-1">▶</span>
              </a>
            </div>
          ))}
        </div>
      </main>

      <footer className="p-12 text-center text-slate-300 text-[10px] uppercase tracking-[0.5em] font-black opacity-30 italic">Ateliê AI • 2026</footer>
    </div>
  );
}
