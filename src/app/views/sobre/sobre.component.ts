import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {


  habilidades = [
    {nome: 'HTML5', avatarUrl: '../../../assets/images/html.png'},
    {nome: 'CSS3', avatarUrl: '../../../assets/images/css.png'},
    {nome: 'JAVASCRIPT', avatarUrl: '../../../assets/images/js.png'},
    {nome: 'Java', avatarUrl: '../../../assets/images/java.png'},
    {nome: 'Spring', avatarUrl: '../../../assets/images/spring.png'},
    {nome: 'Angular', avatarUrl: '../../../assets/images/angular.png'},
    {nome: 'Typescript', avatarUrl: '../../../assets/images/typescript.png'},
    {nome: 'Ionic', avatarUrl: '../../../assets/images/ionic.png'},
    {nome: 'Flutter', avatarUrl: '../../../assets/images/flutter.png'},
    {nome: 'Postgres', avatarUrl: '../../../assets/images/postgres.png'},

  ]


  constructor() { }

  ngOnInit(): void {
  }

}
