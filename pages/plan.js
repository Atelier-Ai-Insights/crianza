import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import feedbackData from '../data/feedback.json';

export default function Plan() {
  const [recursos, setRecursos] = useState([]);
  const [perfil, setPerfil] = useState('');
  const info = feedbackData[perfil];

  useEffect(() => {
    const p = localStorage.getItem('user_perfil');
    setPerfil(p);
    async function load() {
      const { data } = await supabase.from('recursos_formacion').select('*').eq('perfil_objetivo', p);
      setRecursos(data || []);
    }
    load();
  }, [perfil]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8 border-t-8 border-blue-600">
          <h1 className="text-3xl font-black text-[#003366] mb-4">{info?.titulo}</h1>
          <p className="text-slate-600 leading-relaxed mb-6">{info?.descripcion}</p>
          <div className="bg-blue-50 p-4 rounded-xl text-blue-800 font-medium text-sm italic">
            " {info?.sugerencia} "
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-6 text-slate-800">Tu formación de 3 semanas</h2>
        <div className="space-y-4">
          {recursos.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-blue-500 uppercase">Semana {r.semana} • Día {r.dia}</span>
                <h3 className="font-bold text-lg text-slate-800">{r.titulo}</h3>
              </div>
              <a href={r.url_recurso} className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-bold">Ver</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
