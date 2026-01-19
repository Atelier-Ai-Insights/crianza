// utils/pdfGenerator.js
import { jsPDF } from "jspdf";

export const generarPdfJade = (perfil, info, email) => {
  const doc = new jsPDF();
  const verdeJade = "#2D6A4F";
  const grisOscuro = "#334155";
  const grisClaro = "#64748B";

  // --- Encabezado ---
  doc.setFillColor(verdeJade);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("JADE-HEALTH", 20, 25);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Resumen Personalizado de Bienestar Parental", 20, 32);

  // --- Información del Perfil ---
  doc.setTextColor(grisOscuro);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(info.titulo.toUpperCase(), 20, 60);

  doc.setFontSize(12);
  doc.setTextColor(verdeJade);
  doc.text(`Estado: ${info.estado}`, 20, 70);

  // --- Mensaje Principal ---
  doc.setTextColor(grisOscuro);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const mensajeSplit = doc.splitTextToSize(info.mensaje, 170);
  doc.text(mensajeSplit, 20, 85);

  // --- Sección de Consejos Prácticos ---
  let yPos = 130;
  doc.setDrawColor(verdeJade);
  doc.setLineWidth(0.5);
  doc.line(20, yPos - 5, 190, yPos - 10); // Línea divisoria

  doc.setTextColor(verdeJade);
  doc.setFont("helvetica", "bold");
  doc.text("CONSEJOS PRÁCTICOS PARA TU DÍA A DÍA:", 20, yPos);
  
  yPos += 10;
  doc.setTextColor(grisOscuro);
  doc.setFont("helvetica", "normal");

  info.recomendaciones.forEach((rec, index) => {
    const recSplit = doc.splitTextToSize(`${index + 1}. ${rec}`, 160);
    doc.text(recSplit, 25, yPos);
    yPos += (recSplit.length * 7);
  });

  // --- Pie de página ---
  doc.setFontSize(9);
  doc.setTextColor(grisClaro);
  doc.text(`Este documento fue generado para: ${email}`, 20, 280);
  doc.text("Jade-Health © 2025 - Atelier Consultoría y Estrategia S.A.S", 20, 285);

  // Descarga automática
  doc.save(`Jade_Health_Plan_${perfil.replace(/\s+/g, '_')}.pdf`);
};
