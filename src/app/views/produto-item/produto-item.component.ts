import { ProdutoService } from './../../shared/services/produto.service';
import { ProdutoModel } from './../../shared/models/produto-model';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';

@Component({
  selector: 'app-produto-item',
  templateUrl: './produto-item.component.html',
  styleUrls: ['./produto-item.component.scss'],
})
export class ProdutoItemComponent implements OnInit {
  produtoModel: ProdutoModel;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.produtoService.buscarProdutoPorId(data.id).subscribe((data) => {
        this.produtoModel = data;
      });
    });
  }

  public adicionarNoCarrinho(): void {
    this.carrinhoService.adicionarNoCarrinho(this.produtoModel);
  }

  getImagem(): string {
    return this.produtoModel?.avatarUrl
      ? this.produtoModel.avatarUrl
      : '../../../assets/images/sem-imagem.png';
  }
}
