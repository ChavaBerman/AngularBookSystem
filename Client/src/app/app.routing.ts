import { HomeComponent } from './components/main-components/home/home.component';
import { AccountComponent } from './components/main-components/account/account.component';
import { ProductsComponent } from './components/main-components/products/products.component';
import { ProductDetailsComponent } from './components/main-components/products/product-details/product-details.component';
import { CartComponent } from './components/main-components/cart/cart.component';
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './shared/auth.guard'
import { LoginComponent } from './components/main-components/account/login/login.component'
import { RegisterComponent } from './components/main-components/account/register/register.component'
import { ProductPreviewComponent } from './components/main-components/products/product-preview/product-preview.component';

const routes: Routes = [
    { path: 'Book-Store/home', component: HomeComponent },
    {
        path: 'Book-Store/account', component: AccountComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: 'Book-Store/products', component: ProductsComponent, children: [
            { path: 'product-preview', component: ProductPreviewComponent },
        ]
    },
    { path: 'Book-Store/product-details', component: ProductDetailsComponent },
    { path: 'Book-Store/cart', component: CartComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'Book-Store/home' }
];
export const routing = RouterModule.forRoot(routes);

