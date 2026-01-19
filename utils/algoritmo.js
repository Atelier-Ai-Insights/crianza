import { PERFILES } from '../constants/perfiles';

/**
 * Algoritmo de Clasificación Jerárquica JadeEdu
 * @param {Array} respuestas - Arreglo de 13 números (escala 1-5)
 */
export const calcularPerfil = (respuestas) => {
  // Función auxiliar para obtener el valor del ítem (1-indexed)
  // Maneja automáticamente la inversión del ítem 4 (ganas de aprender)
  const P = (n) => {
    let v = respuestas[n - 1];
    if (n === 4) return (6 - v); // Inversión: 1->5, 5->1
    return v;
  };

  // Cálculo de Factores (Dimensiones)
  const desgaste = (P(1) + P(2) + P(3) + P(4)) / 4; // Factor N en Excel
  const conexion = (P(5) + P(6) + P(7)) / 3;       // Factor O en Excel
  const conflicto = (P(8) + P(9)) / 2;             // Factor P en Excel
  const crianza = (P(10) + P(11) + P(12) + P(13)) / 4; // Factor Q en Excel (opcional para gráficas)

  // Algoritmo de Clasificación Jerárquica (Prioridad según investigación)
  
  // 1. Abrumado en Crisis (Prioridad absoluta)
  if (desgaste >= 3.5 && conexion < 3.2) {
    return PERFILES.CRISIS;
  }

  // 2. Adaptativo y Funcional
  if (conexion >= 3.8 && conflicto < 2.5) {
    return PERFILES.ADAPTATIVO;
  }

  // 3. Crianza Positiva en Tensión (Por descarte / 100% de cobertura)
  return PERFILES.TENSION;
};
