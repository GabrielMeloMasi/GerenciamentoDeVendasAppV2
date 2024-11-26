import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoVendasPage } from './lancamento-vendas.page';

const routes: Routes = [
  {
    path: '',
    component: LancamentoVendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentoVendasPageRoutingModule {}
