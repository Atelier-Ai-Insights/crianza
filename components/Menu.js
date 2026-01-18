import { useState } from 'react';
import { Menu as MenuIcon, X, LogIn, Shield, HelpCircle, ClipboardCheck } from 'lucide-react';
import { CONFIG } from '../constants/config';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const opciones = [
    { nombre: `Test de ${CONFIG.APP_NAME}`, link: '/', icon: <ClipboardCheck size={20} /> },
    { nombre: 'Iniciar Sesión', link: '/auth?mode=login', icon: <LogIn size={20} /> },
    { nombre: 'Política de Privacidad', link: '#', icon: <Shield size={20} /> },
    { nombre: 'Centro de ayuda', link: '#', icon: <HelpCircle size={20} /> },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-white hover:opacity-80 transition-opacity p-2">
        <MenuIcon size={28} />
      </button>

      {isOpen && <div className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10 pb-6 border-b">
            <span className="text-sm font-black text-primary uppercase tracking-widest italic">{CONFIG.APP_NAME}</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900"><X size={32} /></button>
          </div>
          <nav className="flex flex-col gap-2">
            {opciones.map((op, i) => (
              <a key={i} href={op.link} className="flex items-center gap-4 p-4 rounded-2xl text-slate-700 font-bold hover:bg-slate-50 hover:text-primary transition-all">
                <span className="text-primary">{op.icon}</span> {op.nombre}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
