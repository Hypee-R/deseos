import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) listaIon: IonList;

  @Input() _terminada = true;
  @Output() _editarNombre = new EventEmitter<Lista>();

  constructor(
    public _deseosServices: DeseosService,
    private _router: Router,
    private _alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista){

    if( this._terminada ){
      this._router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this._router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

  }

  async editarNombre(lista: Lista){
    const alert = await this._alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { this.listaIon.closeSlidingItems(); }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {

            if(data.titulo.length === 0){
              return;
            }

            lista.titulo = data.titulo;
            this._deseosServices.guardarStorage();
            this.listaIon.closeSlidingItems();

          }
        }
      ]
    });

    alert.present();
  }

  borrarLista(lista: Lista){

    this._deseosServices.borrarLista(lista);
    this._deseosServices.guardarStorage();

  }

}
