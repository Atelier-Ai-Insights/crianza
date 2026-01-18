import { useState } from 'react';
import { Menu as MenuIcon, X, LogIn, Shield, HelpCircle, FileText, Info, ClipboardCheck } from 'lucide-react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const opciones = [
    { nombre: 'Test de Perfil', link: '/', icon: <ClipboardCheck size={20} /> },
    { nombre: 'Iniciar Sesión', link: '/auth?mode=login', icon: <LogIn size={20} /> },
    { nombre: 'Privacidad', link: '#', icon: <Shield size={20} /> },
    { nombre: 'Bases Conceptuales', link: '#', icon: <Info size={20} /> },
    { nombre: 'Centro de Ayuda', link: '#', icon: <HelpCircle size={20} /> },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-white hover:opacity-80 transition-opacity p-2 focus:outline-none">
        <MenuIcon size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10 border-b pb-6">
            <span className="text-sm font-black text-[#4063B0] uppercase tracking-widest italic">Sintonía</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900"><X size={32} /></button>
          </div>

          <nav className="flex flex-col gap-2">
            {opciones.map((op, i) => (
              <a key={i} href={op.link} className="flex items-center gap-4 p-4 rounded-2xl text-slate-700 font-bold hover:bg-slate-50 transition-all">
                <span className="text-[#4063B0]">{op.icon}</span> {op.nombre}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
