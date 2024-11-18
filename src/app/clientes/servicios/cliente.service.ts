import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../listarClientes/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlEndPoint: string = 'http://localhost:5000/api/clientes';

  constructor(private http: HttpClient){ }

  getClientes(): Observable<Cliente[]> {
    console.log("Listando clientes desde el servicio");
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<Cliente>{
    console.log("Creando cliente desde el servicio");
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }

  update(cliente: Cliente): Observable<Cliente> {
    console.log("Actualizando cliente desde el servicio", cliente);
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders });
  }

  deleteCliente(id: number): Observable<void> {
    console.log("Eliminando cliente desde el servicio");
    return this.http.delete<void>(`${this.urlEndPoint}/${id}` , { headers: this.httpHeaders });
  }

  getClienteById(id: number): Observable<Cliente> {
    console.log("Obteniendo cliente con ID: ", id);
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

}
