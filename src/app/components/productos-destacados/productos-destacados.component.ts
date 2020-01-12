import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'productos-destacados',
  templateUrl: './productos-destacados.component.html',
  styleUrls: ['./productos-destacados.component.css'],
  providers: [PeticionesService]
})
export class ProductosDestacadosComponent implements OnInit {
	public aProductos: Producto[];

	constructor(
		private _peticionesService: PeticionesService
	) {
		// Recupero los productos destacados
		this._peticionesService.getProductosDestacados().subscribe(
			result => {
				this.aProductos = result.productos
			},
			error => {
				console.log(error);
			}
		);
	}

	ngOnInit() { }

}
