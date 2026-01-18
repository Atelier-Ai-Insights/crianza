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

      // Buscar perfil en base de datos vinculado al ID de usuario autenticado
      const { data: userData } = await supabase
        .from('perfiles')
        .select('tipo_perfil')
        .eq('id', session.user.id)
        .single();
      
      if (userData) {
        setPerfil(userData.tipo_perfil);
        const { data: res } = await supabase
          .from('recursos_formacion')
          .select('*')
          .eq('perfil_objetivo', userData.tipo_perfil)
          .order('semana', { ascending: true })
          .order('dia', { ascending: true });
        setRecursos(res || []);
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#003366] flex flex-col items-center justify-center text-white p-6">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
      <p className="font-black uppercase tracking-[0.3em] text-xs">Preparando tu universo de crianza...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="w-full max-w-2xl mx-auto px-6 pt-8 flex justify-between items-center">
         <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">Cerrar Sesión</button>
         <div className="bg-[#003366] rounded-full p-1 shadow-lg">
           <Menu />
         </div>
      </div>

      <main className="max-w-2xl mx-auto p-6 flex-grow pb-20">
        <header className="mb-10 mt-4">
          <h3 className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Tu Plan Personalizado</h3>
          <h1 className="text-4xl font-black text-[#003366] leading-tight tracking-tighter uppercase italic">Capacitación en Habilidades de Crianza</h1>
        </header>

        {/* Sección de Recursos */}
        <div className="space-y-4">
          {recursos.map(r => (
            <div key={r.id} className="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all flex justify-between items-center gap-4">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">Semana {r.semana}</span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Día {r.dia}</span>
                </div>
                <h3 className="font-black text-lg text-slate-800 leading-tight group-hover:text-blue-600 transition-colors uppercase">{r.titulo}</h3>
              </div>
              <a href={r.url_recurso} target="_blank" className="bg-[#003366] text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg hover:bg-blue-800 transition-transform active:scale-90 flex-shrink-0">
                <span className="text-xl">▶</span>
              </a>
            </div>
          ))}
        </div>
      </main>

      <footer className="p-12 text-center text-slate-300 text-[10px] uppercase tracking-[0.5em] font-black opacity-50">Sintonía • 2026</footer>
    </div>
  );
}
