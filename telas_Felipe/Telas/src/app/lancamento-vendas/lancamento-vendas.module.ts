import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LancamentoVendasPageRoutingModule } from './lancamento-vendas-routing.module';
import { LancamentoVendasPage } from './lancamento-vendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LancamentoVendasPageRoutingModule,
  ],
  declarations: [LancamentoVendasPage]
})
export class LancamentoVendasPageModule {}
