import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorage } from './services/token.storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/app.interceptor';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService,
              AuthService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: Interceptor,
                multi: true
              },
              TokenStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
