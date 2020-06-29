import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
//import { Table } from 'primeng/table/table';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  //@ViewChild('tabela', {static: true}) grid: Table;
  @ViewChild('tabela', {static: true}) grid;

  constructor(
    private lancamentoService: LancamentoService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title ){

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja Excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }
  excluir(lancamento: any) {

    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
       // this.grid.reset();
       if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }
       this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' });
      }).catch(erro => this.errorHandler.handle(erro));
  }
}
