export const calcularPerfil = (respuestas) => {
  const P = (n) => {
    let v = respuestas[n - 1];
    if (n === 4) return (6 - v); // Pregunta invertida
    return v;
  };

  const desgaste = (P(1) + P(2) + P(3) + P(4)) / 4;
  const conexion = (P(5) + P(6) + P(7)) / 3;
  const conflicto = (P(8) + P(9)) / 2;
  const crianza = (P(10) + P(11) + P(12) + P(13)) / 4;

  if (desgaste >= 3.3 && conexion < 3.0) return "Perfil 1 (Crisis)";
  if (conexion >= 3.8 && desgaste < 2.8 && conflicto < 2.5) return "Perfil 2 (Adaptativo)";
  if (crianza >= 3.8 && desgaste >= 2.8) return "Perfil 3 (Tensión)";
  return "Perfil Mixto";
};
