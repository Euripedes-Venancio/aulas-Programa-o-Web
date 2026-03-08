import { Routes } from '@angular/router';
import {Vitrine} from './vitrine/vitrine';
import {Contato} from './contato/contato';
import {Cadastro} from './cadastro/cadastro';
import {Login} from './login/login';
import {Cesta} from './cesta/cesta';
import {Pesquisa} from './pesquisa/pesquisa';
import {ReenviaSenha} from './reenvia-senha/reenvia-senha';
import {Homepage} from './homepage/homepage';
import { Z_FULL_FLUSH } from 'zlib';


export const routes: Routes = [
{path: 'vitrine' , component: Vitrine},
{path: 'contato' , component: Contato},
{path: 'cadastro' , component: Cadastro},
{path: 'login' , component: Login},
{path: 'cesta' , component: Cesta},
{path: 'pesquisa' , component: Pesquisa},
{path: 'reenviar' , component: ReenviaSenha},
{path: '' , component: Homepage, pathMatch: 'full'},

];