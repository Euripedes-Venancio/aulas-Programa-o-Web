import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vitrine',
  imports: [CommonModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine {
  lista: Produto[] = [{
    "codigo": 1,
    "nome": "Pastel de Flango",
    "descritivo": "Delicioso pastel de Flango, pode ter catupiri ou não de acordo com o desejo do cliente. Na falta de flango usamos pombo",
    "valor": 12,
    "quantidade":50,
    "keywords": "flango, pombo, pastel",
},
{
    "codigo":2,
    "nome":"Pastel de carne",
    "descritivo":"Classico pastel de carne, feito com as mais deliciosas carnes de boi, vaca, cachorro e capivara",
    "valor":11,
    "quantidade":30,
    "keywords":"pastel, carne, cachorro, boi, capivara",

},
{
    "codigo":3,
    "nome":"Pastel especial ",
    "descritivo":"Magnifico pastel!!!, receita de familia, contem carne de rato ou gambá, queijo de bufala, e uns matinhos do quintal do chef",
    "valor":20,
    "quantidade":5,
    "keywords":"pastel, especial, gamba, rato, queijo",

},
{
    "codigo":4,
    "nome":"Pastel de Goiaba",
    "descritivo":"Delicioso pastel de goiaba, exclusivo para moradores de São Bernardo. Feito de massa de pastel e goiaba sem conservantes ou açucar",
    "valor":30,
    "quantidade":15,
    "keywords":"pastel, goiaba, São Bernardo,",

},
{
    "codigo":5,
    "nome":"Caldo de Cana",
    "descritivo":"Caldo de cana feito da plantação de cana de açucar clandestina do chef. ",
    "valor":7,
    "quantidade":10,
    "keywords":"caldo de cana",
}]
}
