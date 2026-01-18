import { useState } from 'react';
import { Menu as MenuIcon, X, LogIn, Shield, HelpCircle, FileText, Info } from 'lucide-react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const opciones = [
    { nombre: 'Iniciar Sesión', link: '/auth?mode=login', icon: <LogIn size={20} /> },
    { nombre: 'Política de Privacidad', link: '#', icon: <Shield size={20} /> },
    { nombre: 'Bases Conceptuales', link: '#', icon: <Info size={20} /> },
    { nombre: 'Centro de ayuda', link: '#', icon: <HelpCircle size={20} /> },
    { nombre: 'Política de Suscripción', link: '#', icon: <FileText size={20} /> },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-white hover:text-blue-200 transition-colors p-2">
        <MenuIcon size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-sintonia-dark/80 z-40 backdrop-blur-md transition-opacity" onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-end mb-10">
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
              <X size={32} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {opciones.map((opcion, index) => (
              <a 
                key={index} 
                href={opcion.link} 
                className="flex items-center gap-4 text-slate-700 font-bold text-lg p-4 rounded-2xl hover:bg-blue-50 hover:text-[#003366] transition-all"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-blue-500">{opcion.icon}</span>
                {opcion.nombre}
              </a>
            ))}
          </nav>
          
          <div className="mt-auto pt-10 border-t border-slate-100">
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest text-center">Ateliê AI • Sintonía 2026</p>
          </div>
        </div>
      </div>
    </>
  );
}
