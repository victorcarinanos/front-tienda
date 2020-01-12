import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PeticionesService } from '../../services/peticiones.service';
import { Categoria } from '../../models/categoria';
import { Producto } from '../../models/producto';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  providers: [PeticionesService]
})
export class CategoriaComponent implements OnInit {
	public categoria: Categoria;
	public aProductos: Producto[];
	public usuario: Usuario;
	public paginaActual = 1;
    
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService,
		private _peticionesService: PeticionesService
	) {		
		// Cargo los productos de la categoria		
		this._route.params.subscribe((parametros: Params)=>{
			this.categoria = new Categoria(parametros.categoria);
			
			this._peticionesService.getProductosCat(parametros.categoria).subscribe(
				result => {
					this.aProductos = result.productos
				},
				error => {
					console.log(error);
				}
			);
		});
		
		// Recupero el usuario si ha hecho login
		this.usuario = this._usuarioService.getUsuario();
	}

	ngOnInit() { }

	/*
	 * Elimina el producto del listado
	 */
	eliminarProductoPorId(id, event){
		// Muestro un mensaje de verificación
		if(confirm('¿Estás seguro que quieres eliminar este producto?')){
			this._peticionesService.eliminarProducto(id).subscribe(
				result => {
					console.log(result);
					
					// Elimino el producto del listado
					event.path[2].remove();
				},
				error => {
					console.log(error);
				}
			);	
		}
	}
}
