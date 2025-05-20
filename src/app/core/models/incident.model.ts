export class Incident {
[x: string]: any;
    
}

export interface Incident {
    id: number;
    tipo: string;
    area: string;
    descripcion: string;
    estado: 'Nuevo' | 'En Proceso' | 'Resuelto';
    fechaCreacion: Date;
    fechaResolucion?: Date;
    prioridad: 'Alta' | 'Media' | 'Baja';
    responsable: string;
    tecnico: string;
    fechaActualizacion?: Date;
  }
  
