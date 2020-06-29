import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { MoneyHttpInterceptor } from './money-http-interceptor';

@Injectable()
export class LogoutService {

  tokensRenokeUrl: string;

  constructor(
    private http: MoneyHttpInterceptor,
    private auth: AuthService
  ) {
    this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}
