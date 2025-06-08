import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generarPDF(titulo: string, incidentes: any[]) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(titulo, 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [['Tipo', 'Área', 'Descripción', 'Estado', 'Prioridad', 'Responsable', 'Fecha']],
    body: incidentes.map(i => [
      i.tipo,
      i.area,
      i.descripcion,
      i.estado,
      i.prioridad,
      i.responsable,
      new Date(i.fecha).toLocaleString()
    ]),
    styles: { fontSize: 10 },
  });

  doc.save(`${titulo.replace(/\s+/g, '_')}.pdf`);
}
