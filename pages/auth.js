import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { ArrowLeft } from 'lucide-react';
import { CONFIG } from '../constants/config';

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    if (router.query.mode === 'signup') setIsLogin(false); 
  }, [router.query]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) router.push('/plan'); 
      else alert("Error al ingresar: " + error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (!error && data.user) {
        const tempPerfil = localStorage.getItem('temp_perfil');
        await supabase.from('perfiles').insert([{ 
          id: data.user.id, 
          tipo_perfil: tempPerfil, 
          test_completado: true 
        }]);
        router.push('/plan');
      } else alert("Error al registrarse: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white pt-32 px-6 flex flex-col items-center">
      <header className="fixed top-0 left-0 w-full bg-primary h-20 px-6 flex items-center justify-between z-30 shadow-md">
        <button onClick={() => router.push('/')} className="p-2 text-white/70 hover:text-white transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-widest uppercase text-white italic">{CONFIG.APP_NAME}</h1>
        </div>
        <div className="w-12 flex justify-end"><Menu /></div>
      </header>

      <main className="max-w-md w-full bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl mt-4 relative overflow-hidden">
        <h1 className="text-2xl font-black text-slate-900 text-center mb-10 uppercase italic tracking-tighter leading-none">
          {isLogin ? 'Ingresar a mi Plan' : 'Crea tu cuenta'}
        </h1>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-primary outline-none transition-all" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-primary outline-none transition-all" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button 
            disabled={loading} 
            className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : isLogin ? 'Entrar' : 'Registrarme'}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="w-full mt-8 text-[10px] font-bold text-primary uppercase tracking-widest hover:underline text-center"
        >
          {isLogin ? '¿No tienes cuenta? Comienza el test' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </main>

      <footer className="mt-auto py-10 text-slate-300 text-[10px] uppercase tracking-widest text-center px-6 italic font-black opacity-30">
        {CONFIG.FOOTER_TEXT}
      </footer>
    </div>
  );
}
