import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ServerCookiesModule } from '@ngx-utils/cookies/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    ServerCookiesModule.forRoot(),
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
