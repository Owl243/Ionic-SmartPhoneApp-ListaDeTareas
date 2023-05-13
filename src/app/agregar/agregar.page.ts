import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../models/lista.model';
import { ListaItem } from '../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista : Lista;
  nombreItem: string ='';

  constructor( private deseosService : DeseosService,
               private route : ActivatedRoute) {

      const listaId = Number(this.route.snapshot.paramMap.get('listaId'));
      this.lista = <Lista>this.deseosService.obtenerLista(listaId);

   }

  ngOnInit() {
  }
  agregarItem(){
    if(this.nombreItem.length ===0){
      return;
    }
    const nuevoItem= new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem= '';
    this.deseosService.guardarStorage();
  }
  cambioCheck(item: ListaItem){
    const fechaAnterior = new Date(0);
    const pendientes = this.lista.items.filter(itemData => !itemData.completado ).length;
    this.deseosService.guardarStorage();
    if(pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = fechaAnterior;
      this.lista.terminada = false;
    }
    console.log(this.deseosService.listas)
  }

  borrar(i:number){
    this.lista.items.splice(i,1);
    this.deseosService.guardarStorage();
  }
}
