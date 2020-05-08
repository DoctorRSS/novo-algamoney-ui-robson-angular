import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Pessoa } from './../core/model';
import { environment } from './../../environments/environment';

import 'rxjs/add/operator/toPromise';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`,
    { params })
    .toPromise()
    .then(response => {
      const pessoas = response['content']
      const resultado = {
        pessoas,
        total: response['totalElements']
      };
      return resultado;
    });
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise().then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
    .toPromise().then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
    .toPromise()
    .then(response => {
    return response['content'];
    });
    }

    adicionar(pessoa: Pessoa): Promise<Pessoa> {

      return this.http.post<Pessoa>(
        this.pessoasUrl, pessoa)
        .toPromise();
    }

    atualizar(pessoa: Pessoa): Promise<Pessoa> {

      return this.http.put<Pessoa>(
        `${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
        .toPromise()
        .then(response => {
          const pessoaAlterada = response as Pessoa;

          return pessoaAlterada;
        });
    }

    buscarPorCodigo(codigo: number): Promise<Pessoa> {
      return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pessoa = response as Pessoa;
        return pessoa;
      });
    }
}
