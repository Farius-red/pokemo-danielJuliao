import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import keycloakConfig from '../models/ keycloakConfig';
 // Asegúrate de importar tu configuración

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   keyCloakurl ="http://172.17.0.2:31188/realms/prueba/protocol/openid-connect/auth?client_id=security-admin-console&redirect_uri=http%3A%2F%2F172.17.0.2%3A31188%2Fadmin%2Fprueba%2Fconsole%2F&state=047dea2c-e596-41aa-885f-242c17e4bee4&response_mode=query&response_type=code&scope=openid&nonce=e264941f-a769-4885-8f53-f5d621356488&code_challenge=5MGaT8OA-6ksXD-eaesFbk-qRNdKnV8zhPO88-bH2RA&code_challenge_method=S256"
  

  constructor(private keycloakService: KeycloakService) {
    this.initializeKeycloak();
  }
  

  private async initializeKeycloak() {
    try {
      await this.keycloakService.init({
        config: keycloakConfig,
        initOptions: {
          //onLoad: 'login-required',
          checkLoginIframe: false,
          //redirectUri: window.location.origin + '/admin' // Dinámico para tu entorno local o producción
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
      });
    } catch (error) {
      console.error('Error inicializando Keycloak', error);
    }
  }
  
  public getUserInfo() {
    return this.keycloakService.loadUserProfile();
  }

  public isAuthenticated(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  public login() {
    this.keycloakService.login();
  }

  public logout() {
    this.keycloakService.logout();
  }
}
