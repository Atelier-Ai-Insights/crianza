import { PERFILES } from '../constants/perfiles';

export const calcularPerfil = (respuestas) => {
  const P = (n) => {
    let v = respuestas[n - 1];
    if (n === 4) return (6 - v);
    return v;
  };

  const desgaste = (P(1) + P(2) + P(3) + P(4)) / 4;
  const conexion = (P(5) + P(6) + P(7)) / 3;
  const conflicto = (P(8) + P(9)) / 2;

  // Prioridad 1: Abrumado en Crisis
  if (desgaste >= 3.5 && conexion < 3.2) {
    return PERFILES.CRISIS;
  }

  // Prioridad 2: Adaptativo y Funcional
  if (conexion >= 3.8 && conflicto < 2.5) {
    return PERFILES.ADAPTATIVO;
  }

  // Prioridad 3: Por descarte
  return PERFILES.TENSION;
};
