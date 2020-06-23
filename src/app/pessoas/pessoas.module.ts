//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasRoutingModule } from './pessoas-routing.module';

import { SharedModule } from './../shared/shared.module';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';



@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    //BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,

    SharedModule,
    PessoasRoutingModule,
  ],
  exports: [],
})
export class PessoasModule { }
