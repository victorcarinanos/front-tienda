/*
 *	Servicio para las peticiones de los usuarios
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioService{
	public url: string;
	private usuarioRegistrado: boolean;
	public infoUsuario: Usuario;
	
	constructor(
		public _http: HttpClient
	){
		this.usuarioRegistrado = false;
		
		// Base de la URL de la API
		this.url = 'http://localhost:3700/api';
	}
	
	/*
	 * Comprueba la información del usuario en base de datos
	 * No me funcionaba por lo que finalmente opte por recuperar todos los usuarios y hacer la verificación por JS
	 */
	login(usuario): Observable<any>{		
		let parametros = JSON.stringify(usuario);
		
		let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
		
		return this._http.post(this.url+'/login', parametros, {headers: cabeceras});
	}
	
	/*
	 * Guarda en local el usuario que ha hecho login
	 */
	setUsuario(usuario: Usuario){
		this.usuarioRegistrado = true;
		this.infoUsuario = usuario;
		
		localStorage.setItem('usuario', JSON.stringify(usuario));
	}
	
	/*
	 * Recupera el usuario de la sesión
	 */
	getUsuario() {
		return JSON.parse(localStorage.getItem('usuario'));
	}
	
	/*
	 * Lista todos los usuarios que hay en la base de datos
	 */
	getUsuarios(){
		return this._http.get(this.url+'/usuarios');
	}
	
	/*
	 * Cierra sesión del usuario
	 */
	logout(usuario){
		this.usuarioRegistrado = false;
		
		localStorage.setItem('usuario', JSON.stringify(usuario));
	}
}