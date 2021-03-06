import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { Pessoa, Estado, Cidade } from './../core/model';
import { environment } from './../../environments/environment';
import { MoneyHttpInterceptor } from '../seguranca/money-http-interceptor';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: MoneyHttpInterceptor) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.pessoasUrl}`,
    { params })
    .toPromise()
    .then(response => {
     // const pessoas = response['content']
     const pessoas = response.content;
     const resultado = {
        pessoas,
       // total: response['totalElements']
       total: response.totalElements
      };
     return resultado;
    });
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise().then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers})
    .toPromise().then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.pessoasUrl)
    .toPromise()
    .then(response => response.content
      // {
    //return response['content'];
    //}
    );
    }

    adicionar(pessoa: Pessoa): Promise<Pessoa> {

      return this.http.post<Pessoa>(
        this.pessoasUrl, pessoa)
        .toPromise();
    }

    atualizar(pessoa: Pessoa): Promise<Pessoa> {

      return this.http.put<Pessoa>(
        `${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
        .toPromise();
        /*.then(response => {
          const pessoaAlterada = response as Pessoa;

          return pessoaAlterada;
        });*/
    }

    buscarPorCodigo(codigo: number): Promise<Pessoa> {
      return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
      /*.then(response => {
        const pessoa = response as Pessoa;
        return pessoa;
      });*/
    }

    listarEstados(): Promise<Estado[]> {
    /*  return this.http.get(this.estadosUrl).toPromise()*/
      return this.http.get<Estado[]>(this.estadosUrl).toPromise();
      /*  .then(response => {
          return response['content'];
        });*/
    }

    pesquisarCidades(estado): Promise<Cidade[]> {
      let params = new HttpParams();
      params = params.append('estado', estado);
      return this.http.get<Cidade[]>(this.cidadesUrl, { params})
          .toPromise();
          //.then(response => response as Cidade[]);
    }
}
