
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';
import { PessoaCadastroContatoComponent } from './pessoa/pessoa-cadastro-contato/pessoa-cadastro-contato.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    PessoaCadastroContatoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SegurancaModule,
    AppRoutingModule
  ],
  providers: [

],
  bootstrap: [AppComponent]
})
export class AppModule { }
