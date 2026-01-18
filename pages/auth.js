import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { ArrowLeft } from 'lucide-react';

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
      if (!error) {
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
    <div className="min-h-screen bg-[#003366] flex flex-col items-center pt-24 px-6">
      {/* Header Superior Consistente */}
      <header className="fixed top-0 left-0 w-full bg-[#002855] h-20 px-6 flex items-center justify-between z-30 shadow-xl border-b border-white/5">
        <div className="w-12">
          <button onClick={() => router.push('/')} className="p-2 text-white hover:bg-white/10 rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-sm shadow-lg">❤️</div>
          <h1 className="text-xl font-black tracking-widest uppercase text-white italic">Sintonía</h1>
        </div>
        <div className="w-12 flex justify-end">
          <Menu />
        </div>
      </header>

      {/* Card de Autenticación */}
      <main className="w-full max-w-md mt-8">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-b-[10px] border-blue-500">
          <h1 className="text-2xl font-black text-[#003366] text-center mb-10 uppercase tracking-tighter leading-tight">
            {isLogin ? 'Ingresar a mi Plan' : 'Crea tu cuenta para ver los resultados'}
          </h1>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1">
              <input 
                type="email" 
                placeholder="Correo electrónico" 
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700" 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-1">
              <input 
                type="password" 
                placeholder="Contraseña" 
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            <button 
              disabled={loading} 
              className="w-full bg-[#003366] text-white py-5 rounded-[1.8rem] font-black uppercase tracking-widest shadow-xl hover:bg-blue-800 transition-all mt-4 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Cargando...' : isLogin ? 'Entrar' : 'Registrarme'}
            </button>
          </form>

          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="w-full mt-8 text-xs text-blue-600 font-black uppercase tracking-widest hover:underline text-center"
          >
            {isLogin ? '¿No tienes cuenta? Comienza el test' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </main>

      <footer className="mt-auto py-10 text-blue-300 text-[10px] uppercase tracking-[0.4em] font-black opacity-30 italic">
        Sintonía • Ateliê AI • 2026
      </footer>
    </div>
  );
}
