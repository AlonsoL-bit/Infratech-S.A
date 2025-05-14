import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../core/services/task.service';


@Component({
  selector: 'app-incident-form',
  standalone: true,
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule]
})
export class IncidentFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private taskService: TaskService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      area: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      estado: ['Nuevo'],
      prioridad: ['', Validators.required],
      responsable: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.form.valid) {
    const nuevoIncidente = {
      ...this.form.value,
      fechaCreacion: new Date() 
    };

    this.taskService.agregarIncidente(nuevoIncidente);

    this.snackBar.open('Incidente registrado correctamente', 'Cerrar', {
      duration: 3000
    });

    this.form.reset();
  } else {
    this.snackBar.open('Formulario inválido. Revisa los campos.', 'Cerrar', {
      duration: 3000
    });
  }
}
}

