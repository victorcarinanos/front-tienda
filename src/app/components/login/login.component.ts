import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Login } from '../../models/login';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	private email = 'admin@admin.es';
	private pass = 'abc123';
	public login: Login;
	public usuario: Usuario;
	public mensajeError: string;
	public aUsuarios;
  
	constructor(private _usuarioService: UsuarioService) {
		// Inicializo el modelo del formulario de login
		this.login = new Login('', '');
		
		// Recupera el listado de usuarios de base de datos
		this._usuarioService.getUsuarios().subscribe(
			result => {
				this.aUsuarios = result.usuarios;
			},
			error => {
				console.log(error);
			}
		);
			
		// Recupero la información del usuario si ha iniciado sesión
		this.usuario = this._usuarioService.getUsuario();
	}

	ngOnInit() { }

	/*
	 *	Submit del formulario para hacer login
	 */
	onSubmit( formulario ){
		// Buscp el email en el array de usuarios
		var infoUsuario = this.aUsuarios.find(x => x.email === this.login.email);
	
		// Si existe y la contraseña es correcta login
		if((infoUsuario) && (this.login.pass == infoUsuario.pass)){
			console.log('----Form enviado');
			console.log(this.login);
			
			this.usuario = new Usuario(infoUsuario.nombre, infoUsuario.email, infoUsuario.pass, true, infoUsuario.admin);
			this._usuarioService.setUsuario(this.usuario);
		}
		else{
			// Mensaje de error
			this.mensajeError = "Error, el usuario y/o la contraseña es incorrecto";
		}
	}
	
	/*
	 *	Función para cerrar sesión
	 */
	logout(){
		// Borro la información guarda en sesión
		this.usuario = new Usuario('', '', '', true, false);
		this._usuarioService.logout(this.usuario);
		
		// Le paso null al valor usuario para mostrar de nuevo el form de login
		this.usuario = null;
	}
}