import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

import { NgxCurrencyModule } from 'ngx-currency';

import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    NgxCurrencyModule,
    CommonModule,

    SharedModule
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
})
export class LancamentosModule { }
