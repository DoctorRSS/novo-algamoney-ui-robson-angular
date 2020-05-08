import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  public jwtPayload: any;
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient
              //private jwtHelper: JwtHelperService
              ) {
  this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
  this.carregarToken();

              }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true})
    .toPromise()
    .then(response => {
      this.armazenarToken(response['access_token']);
    })
    .catch(response => {
      const responseError = response.error;
      if (response.status === 400) {
      if (responseError.error === 'invalid_grant') {
        return Promise.reject('Usuário ou senha inválida');
      }
    }
      return Promise.reject(response);
    });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);

  }

  temQualquerPermissao(roles) {

    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  public temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true })
    .toPromise()
    .then(response => {
      this.armazenarToken(response['access_token']);
      console.log('Novo access token criado!');
      return Promise.resolve(null);
    })
    .catch(response => {
      console.error('Erro ao renovar token.', response);
      return Promise.resolve(null);
    });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}

@Injectable()
export class MoneyHttpInterceptor {

    constructor(private auth: AuthService) {}
}

@Injectable()
export class LogoutService {

  //tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';
  tokensRevokeUrl: string;
    constructor(
      private http: HttpClient,
      private auth: AuthService) {
        this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
      }

      logout() {
        return this.http.delete(this.tokensRevokeUrl, {withCredentials: true })
        .toPromise()
        .then(() => {
          this.auth.limparAccessToken();
        });
      }
}
