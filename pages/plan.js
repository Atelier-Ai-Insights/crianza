import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import feedbackData from '../data/feedback.json';

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
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header con el Perfil */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pb-20 pt-12 px-6 rounded-b-[3rem] shadow-lg">
        <div className="max-w-4xl mx-auto">
          {infoPerfil && (
            <>
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Resultado de tu Test
              </span>
              <h1 className="text-4xl font-extrabold mt-4 mb-2">{infoPerfil.titulo}</h1>
              <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                {infoPerfil.mensaje}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-4xl mx-auto px-6 -mt-12">
        {/* Card de Sugerencia */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-50 mb-12">
          <h3 className="text-indigo-900 font-bold text-xl mb-3">Recomendación para ti</h3>
          <p className="text-slate-600 leading-relaxed italic">
            "{infoPerfil?.sugerencia}"
          </p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <span className="bg-indigo-600 w-2 h-8 rounded-full"></span>
          Tu Ruta de Formación (3 Semanas)
        </h2>

        {/* Lista de Recursos en Grid */}
        <div className="grid gap-6">
          {recursos.map((r) => (
            <div key={r.id} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="bg-indigo-50 text-indigo-600 w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <span className="text-xs font-bold uppercase">Sem</span>
                <span className="text-2xl font-black">{r.semana}</span>
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">Día {r.dia}</span>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">{r.tipo_contenido}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{r.titulo}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{r.descripcion}</p>
              </div>

              <a 
                href={r.url_recurso} 
                className="w-full md:w-auto text-center bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-sm"
              >
                Comenzar
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
