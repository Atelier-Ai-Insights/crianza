import { useState } from 'react';
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

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = isLogin 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    
    if (!error) router.push('/plan');
    else alert(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white pt-32 px-6 flex flex-col items-center">
      <header className="fixed top-0 left-0 w-full bg-sintonia-dark h-20 px-6 flex items-center justify-between z-30 shadow-md">
        <button onClick={() => router.push('/')} className="p-2 text-white/70"><ArrowLeft size={24} /></button>
        <div className="flex items-center gap-2 text-white font-bold italic">Sintonía</div>
        <div className="w-12 flex justify-end"><Menu /></div>
      </header>
      <main className="max-w-md w-full bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl mt-12">
        <h1 className="text-2xl font-black text-slate-900 text-center mb-10 uppercase italic">{isLogin ? 'Ingresar' : 'Crear Cuenta'}</h1>
        <form onSubmit={handleAuth} className="space-y-4">
          <input type="email" placeholder="Correo" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary" onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-hover shadow-lg">{loading ? '...' : isLogin ? 'Entrar' : 'Registrarme'}</button>
        </form>
      </main>
    </div>
  );
}
