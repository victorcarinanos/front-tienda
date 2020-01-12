import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PeticionesService } from '../../services/peticiones.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css'],
  providers: [PeticionesService]
})
export class AdminProductosComponent implements OnInit {
	public accion: string;
	public titulo: string;
	public idProducto: number;
	public producto;
	public mensaje;
	
  	constructor(
  		private _route: ActivatedRoute,
		private _router: Router,
		private _peticionesService: PeticionesService,
  	) { 
  		this._route.params.subscribe((parametros: Params)=>{
  			// Inicializo el objecto del producto
  			this.producto = new Producto('', '', '', '', '', true);
  			
  			// Si existe ID se realizan las acciones para modificar un producto
  			if(parametros.idProducto){
  				this.accion = 'modificar';
  				this.titulo = 'Modificando producto';
  				this.idProducto = parametros.idProducto;
  				
  				// Recupero la información de la base de datos
  				this._peticionesService.getProducto(parametros.idProducto).subscribe(
					result => {
						this.producto = result.producto[0];
					},
					error => {
						console.log(error);
					}
				);
  			}
  			else{
  				this.accion = 'crear';
  				this.titulo = 'Nuevo producto';
  			}
		});	
  	}

  	ngOnInit() { }

	onSubmit(form){		
		if(this.accion == 'modificar'){
			// Actualizo la información del producto en base de datos
			this._peticionesService.modificarProducto(this.idProducto, this.producto).subscribe(
				result => {
					console.log(result);
					
					// Mostro el mensaje de confirmación
					this.mensaje = 'El producto se ha actualizado correctmanete';
				},
				error => {
					console.log(error);
				}
			);
		}
		else{
			// Creo un nuevo producto en base de datos
			this._peticionesService.crearProducto(this.producto).subscribe(
				result => {
					console.log(result);
					
					// Mostro el mensaje de confirmación
					this.mensaje = 'Se ha creado el producto correctamente';
				},
				error => {
					console.log(error);
				}
			);
		}
	}
}
