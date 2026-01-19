import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { ArrowLeft, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { CONFIG } from '../constants/config';
import { PERFILES } from '../constants/perfiles';

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
      if (!error) {
        router.push('/plan'); 
      } else {
        alert("Error al ingresar: " + error.message);
      }
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (!error && data.user) {
        // Recuperamos el nombre del perfil calculado (ej: "Abrumado en Crisis")
        const tempPerfil = localStorage.getItem('temp_perfil') || PERFILES.TENSION;
        
        const { error: profileError } = await supabase.from('perfiles').insert([{ 
          id: data.user.id, 
          tipo_perfil: tempPerfil, 
          test_completado: true 
        }]);

        if (!profileError) {
          router.push('/plan');
        } else {
          alert("Error al crear perfil: " + profileError.message);
        }
      } else {
        alert("Error al registrarse: " + error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/30 pt-32 px-6 flex flex-col items-center">
      <header className="fixed top-0 left-0 w-full bg-primary h-20 px-6 flex items-center justify-between z-30 shadow-md">
        <button 
          onClick={() => router.push('/')} 
          className="p-2 text-white/70 hover:text-white transition-all active:scale-90"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-widest uppercase text-white italic">{CONFIG.APP_NAME}</h1>
        </div>
        <div className="w-12 flex justify-end"><Menu /></div>
      </header>

      <main className="max-w-md w-full bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl mt-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            {isLogin ? <LogIn size={80} /> : <UserPlus size={80} />}
        </div>

        <h2 className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-4 text-center">
            {isLogin ? 'Bienvenido de vuelta' : 'Paso Final'}
        </h2>
        <h1 className="text-2xl font-black text-slate-900 text-center mb-10 uppercase italic tracking-tighter leading-none">
          {isLogin ? 'Ingresar a mi Plan' : 'Crea tu cuenta Jade'}
        </h1>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-5 top-5 text-slate-300" size={20} />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className="w-full p-5 pl-14 bg-slate-50 border border-slate-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all text-sm" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-5 top-5 text-slate-300" size={20} />
            <input 
              type="password" 
              placeholder="Contraseña" 
              className="w-full p-5 pl-14 bg-slate-50 border border-slate-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all text-sm" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            disabled={loading} 
            className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? 'Procesando...' : isLogin ? 'Entrar' : 'Obtener mi Plan'}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="w-full mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors text-center"
        >
          {isLogin ? (
            <>¿No tienes cuenta? <span className="text-primary underline">Comienza aquí</span></>
          ) : (
            <>¿Ya tienes cuenta? <span className="text-primary underline">Inicia sesión</span></>
          )}
        </button>
      </main>

      <footer className="mt-auto py-10 text-slate-300 text-[10px] uppercase tracking-widest text-center px-6 italic font-medium">
        {CONFIG.FOOTER_TEXT}
      </footer>
    </div>
  );
}
