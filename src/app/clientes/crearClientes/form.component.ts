import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import { Cliente } from '../listarClientes/cliente';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from '../servicios/cliente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, SweetAlert2Module, HttpClientModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";
  public listaErrores: any ={};

  constructor(private clienteService: ClienteService, private router: Router) {}

  public crearCliente(){
    console.log("Creando cliente");
    this.clienteService.create(this.cliente).subscribe(
      {
        next: (response) => {
          console.log("Cliente creado exitosamente");
          console.log(this.cliente);
          this.router.navigate(['/clientes/listarClientes']),
          Swal.fire('Nuevo cliente', `Cliente ${response.nombre} creado con éxito`, 'success')
        },
        error: (err) => {
          console.log(err.error);
          this.listaErrores = err.error;
        }
      }
    )
  }
}
