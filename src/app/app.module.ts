import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/main-components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { AccountComponent } from './components/main-components/account/account.component';
import { ProductsComponent } from './components/main-components/products/products.component';
import { ProductDetailsComponent } from './components/main-components/products/product-details/product-details.component';
import { CartComponent } from './components/main-components/cart/cart.component';
import {routing} from './app.routing';
import { LoginComponent } from './components/main-components/account/login/login.component'
import { RegisterComponent } from './components/main-components/account/register/register.component'
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import{BookService}from './shared/services/book.service'
import {UserService} from './shared/services/user.service';
import { ProductPreviewComponent } from './components/main-components/products/product-preview/product-preview.component';
import { CartProductComponent } from './components/main-components/cart/cart-product/cart-product.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AccountComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    ProductPreviewComponent,
    CartProductComponent,
    
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService,BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
