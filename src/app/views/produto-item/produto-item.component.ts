import { ProdutoService } from './../../shared/services/produto.service';
import { ProdutoModel } from './../../shared/models/produto-model';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-item',
  templateUrl: './produto-item.component.html',
  styleUrls: ['./produto-item.component.scss'],
})
export class ProdutoItemComponent implements OnInit {
  produtoModel: ProdutoModel;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((data) => {
      this.produtoService.buscarProdutoPorId(data.id).subscribe((data) => {
        this.produtoModel = data;
      });
    });
  }
  getImagem(): string {
    return this.produtoModel?.avatarUrl
      ? this.produtoModel.avatarUrl
      : '../../../assets/images/sem-imagem.png';
  }
}
