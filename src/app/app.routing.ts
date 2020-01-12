// Importar módulos del router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar los componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { AdminProductosComponent } from './components/admin-productos/admin-productos.component';

// Array con la configuración de las rutas
const appRoutes: Routes = [
	{path: 'inicio', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'nuevo-producto', component: AdminProductosComponent},
	{path: 'modificar-producto/:idProducto', component: AdminProductosComponent},
	{path: ':categoria', component: CategoriaComponent},
	{path: ':categoria/:idProducto', component: ProductoComponent},
	{path: '**', component: HomeComponent}	//404
];

// Exportar el módulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);