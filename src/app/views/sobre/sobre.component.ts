import { TecnologiaUtilizada } from './tecnologia-utilizada';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
})
export class SobreComponent implements OnInit {
  habilidades = [
    { nome: 'HTML5', avatarUrl: '../../../assets/images/html.png' },
    { nome: 'CSS3', avatarUrl: '../../../assets/images/css.png' },
    { nome: 'JAVASCRIPT', avatarUrl: '../../../assets/images/js.png' },
    { nome: 'Java', avatarUrl: '../../../assets/images/java.png' },
    { nome: 'Spring', avatarUrl: '../../../assets/images/spring.png' },
    { nome: 'Angular', avatarUrl: '../../../assets/images/angular.png' },
    { nome: 'Typescript', avatarUrl: '../../../assets/images/typescript.png' },
    { nome: 'Ionic', avatarUrl: '../../../assets/images/ionic.png' },
    { nome: 'Flutter', avatarUrl: '../../../assets/images/flutter.png' },
    { nome: 'Postgres', avatarUrl: '../../../assets/images/postgres.png' },
  ];

  tecnologiasUtilizadaNoProjeto: TecnologiaUtilizada[] = [
    {
      titulo: 'Front-end',
      css: 'frontend',
      tecnologias: [
        { nome: 'HTML5' },
        { nome: 'CSS3' },
        { nome: 'JAVASCRIPT' },
        { nome: 'Angular' },
        { nome: 'Typescript' },
      ],
    },
    {
      titulo: 'Back-end',
      css: 'backend',
      tecnologias: [{ nome: 'Java' }, { nome: 'Spring' }],
    },
    {
      titulo: 'Banco de dados',
      css: 'bancodedados',
      tecnologias: [{ nome: 'Postgres' }],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
