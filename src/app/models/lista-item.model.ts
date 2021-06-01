export class ListaItem {

  descripcion: string;
  completado: boolean;

  constructor(desc: string, comp: boolean){
    this.descripcion = desc;
    this.completado = comp;
  }

}
