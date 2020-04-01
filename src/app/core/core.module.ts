import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';

import { ToastyModule } from 'ng2-toasty';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { NavbarComponent } from './navbar/navbar.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,

    ConfirmDialogModule,
    ToastyModule.forRoot(),
  ],
  exports: [NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
