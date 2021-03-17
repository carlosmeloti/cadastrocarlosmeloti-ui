
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Cadastro } from 'src/app/core/model';


export class CadastroFiltro {
  cpf: any;
  
}


@Injectable()
export class CadastroService {

  cadastrourl = 'http://localhost:8082/cadastro';

  constructor(private http: Http) { }


  pesquisar(filtro: CadastroFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', btoa("admin" + ':' + "admin"));

   

    if (filtro.cpf) {
      params.set('cpf', filtro.cpf);
    }

    return this.http.get(`${this.cadastrourl}`, {search: filtro })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const cadastro = responseJson;

        const resultado = {
          cadastro,
          total: responseJson.totalElements
        };
        return resultado;
      })

  };


  excluir(cpf: number): Promise<void> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=' + btoa("admin" + ':' + "admin"));

    return this.http.delete(`${this.cadastrourl}/${cpf}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(cadastro: Cadastro): Promise<Cadastro> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=' + btoa("admin" + ':' + "admin"));
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.cadastrourl, JSON.stringify(cadastro), { headers })
      .toPromise()
      .then(response => response.json());
  }



  listarTodas(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=' + btoa("admin" + ':' + "admin"));
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.cadastrourl, { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(cadastro: Cadastro): Promise<Cadastro> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.cadastrourl}/${cadastro.cpf}`,
      JSON.stringify(cadastro), { headers })
      .toPromise()
      .then(response => {
        const cadastroAlterado = response.json() as Cadastro;


        return cadastroAlterado;
      });
  }

  buscarPorCodigo(cpf: number): Promise<Cadastro> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.cadastrourl}/${cpf}`, { headers })
      .toPromise()
      .then(response => {
        const cad = response.json() as Cadastro;

        return cad;
      });
  }

}
