export const calcularPerfil = (respuestas) => {
  const P = (n) => {
    let valor = respuestas[n - 1];
    // Ajuste para la pregunta 4 que es positiva
    if (n === 4) return (6 - valor); 
    return valor;
  };

  // Dimensiones
  const desgaste = (P(1) + P(2) + P(3) + P(4)) / 4;
  const conexion = (P(5) + P(6) + P(7)) / 3;
  const conflicto = (P(8) + P(9)) / 2;
  const crianza = (P(10) + P(11) + P(12) + P(13)) / 4;

  // Reglas de Clasificación
  if (desgaste >= 3.3 && conexion < 3.0) return "Perfil 1 (Crisis)";
  if (conexion >= 3.8 && desgaste < 2.8 && conflicto < 2.5) return "Perfil 2 (Adaptativo)";
  if (crianza >= 3.8 && desgaste >= 2.8) return "Perfil 3 (Tensión)";
  
  return "Perfil Mixto";
};
