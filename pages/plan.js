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
        router.push('/auth?mode=login'); // Obligatorio loguearse
        return;
      }

      // Obtener el perfil del usuario desde la tabla de Supabase
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

  if (loading) return <div className="min-h-screen bg-[#003366] flex items-center justify-center text-white font-black uppercase tracking-widest">Cargando tu universo...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="w-full max-w-2xl mx-auto px-6 pt-6 flex justify-between items-center">
        <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))} className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-red-500">Cerrar Sesión</button>
        <div className="bg-[#003366] rounded-full p-1 shadow-lg"><Menu /></div>
      </div>
      <main className="max-w-2xl mx-auto p-6 flex-grow">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl mb-10 border-t-[12px] border-blue-600 relative">
          <h1 className="text-3xl font-black text-[#003366] mb-4 leading-tight">{info?.titulo}</h1>
          <p className="text-slate-600 leading-relaxed text-lg">{info?.descripcion}</p>
        </div>
        {/* ... resto del código de recursos ... */}
      </main>
    </div>
  );
}
