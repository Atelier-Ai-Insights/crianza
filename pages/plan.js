import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import feedbackData from '../data/feedback.json';
import Menu from '../components/Menu';
import { CONFIG } from '../constants/config';

export default function Plan() {
  const router = useRouter();
  const [recursos, setRecursos] = useState([]);
  const [perfil, setPerfil] = useState('');
  const [loading, setLoading] = useState(true);
  const info = feedbackData[perfil];

  useEffect(() => {
    async function loadPlan() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth?mode=login');
        return;
      }

      const { data: userProfile } = await supabase
        .from('perfiles')
        .select('tipo_perfil')
        .eq('id', session.user.id)
        .single();
      
      if (userProfile) {
        setPerfil(userProfile.tipo_perfil);
        const { data: trainingData } = await supabase
          .from('recursos_formacion')
          .select('*')
          .eq('perfil_objetivo', userProfile.tipo_perfil)
          .order('semana', { ascending: true })
          .order('dia', { ascending: true });
        setRecursos(trainingData || []);
      }
      setLoading(false);
    }
    loadPlan();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center font-bold text-slate-300 uppercase italic tracking-widest">
      Cargando tu plan personalizado...
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-32 px-6 pb-20 flex flex-col items-center">
      <header className="fixed top-0 left-0 w-full bg-primary h-20 px-6 flex items-center justify-between z-30 shadow-md">
        <button 
          onClick={() => supabase.auth.signOut().then(() => router.push('/'))} 
          className="text-[9px] font-bold text-white/70 hover:text-white uppercase tracking-tighter"
        >
          Cerrar Sesión
        </button>
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-widest uppercase text-white italic">{CONFIG.APP_NAME}</h1>
        </div>
        <div className="w-12 flex justify-end"><Menu /></div>
      </header>
      
      <main className="max-w-2xl w-full">
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 mb-10 border-t-[10px] border-primary relative overflow-hidden">
          <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase italic tracking-tighter leading-none">
            Tu Capacitación
          </h1>
          <p className="text-slate-500 leading-relaxed text-lg tracking-tight">
            {info?.descripcion || "Estamos preparando tu contenido basado en tu estilo parental."}
          </p>
        </div>

        <h2 className="text-xl font-black mb-8 text-slate-800 uppercase italic flex items-center gap-3 px-4">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          Mi Formación de 21 Días
        </h2>

        <div className="space-y-3 px-2">
          {recursos.length > 0 ? recursos.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between items-center group hover:border-primary transition-all shadow-sm">
              <div>
                <div className="flex gap-2 mb-1">
                  <span className="text-[9px] font-bold text-primary uppercase tracking-widest italic">Día {r.dia}</span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Semana {r.semana}</span>
                </div>
                <h3 className="font-bold text-slate-800 uppercase group-hover:text-primary transition-colors tracking-tighter">
                  {r.titulo}
                </h3>
              </div>
              <a 
                href={r.url_recurso} 
                target="_blank" 
                rel="noreferrer"
                className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-md flex-shrink-0"
              >
                <span className="text-xl ml-1">▶</span>
              </a>
            </div>
          )) : (
            <p className="text-center text-slate-400 italic py-10">Aún no hay lecciones cargadas para tu perfil.</p>
          )}
        </div>
      </main>

      <footer className="mt-auto py-10 text-slate-300 text-[10px] uppercase tracking-widest text-center px-6 italic font-black opacity-30">
        {CONFIG.FOOTER_TEXT}
      </footer>
    </div>
  );
}
