/*
 *	Servicio para las peticiones de los productos
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PeticionesService{
	public url: string;

	constructor(
		public _http: HttpClient
	){
		// Base de la URL de la API
		this.url = 'http://localhost:3700/api';
	}
	
	/*
	 * Productos destacados
	 */
	getProductosDestacados(): Observable<any>{
		return this._http.get(this.url+'/productos-destacados');
	}
	
	/*
	 * Productos de una categoría
	 */
	getProductosCat(categoria): Observable<any>{
		return this._http.get(this.url+'/productos-categoria/'+categoria);
	}
	
	getProducto(id): Observable<any>{
		return this._http.get(this.url+'/producto/'+id);
	}
	
	/*
	 * Crear nuevo producto
	 */
	crearProducto(producto): Observable<any>{
		// Añado la imagen de manera aleatoria
		var numImagen = parseInt(Math.random() * (3 - 1) + 1);
		if(producto.categoria == 'colchones')
			producto.imagen = 'assets/img/colchon/'+numImagen+'.jpg';
		else
			producto.imagen = 'assets/img/somier/'+numImagen+'.jpg';
		
	
		let parametros = JSON.stringify(producto);
		
		let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
		
		return this._http.post(this.url+'/guardar-producto', parametros, {headers: cabeceras});
	}
	
	/*
	 * Modificar un producto
	 */
	modificarProducto(id, producto): Observable<any>{
		let parametros = JSON.stringify(producto);
		
		let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
		
		return this._http.put(this.url+'/modificar-producto/'+id, parametros, {headers: cabeceras});
	}
	
	/*
	 * Eliminar producto
	 */
	eliminarProducto(id): Observable<any>{
		return this._http.delete(this.url+'/eliminar-producto/'+id);
	}
}