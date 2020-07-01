import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {

  oauthTokenUrl: string;
  public jwtPayload: any;
 // public jwtHelper: JwtHelperService;

  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService) {
  this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
  this.carregarToken();

              }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true})
    .toPromise()
    .then(response => {
      this.armazenarToken(response.access_token);
      //this.armazenarToken(response['access_token']);
    })
    .catch(response => {
      console.log(response);
     // const responseError = response.error;
      if (response.status === 400) {
     // if (responseError.error.error === 'invalid_grant') {
      if (response.error.error === 'invalid_grant') {
        return Promise.reject('Usuário ou senha inválida!');
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

    return this.http.post<any>(this.oauthTokenUrl, body, {headers, withCredentials: true })
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
