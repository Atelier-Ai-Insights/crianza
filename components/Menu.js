import { useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const opciones = [
    { nombre: 'Política de Privacidad', link: '#' },
    { nombre: 'Bases Conceptuales', link: '#' },
    { nombre: 'Centro de ayuda', link: '#' },
    { nombre: 'Política de Suscripción', link: '#' },
  ];

  return (
    <>
      {/* Botón de las tres líneas (Hamburguesa) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-blue-200 hover:text-white transition-colors p-2"
      >
        <MenuIcon size={28} />
      </button>

      {/* Overlay (Fondo oscuro cuando el menú está abierto) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel Lateral (Sidebar) */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          {/* Botón Cerrar */}
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900">
              <X size={32} />
            </button>
          </div>

          {/* Lista de opciones */}
          <nav className="flex flex-col gap-6">
            {opciones.map((opcion, index) => (
              <a 
                key={index} 
                href={opcion.link} 
                className="text-slate-700 font-semibold text-lg hover:text-blue-600 transition-colors border-b border-slate-50 pb-2"
                onClick={() => setIsOpen(false)}
              >
                {opcion.nombre}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
