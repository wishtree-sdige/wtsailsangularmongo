import { enableProdMode } from '@angular/core';

import { environment } from 'assets/app/environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from 'assets/app/app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
