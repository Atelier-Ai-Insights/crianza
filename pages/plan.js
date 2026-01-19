import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import { PERFILES } from '../constants/perfiles'; // Importante para consistencia
import feedbackData from '../data/feedback.json';
import Menu from '../components/Menu';
import { CONFIG } from '../constants/config';
import { LogOut, BookOpen, Sparkles } from 'lucide-react';

export default function Plan() {
  const router = useRouter();
  const [recursos, setRecursos] = useState([]);
  const [perfil, setPerfil] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Accedemos a la data usando el perfil centralizado
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
        
        // Buscamos recursos que coincidan exactamente con el nombre del perfil
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
  }, [router]);

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="font-bold text-slate-300 uppercase italic tracking-widest text-xs">
        Puliendo tu plan Jade...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 px-6 pb-20 flex flex-col items-center">
      <header className="fixed top-0 left-0 w-full bg-primary h-20 px-6 flex items-center justify-between z-30 shadow-md">
        <button 
          onClick={() => supabase.auth.signOut().then(() => router.push('/'))} 
          className="flex items-center gap-2 text-[10px] font-bold text-white/70 hover:text-white uppercase tracking-wider transition-colors"
        >
          <LogOut size={14} /> Salir
        </button>
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-widest uppercase text-white italic">{CONFIG.APP_NAME}</h1>
        </div>
        <div className="w-12 flex justify-end"><Menu /></div>
      </header>
      
      <main className="max-w-2xl w-full">
        {/* Card de Perfil y Estado */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 mb-10 border-t-[10px] border-primary relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-1 italic">Tu Diagnóstico</h3>
              <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                {info?.titulo || perfil}
              </h1>
            </div>
            <div className="bg-slate-100 px-4 py-2 rounded-2xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Estado actual</p>
              <p className="text-xs font-black text-slate-700 uppercase italic">{info?.estado || "Analizando..."}</p>
            </div>
          </div>
          
          <p className="text-slate-600 leading-relaxed text-md mb-8">
            {info?.mensaje || "Estamos preparando tu contenido basado en tu perfil parental."}
          </p>

          {/* Recomendaciones Rápidas */}
          {info?.recomendaciones && (
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
              <h4 className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest mb-4">
                <Sparkles size={14} /> Recomendaciones Clave
              </h4>
              <ul className="space-y-3">
                {info.recomendaciones.map((rec, i) => (
                  <li key={i} className="text-sm text-slate-700 flex gap-3 items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sección de Formación */}
        <div className="flex items-center justify-between mb-8 px-4">
          <h2 className="text-xl font-black text-slate-800 uppercase italic flex items-center gap-3">
            <BookOpen className="text-primary" size={24} />
            Hoja de Ruta: 21 Días
          </h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase bg-white px-3 py-1 rounded-full border border-slate-100">
            {recursos.length} Lecciones
          </span>
        </div>

        <div className="grid gap-4">
          {recursos.length > 0 ? recursos.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between items-center group hover:border-primary hover:shadow-md transition-all">
              <div className="flex gap-5 items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100 group-hover:bg-primary/5 transition-colors">
                  <span className="text-[8px] font-bold text-slate-400 uppercase leading-none">Día</span>
                  <span className="text-lg font-black text-primary italic leading-none">{r.dia}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Semana {r.semana}</span>
                  <h3 className="font-bold text-slate-800 uppercase group-hover:text-primary transition-colors tracking-tighter text-sm md:text-base">
                    {r.titulo}
                  </h3>
                </div>
              </div>
              <a 
                href={r.url_recurso} 
                target="_blank" 
                rel="noreferrer"
                className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm flex-shrink-0"
              >
                <span className="text-sm ml-0.5">▶</span>
              </a>
            </div>
          )) : (
            <div className="text-center bg-white rounded-[2.5rem] py-16 border border-dashed border-slate-200">
              <p className="text-slate-400 italic text-sm uppercase tracking-widest font-bold">Iniciando fase de pulido...</p>
              <p className="text-slate-300 text-xs mt-2">Tus recursos estarán disponibles pronto.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 py-10 text-slate-300 text-[10px] uppercase tracking-widest text-center px-6 italic font-medium">
        {CONFIG.FOOTER_TEXT}
      </footer>
    </div>
  );
}
