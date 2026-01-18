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
      <button onClick={() => setIsOpen(true)} className="text-white hover:text-slate-300 transition-colors p-2 focus:outline-none">
        <MenuIcon size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-[#111827]/60 z-40 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white">❤️</div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest italic">Sintonía</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
              <X size={32} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {opciones.map((opcion, index) => (
              <a key={index} href={opcion.link} className="flex items-center gap-4 p-4 rounded-2xl text-slate-700 font-bold text-lg hover:bg-slate-50 transition-all" onClick={() => setIsOpen(false)}>
                <span className="text-blue-600">{opcion.icon}</span>
                {opcion.nombre}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
