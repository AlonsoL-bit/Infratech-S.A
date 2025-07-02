export interface Incidente {
  id?: number;
  tipo: string;
  area: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fecha: string;
  responsable: string;
  fechaResolucion?: string;
}
