import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Table } from 'primeng/table/table';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaFiltro, PessoaService } from './../pessoa.service';

import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(private pessoaService: PessoaService,
              private errorHandler: ErrorHandlerService,
              private toasty: ToastyService,
              private confirmation: ConfirmationService,
              private title: Title) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja Excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }
  excluir(pessoa: any) {

    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.grid.reset();
        this.toasty.success('Pessoa Excluida com Sucesso!');
      }).catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
