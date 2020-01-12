import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PeticionesService } from '../../services/peticiones.service';
import { Producto } from '../../models/producto';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [PeticionesService]
})
export class ProductoComponent implements OnInit {
	public producto: Producto;
  
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _peticionesService: PeticionesService,
		private _usuarioService: UsuarioService,
	) {
		// Recupero la información de base de datos
		this._route.params.subscribe((parametros: Params)=>{
			console.log(parametros.idProducto);
			//this.categoria = new Categoria(parametros.categoria);
			
			this._peticionesService.getProducto(parametros.idProducto).subscribe(
				result => {
					console.log(result.producto);
					this.producto = result.producto[0];
				},
				error => {
					console.log(error);
				}
			);
		});	
		
		// Información del usuario si ha hecho login
		this.usuario = this._usuarioService.getUsuario();
	}

	ngOnInit() { }

	/*
	 * Elimina el producto y redirecciona a la categoría
	 */
	eliminarProductoPorId(id, event){
		if(confirm('¿Estás seguro que quieres eliminar este producto?')){
			this._peticionesService.eliminarProducto(id).subscribe(
				result => {
					console.log(result);
					alert('El producto ha sido eliminado, será redireccionado a la categoria');
					this._router.navigate([this.producto.categoria]);	// Redirección
				},
				error => {
					console.log(error);
				}
			);	
		}
	}
}
