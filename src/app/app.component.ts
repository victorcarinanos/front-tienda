import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'front-tienda';
  	
  	/*
  	 * Muestra y oculta el menú en la versión responsive
  	 */
  	mostrarMenu(){
  		var menu = document.getElementById("menu-principal");
  		if(menu.classList.contains("visible")){
  			menu.classList.remove("visible");
  		}
  		else{
  			menu.classList.add("visible");
  		}
  	}
}
