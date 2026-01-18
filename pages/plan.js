import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import feedbackData from '../data/feedback.json'; // Importamos los textos

export default function Plan() {
  const [recursos, setRecursos] = useState([]);
  const [perfil, setPerfil] = useState('');
  const infoPerfil = feedbackData[perfil];

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
  }, [perfil]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      {infoPerfil && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-10 rounded shadow-sm">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{infoPerfil.titulo}</h1>
          <p className="text-xl font-semibold text-blue-700 mb-4">{infoPerfil.mensaje}</p>
          <p className="text-gray-700 mb-4">{infoPerfil.descripcion}</p>
          <div className="bg-white p-4 rounded border border-blue-200">
            <span className="font-bold text-blue-800">Sugerencia: </span>
            {infoPerfil.sugerencia}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Tu formación de 3 semanas</h2>
      <div className="grid gap-6">
        {recursos.length > 0 ? recursos.map(r => (
          <div key={r.id} className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-2">
              <span className="bg-blue-100 px-2 py-1 rounded">Semana {r.semana}</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">Día {r.dia}</span>
            </div>
            <h3 className="text-lg font-bold">{r.titulo}</h3>
            <p className="text-gray-600 mb-3">{r.descripcion}</p>
            <button className="text-blue-600 font-medium hover:underline">Acceder al {r.tipo_contenido} →</button>
          </div>
        )) : <p>Cargando recursos personalizados...</p>}
      </div>
    </div>
  );
}
