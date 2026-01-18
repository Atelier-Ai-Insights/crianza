import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { calcularPerfil } from '../utils/algoritmo';
import preguntasData from '../data/preguntas.json';

// Icono de Sintonía (puedes reemplazarlo por una imagen o SVG propio)
const SintoniaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-300">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

export default function Quiz() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const preguntas = preguntasData;
  const totalPreguntas = preguntas.length;

  // Cálculo del progreso para la barra
  const progreso = ((paso + 1) / totalPreguntas) * 100;

  const manejarRespuesta = async (valor) => {
    const nuevasRespuestas = [...respuestas, valor];
    
    // Pequeño delay para que el usuario vea la selección antes de cambiar
    setTimeout(async () => {
      if (paso < totalPreguntas - 1) {
        setRespuestas(nuevasRespuestas);
        setPaso(paso + 1);
      } else {
        // Lógica de finalización (sin cambios)
        const perfil = calcularPerfil(nuevasRespuestas);
        const { error } = await supabase.from('perfiles').insert([{ tipo_perfil: perfil, test_completado: true }]);
        if (!error) {
          localStorage.setItem('user_perfil', perfil);
          window.location.href = '/plan';
        } else {
          console.error('Error guardando perfil:', error);
          // Manejar el error visualmente si lo deseas
        }
      }
    }, 300); // 300ms de delay
  };

  // Mapeo de valores numéricos a texto para las opciones
  const opcionesTexto = {
    1: 'Nunca',
    2: 'Casi nunca',
    3: 'A veces',
    4: 'Casi siempre',
    5: 'Siempre'
  };

  // Obtenemos la respuesta seleccionada actualmente si existe
  const respuestaActual = respuestas[paso];

  return (
    <div className="min-h-screen bg-[#003366] flex flex-col font-sans">
      {/* Header con Logo y Barra de Progreso */}
      <header className="p-6 pb-10 text-white">
        <div className="flex items-center justify-center gap-2 mb-6">
          <SintoniaIcon />
          <h1 className="text-2xl font-bold tracking-wide">Sintonía</h1>
        </div>

        {/* Barra de Progreso */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-blue-200 mb-2">
            <span>Progreso</span>
            <span>{paso + 1}/{totalPreguntas}</span>
          </div>
          <div className="h-2 bg-blue-800/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500 ease-out"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Contenedor Principal de la Pregunta */}
      <main className="flex-grow px-6">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 border-4 border-blue-100/20">
          <h2 className="text-xl font-bold text-[#003366] text-center mb-8 leading-relaxed">
            {preguntas[paso].texto}
          </h2>

          {/* Opciones de Respuesta */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((valor) => (
              <button
                key={valor}
                onClick={() => manejarRespuesta(valor)}
                className={`group flex items-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                  respuestaActual === valor
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                {/* Radio Button Visual Personalizado */}
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                  respuestaActual === valor
                    ? 'border-blue-500'
                    : 'border-gray-300 group-hover:border-blue-400'
                }`}>
                  <div className={`w-3 h-3 rounded-full transition-all ${
                    respuestaActual === valor ? 'bg-blue-500 scale-100' : 'bg-transparent scale-0'
                  }`}></div>
                </div>
                
                {/* Texto de la Opción */}
                <span className={`text-lg font-medium ${
                  respuestaActual === valor ? 'text-blue-900' : 'text-gray-700'
                }`}>
                  {opcionesTexto[valor]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-blue-300 text-sm">
        <p>© 2024 Ateliê. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
