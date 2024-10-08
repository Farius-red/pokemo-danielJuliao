import { KeycloakService } from 'keycloak-angular';
import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
    url: 'http://172.17.0.2:31188',  // URL base de tu servidor Keycloak
    realm: 'prueba',                      // Nombre de tu realm
    clientId: 'prueba',          // Nombre de tu cliente (cliente registrado en Keycloak)
};
export function initializeKeycloak(keycloak: KeycloakService) {
    try {
         keycloak.init({
          config: keycloakConfig,
          initOptions: {
            onLoad: 'check-sso',
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



export default keycloakConfig;
