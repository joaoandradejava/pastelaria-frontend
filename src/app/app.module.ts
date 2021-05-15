import { AdministradorGuard } from './shared/guards/administrador.guard';
import { AutenticadoGuard } from './shared/guards/autenticado.guard';
import { AutenticacaoService } from './shared/services/autenticacao.service';
import { TokenJwtInterceptor } from './shared/interceptors/token-jwt.interceptor';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { SnackbarService } from './shared/services/snackbar.service';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { ProdutoService } from './shared/services/produto.service';
import { CategoriaService } from './shared/services/categoria.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardProdutoComponent } from './components/card-produto/card-produto.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FooterComponent } from './components/footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoItemComponent } from './views/produto-item/produto-item.component';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MudarSenhaComponent } from './components/mudar-senha/mudar-senha.component';
import { EsqueceuSenhaComponent } from './components/esqueceu-senha/esqueceu-senha.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CardProdutoComponent,
    FooterComponent,
    ProdutoItemComponent,
    CadastroClienteComponent,
    LoginComponent,
    MudarSenhaComponent,
    EsqueceuSenhaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    MatSnackBarModule,
    NgxSpinnerModule,
    MatMenuModule,
  ],
  providers: [
    CategoriaService,
    ProdutoService,
    SnackbarService,
    AutenticacaoService,
    AutenticadoGuard,
    AdministradorGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenJwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
