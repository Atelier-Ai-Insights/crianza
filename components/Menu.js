import { useState } from 'react';
import { Menu as MenuIcon, X, LogIn, Shield, HelpCircle, FileText, Info, ClipboardCheck } from 'lucide-react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const opciones = [
    { nombre: 'Test de Perfil de Crianza', link: '/', icon: <ClipboardCheck size={20} /> },
    { nombre: 'Iniciar Sesión', link: '/auth?mode=login', icon: <LogIn size={20} /> },
    { nombre: 'Política de Privacidad', link: '#', icon: <Shield size={20} /> },
    { nombre: 'Bases Conceptuales', link: '#', icon: <Info size={20} /> },
    { nombre: 'Centro de ayuda', link: '#', icon: <HelpCircle size={20} /> },
    { nombre: 'Política de Suscripción', link: '#', icon: <FileText size={20} /> },
  ];

  return (
    <>
      {/* Botón de activación del menú */}
      <button onClick={() => setIsOpen(true)} className="text-white hover:text-blue-200 transition-colors p-2 focus:outline-none">
        <MenuIcon size={28} />
      </button>

      {/* Overlay con desenfoque */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#003366]/80 z-40 backdrop-blur-md transition-opacity" onClick={() => setIsOpen(false)} />
      )}

      {/* Panel Lateral (Sidebar) */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          {/* Cabecera del menú con botón cerrar */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-[10px]">❤️</div>
              <span className="text-xs font-black text-[#003366] uppercase tracking-widest">Sintonía</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
              <X size={32} />
            </button>
          </div>

          {/* Listado de navegación */}
          <nav className="flex flex-col gap-2">
            {opciones.map((opcion, index) => (
              <a 
                key={index} 
                href={opcion.link} 
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-lg ${
                  opcion.nombre === 'Test de Perfil de Crianza' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#003366]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className={opcion.nombre === 'Test de Perfil de Crianza' ? 'text-blue-600' : 'text-blue-400'}>
                  {opcion.icon}
                </span>
                {opcion.nombre}
              </a>
            ))}
          </nav>
          
          <div className="mt-auto pt-10 border-t border-slate-100">
             <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] text-center italic">Ateliê AI • 2026</p>
          </div>
        </div>
      </div>
    </>
  );
}
