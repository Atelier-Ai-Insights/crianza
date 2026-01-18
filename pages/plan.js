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
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/auth?mode=login'); return; }
      const { data: user } = await supabase.from('perfiles').select('tipo_perfil').eq('id', session.user.id).single();
      if (user) {
        setPerfil(user.tipo_perfil);
        const { data: res } = await supabase.from('recursos_formacion').select('*').eq('perfil_objetivo', user.tipo_perfil).order('semana', { ascending: true }).order('dia', { ascending: true });
        setRecursos(res || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest">Cargando...</div>;

  return (
    <div className="min-h-screen bg-[#F9F7F2] pt-32 px-6 pb-20">
      <header className="fixed top-0 left-0 w-full bg-[#111827] h-20 px-6 flex items-center justify-between z-30 shadow-md">
        <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))} className="text-[10px] font-bold text-slate-400 uppercase">Cerrar Sesión</button>
        <div className="flex items-center gap-2 text-white font-bold italic"><div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px]">❤️</div>Sintonía</div>
        <div className="w-12 flex justify-end"><Menu /></div>
      </header>
      <main className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 mb-12 border-t-[12px] border-blue-600 relative overflow-hidden">
          <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase italic tracking-tighter leading-none">Capacitación Personalizada</h1>
          <p className="text-slate-500 text-lg leading-relaxed">{info?.descripcion}</p>
        </div>
        <h2 className="text-xl font-black mb-8 text-slate-800 uppercase italic flex items-center gap-3"><span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>Tu Ruta de 21 Días</h2>
        <div className="space-y-4">
          {recursos.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center group hover:shadow-lg transition-all">
              <div>
                <div className="flex gap-2 mb-2"><span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-widest">Semana {r.semana}</span><span className="text-[9px] font-bold text-slate-300 uppercase italic">Día {r.dia}</span></div>
                <h3 className="font-bold text-lg text-slate-800 uppercase tracking-tight leading-none group-hover:text-blue-600 transition-colors">{r.titulo}</h3>
              </div>
              <a href={r.url_recurso} target="_blank" className="bg-[#111827] text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-blue-600 transition-all"><span className="text-xl ml-1">▶</span></a>
            </div>
          ))}
        </div>
      </main>
      <footer className="mt-20 text-center text-slate-300 text-[10px] uppercase tracking-[0.4em] italic font-black">Sintonía • 2026</footer>
    </div>
  );
}
