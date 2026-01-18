import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

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
      else alert(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (!error) {
        // Vinculamos el perfil guardado en el test al nuevo usuario
        const tempPerfil = localStorage.getItem('temp_perfil');
        await supabase.from('perfiles').insert([{ 
          id: data.user.id, 
          tipo_perfil: tempPerfil, 
          test_completado: true 
        }]);
        localStorage.setItem('user_perfil', tempPerfil);
        router.push('/plan');
      } else alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#003366] flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl">
        <h1 className="text-2xl font-black text-[#003366] text-center mb-8 uppercase tracking-tighter">
          {isLogin ? 'Ingresar a mi Plan' : 'Crea tu cuenta para ver los resultados'}
        </h1>
        <form onSubmit={handleAuth} className="space-y-4">
          <input type="email" placeholder="Correo electrónico" className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none" onChange={(e) => setPassword(e.target.value)} required />
          <button disabled={loading} className="w-full bg-[#003366] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg">
            {loading ? 'Cargando...' : isLogin ? 'Entrar' : 'Ver mi Plan Personalizado'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-6 text-sm text-blue-600 font-bold hover:underline text-center">
          {isLogin ? '¿No tienes cuenta? Comienza el test' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
}
