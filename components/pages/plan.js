import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Plan() {
  const [recursos, setRecursos] = useState([]);
  const [perfil, setPerfil] = useState('');

  useEffect(() => {
    const p = localStorage.getItem('user_perfil');
    setPerfil(p);
    async function load() {
      const { data } = await supabase
        .from('recursos_formacion')
        .select('*')
        .eq('perfil_objetivo', p)
        .order('semana', { ascending: true });
      setRecursos(data || []);
    }
    load();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Tu Plan para el {perfil}</h1>
      <div className="grid gap-4 mt-6">
        {recursos.map(r => (
          <div key={r.id} className="p-4 border rounded">
            <h3>Semana {r.semana} - Día {r.dia}: {r.titulo}</h3>
            <p>{r.descripcion}</p>
            <a href={r.url_recurso} className="text-blue-600 underline">Ver Recurso</a>
          </div>
        ))}
      </div>
    </div>
  );
}
