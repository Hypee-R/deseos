import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  listaActiva: Lista;
  nombreItem: string = "";
  editar: ListaItem;

  constructor(
    private _deseosService: DeseosService,
    private _activatedRoute: ActivatedRoute
  ) {

    const listId = this._activatedRoute.snapshot.paramMap.get('listaId');

    this.listaActiva = this._deseosService.obtenerLista(listId);

  }

  ngOnInit() {
  }

  agregarItem(){

    if(this.nombreItem.length === 0) return;

    if(!this.editar){
      const nuevoItem = new ListaItem(this.nombreItem, false);
      this.listaActiva.items.push(nuevoItem);
    }else{
      this.listaActiva.items.
      find(item => item.descripcion === this.editar.descripcion).descripcion = this.nombreItem;
    }


    this.nombreItem = '';
    this._deseosService.guardarStorage();

  }

  cambioCheck(item: ListaItem){
    const pendientes = this.listaActiva.items.filter( itemData => !itemData.completado).length;

    if(pendientes == 0){
      this.listaActiva.terminadaEn = new Date();
      this.listaActiva.completada = true;
    }else{
      this.listaActiva.terminadaEn = null;
      this.listaActiva.completada = false;
    }

    this._deseosService.guardarStorage();
  }

  borrarItem(idx: number){

    this.listaActiva.items.splice(idx,1);

    this._deseosService.guardarStorage();
  }

  editarItem(idx: number){
    this.editar = this.listaActiva.items[idx];
    this.nombreItem = this.editar.descripcion;
  }

}
