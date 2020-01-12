export class Usuario{	
	constructor(
		public nombre: string,
		public email: string,
		public pass: string,
		public activo: boolean,
		public admin: boolean
	){
		// Codigo del constructor
	}
}