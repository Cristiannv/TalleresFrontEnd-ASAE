import { Cliente } from './../listarClientes/cliente';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ClienteService } from '../servicios/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-actualizar',
  standalone: true,
  imports: [FormsModule, SweetAlert2Module, HttpClientModule, CommonModule],
  templateUrl: './form-actualizar.component.html',
  styleUrl: './form-actualizar.component.css'
})
export class FormActualizarComponent {
  public cliente: Cliente = new Cliente();
  public titulo: String = 'Actualizar cliente';
  public listaErrores: any ={};

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const clienteId = this.route.snapshot.paramMap.get('id');
    if (clienteId) {
      this.clienteService.getClienteById(+clienteId).subscribe(cliente =>
      {
        this.cliente = cliente;
      });
    }
  }

  public actualizarCliente(): void{
    console.log("Actualizando cliente", this.cliente);
    this.clienteService.update(this.cliente).subscribe(
      {next: (response) => {
        console.log("Cliente actualizado existosamente");
        this.router.navigate(['clientes/listarClientes']);
        Swal.fire('Cliente actualizado' , `Cliente ${response.nombre} actualizado con éxito!`, 'success');
      },
      error: (err) => {
        console.log(err.error);
        this.listaErrores = err.error;
      }}
    );
  }
}
