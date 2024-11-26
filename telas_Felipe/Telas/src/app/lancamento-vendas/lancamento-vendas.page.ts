import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lancamento-vendas',
  templateUrl: './lancamento-vendas.page.html',
  styleUrls: ['./lancamento-vendas.page.scss'],
})
export class LancamentoVendasPage {
  vendaForm: FormGroup;
  itensCompra: any[] = [];
  historicoVendas: any[] = [];

  constructor(private formBuilder: FormBuilder) { 
    this.vendaForm = this.formBuilder.group({
      nomeProduto: ['', Validators.required],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      valorUnitario: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  adicionarProduto() {
    if (this.vendaForm.valid) {
      this.itensCompra.push(this.vendaForm.value);
      this.vendaForm.reset();
    } else {
      console.error('Formulário inválido!');
    }
  }

  removerItem(item: any) {
    this.itensCompra = this.itensCompra.filter((i) => i !== item);
  }

  finalizarCompra() {
      this.historicoVendas.push([...this.itensCompra]);
      this.itensCompra = [];
      console.log('Compra finalizada: ', this.historicoVendas);
  }
}