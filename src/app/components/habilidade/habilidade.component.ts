import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-habilidade',
  templateUrl: './habilidade.component.html',
  styleUrls: ['./habilidade.component.scss'],
})
export class HabilidadeComponent implements OnInit {
  @Input() nomeHabilidade: string;
  @Input() avatarUrl: string;

  constructor() {}

  ngOnInit(): void {}
}
