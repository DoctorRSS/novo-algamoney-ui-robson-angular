import { Injectable, NgModule } from '@angular/core';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, from as observableFromPromise } from 'rxjs';

export class NotAuthenticatedError {}

@Injectable()
@NgModule({
  declarations: [],
  imports: [],
  providers: []
})
export class MoneyHttpInterceptor extends HttpClient {

    constructor(
      private auth: AuthService,
      private httpHandler: HttpHandler
      ) {
        super(httpHandler);
      }

      public delete<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
      }

      public patch<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.patch<T>(url, options));
      }

      public head<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.head<T>(url, options));
      }

      public options<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.options<T>(url, options));
      }

      public get<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.get<T>(url, options));
      }

      public post<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
      }

      public put<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
      }

      private fazerRequisicao<T>(fn: Function): Observable<T> {
        if (this.auth.isAccessTokenInvalido()) {
          console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

          const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
            .then(() => {
              if (this.auth.isAccessTokenInvalido()) {
                throw new NotAuthenticatedError();
              }

              return fn().toPromise();
            });

          return observableFromPromise(chamadaNovoAccessToken);

        } else {
          return fn();
        }
      }

 /*   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {

      return from(this.auth.obterNovoAccessToken())
          .pipe(
              mergeMap(() => {
                if (this.auth.isAccessTokenInvalido()) {
                  throw new NotAuthenticatedError();
              }
                req = req.clone({
                      setHeaders: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`
                      }
                  });
                return next.handle(req);
              })
          );
      }

      return next.handle(req);
  } */
}
