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

  useEffect(() => { if (router.query.mode === 'signup') setIsLogin(false); }, [router.query]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) router.push('/plan'); else alert(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (!error) {
        const temp = localStorage.getItem('temp_perfil');
        await supabase.from('perfiles').insert([{ id: data.user.id, tipo_perfil: temp, test_completado: true }]);
        router.push('/plan');
      } else alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] pt-32 px-6">
      <header className="fixed top-0 left-0 w-full bg-[#111827] h-20 px-6 flex items-center justify-between z-30 shadow-md">
        <button onClick={() => router.push('/')} className="p-2 text-slate-400 hover:text-white"><ArrowLeft size={24} /></button>
        <div className="flex items-center gap-2 text-white font-bold italic"><div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">❤️</div>Sintonía</div>
        <div className="w-12 flex justify-end"><Menu /></div>
      </header>
      <main className="max-w-md mx-auto bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
        <h1 className="text-2xl font-black text-slate-900 text-center mb-10 uppercase italic tracking-tighter leading-none">{isLogin ? 'Ingresar a mi Plan' : 'Crea tu cuenta'}</h1>
        <form onSubmit={handleAuth} className="space-y-4">
          <input type="email" placeholder="Correo electrónico" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 outline-none" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 outline-none" onChange={(e) => setPassword(e.target.value)} required />
          <button disabled={loading} className="w-full bg-[#111827] text-white py-5 rounded-2xl font-bold uppercase tracking-widest shadow-lg">{loading ? 'Cargando...' : isLogin ? 'Entrar' : 'Registrarme'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-8 text-[10px] font-bold text-blue-600 uppercase tracking-widest text-center">{isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Entra'}</button>
      </main>
    </div>
  );
}
