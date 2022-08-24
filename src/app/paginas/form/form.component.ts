import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cep } from 'src/app/models/cep';
import { Cliente } from 'src/app/models/cliente';
import { CepServico } from 'src/app/servicos/cep-servico';

import { ClienteServico } from '../../servicos/cliente-servico';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public cliente:Cliente = {} as Cliente
  public clientes:Cliente[] = ClienteServico.all()
  public cep:Cep|undefined = {} as Cep

  public mostrarModelo(){
    console.log(this.cliente);
  }

  public salvar() {
    ClienteServico.salvar(this.cliente);
    this.listarCLientes();
  }

  private listarCLientes() {
    this.clientes = ClienteServico.all();
  }

  public async buscarViaCep(){
    this.cep = await new CepServico(this.http).getViaCep(this.cliente.cep);
    if(this.cep){
      this.cliente.endereco = this.cep.logradouro,
      this.cliente.bairro = this.cep.bairro,
      this.cliente.cidade = this.cep.localidade,
      this.cliente.estado = this.cep.uf
    }
  }

}
