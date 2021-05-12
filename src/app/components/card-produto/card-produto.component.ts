import { ProdutoModel } from '../../shared/models/produto-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.scss'],
})
export class CardProdutoComponent implements OnInit {
  @Input() produto: ProdutoModel;

  constructor() {}

  ngOnInit(): void {}

  pegarAvatarUrl(): string{
    return this.produto.avatarUrl? this.produto.avatarUrl : '../../../assets/images/sem-imagem.png'
  }
}
