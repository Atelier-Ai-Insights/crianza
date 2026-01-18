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

  if (loading) return <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center font-bold text-slate-400">CARGANDO...</div>;

  return (
    <div className="min-h-screen bg-[#F9F7F2] pt-32 px-6 pb-20">
      <header className="fixed top-0 left-0 w-full bg-[#4063B0] h-20 px-6 flex items-center justify-between z-30 shadow-md">
        <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))} className="text-[9px] font-bold text-white/60 uppercase">Cerrar Sesión</button>
        <div className="flex items-center gap-2 text-white font-bold italic"><div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] text-[#4063B0]">❤️</div>Sintonía</div>
        <div className="w-12 flex justify-end"><Menu /></div>
      </header>
      
      <main className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 mb-10 border-t-[10px] border-[#4063B0]">
          <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase italic tracking-tighter">Tu Plan de Capacitación</h1>
          <p className="text-slate-500 leading-relaxed text-lg">{info?.descripcion}</p>
        </div>

        <h2 className="text-xl font-black mb-8 text-slate-800 uppercase italic flex items-center gap-3"><span className="w-1.5 h-6 bg-[#4063B0] rounded-full"></span>Tu formación</h2>
        <div className="space-y-3">
          {recursos.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between items-center group hover:shadow-md transition-all">
              <div>
                <span className="text-[9px] font-bold text-[#4063B0] uppercase tracking-widest">Día {r.dia}</span>
                <h3 className="font-bold text-slate-800 uppercase tracking-tight group-hover:text-[#4063B0] transition-colors">{r.titulo}</h3>
              </div>
              <a href={r.url_recurso} target="_blank" className="bg-[#4063B0] text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-md">▶</a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
