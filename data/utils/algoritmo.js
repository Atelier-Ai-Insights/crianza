const guardarResultado = async (userId, respuestas) => {
  const { perfilFinal, dimensiones } = calcularPerfil(respuestas);

  const { error } = await supabase
    .from('perfiles')
    .upsert({ 
      id: userId, 
      tipo_perfil: perfilFinal, 
      test_completado: true,
      // Opcional: guardamos los promedios por si quieres mostrar gráficas luego
      stats: dimensiones 
    });

  if (!error) {
    console.log("Usuario clasificado como:", perfilFinal);
  }
};
