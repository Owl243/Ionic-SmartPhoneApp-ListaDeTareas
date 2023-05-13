import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  implements OnInit {

  @ViewChild(IonList) lista: IonList | undefined;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router : Router,
              private alertCtrl : AlertController) {
              }

  ngOnInit() {}
  listaSeleccionada(lista: Lista){
    if (this.terminada == true){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id}`);
    }
  }
  borrarLista(lista : Lista){

    this.deseosService.borrarLista(lista);
  }
 async EditarLista(lista : Lista){
    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name : 'titulo',
          type : 'text',
          value: lista.titulo,
          placeholder : 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler : () => {
            console.log('cancelar');
            this.lista?.closeSlidingItems();
          }
        },
        {
          text:'Actualizar',
          handler : (data) => {
            console.log(data);
            this.lista?.closeSlidingItems();
            if (data.titulo.lenght === 0){
              return;
            }else{
              lista.titulo= data.titulo;
              this.deseosService.guardarStorage();
              this.lista?.closeSlidingItems();
            }
          }
        }
      ]
     })
    alert.present();
  }
}
