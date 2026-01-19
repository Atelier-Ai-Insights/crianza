export const calcularPerfil = (respuestas) => {
  // Función auxiliar para obtener el valor del ítem (1-indexed)
  // Maneja automáticamente la inversión del ítem 4
  const P = (n) => {
    let v = respuestas[n - 1];
    if (n === 4) return (6 - v); // Inversión: 1->5, 2->4, 3->3, 4->2, 5->1
    return v;
  };

  // 1. Cálculo de Factores (Dimensiones)
  const desgaste = (P(1) + P(2) + P(3) + P(4)) / 4;
  const conexion = (P(5) + P(6) + P(7)) / 3;
  const conflicto = (P(8) + P(9)) / 2;
  const crianza = (P(10) + P(11) + P(12) + P(13)) / 4;

  // 2. Algoritmo de Clasificación Jerárquica
  
  // Prioridad 1: Abrumado en Crisis
  if (desgaste >= 3.5 && conexion < 3.2) {
    return "Abrumado en Crisis";
  }

  // Prioridad 2: Adaptativo y Funcional
  if (conexion >= 3.8 && conflicto < 2.5) {
    return "Adaptativo y Funcional";
  }

  // Prioridad 3: Por descarte (Asegura el 100% de clasificación)
  return "Crianza Positiva en Tensión";
};
