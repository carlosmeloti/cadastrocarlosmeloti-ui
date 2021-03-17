import { Cadastro } from '../core/model';
import { CadastroService, CadastroFiltro, } from './cadastro.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'src/primeng/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  tatalRegistros = 0;
  filtro = new CadastroFiltro();
  nome: string;

  cadastros = [];
  cadastroSalvar = new Cadastro();
  @ViewChild('tabela') grid;


  constructor(
    private cadastroService: CadastroService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.pesquisar();
    const codigoCad = this.route.snapshot.params['codigo'];

    //se houver um id entra no metodo de carregar valores
    if (codigoCad) {
      this.carregar(codigoCad);
    }
  }
 /* get editando() {
    return Boolean(this.cadastroSalvar.cpf)
  }*/
  //Metodo para carregar valores
  carregar(cpf: number) {
    this.cadastroService.buscarPorCodigo(cpf)
      .then(cadastro => {
        this.cadastroSalvar = cadastro;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisar(page = 0) {
    

    this.cadastroService.pesquisar(this.filtro)
      .then(resultado => {
        this.tatalRegistros = resultado.total;
        this.cadastros = resultado.cadastro;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.pesquisar(page);
  }


  excluir(cadastro: any) {

    this.cadastroService.excluir(cadastro.cpf)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }
        this.toasty.success('Cadastri excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  /*salvar(form: FormControl) {

    if (this.editando) {
      this.confirmarAlterar(form);
    } else {
      this.confirmarSalvar(form);
    }

  }*/
  confirmarExclusao(cadastro: any) {
    if(cadastro.cpf != 1){
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
           this.excluir(cadastro);
        }
      })
    } else {
      this.toasty.warning('Exception');
    }
    
  }

  salvar(cadastro: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja salvar?',
      accept: () => {
        this.adicionar(cadastro);
      }
    });
  }

  confirmarAlterar(cadastro: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizar(cadastro);
      }
    });
  }

  adicionar(form: FormControl) {
    this.cadastroService.adicionar(this.cadastroSalvar)
      .then(() => {
        this.toasty.success("Sucesso!");
        form.reset();
        this.cadastroSalvar = new Cadastro();
        this.refresh();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: FormControl) {
    this.cadastroService.atualizar(this.cadastroSalvar)
      .then(cadastro => {
        this.cadastroSalvar = cadastro;

        this.toasty.success('Alterada com sucesso!');
        this.refresh();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  refresh(): void {
    window.location.reload();
  }

}

