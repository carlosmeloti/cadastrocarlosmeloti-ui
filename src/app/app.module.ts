
import {ListboxModule} from 'primeng/listbox';
import { CadastroService } from './cadastro/cadastro.service';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SelectButtonModule} from 'primeng/selectbutton';
import { ToastyModule } from 'ng2-toasty';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccordionModule} from 'primeng/accordion';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {TreeModule} from 'primeng/tree';
import {DialogModule} from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NodeService } from 'src/service/nodeservice';
import { ErrorHandlerService } from './core/error-handler.service';
import { from } from 'rxjs';import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FieldsetModule} from 'primeng/fieldset';


const routes: Routes = [
  { path: 'cadastro', component:CadastroComponent},
  { path: 'cadastro/:codigo', component:CadastroComponent},
  
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' },
]


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent
    ],
  imports: [
    AccordionModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MenubarModule,
    InputTextModule,
    CardModule,
    SelectButtonModule,
    BrowserAnimationsModule,
    InputMaskModule,
    FileUploadModule,
    TableModule,
    ButtonModule,
    RouterModule.forRoot(routes),
    TabViewModule,
    TooltipModule,
    RadioButtonModule,
    InputTextareaModule,
    DropdownModule,
    TreeModule,
    ProgressSpinnerModule,
    CheckboxModule,
    CalendarModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    AppRoutingModule,
    ListboxModule,
    FieldsetModule,
    DialogModule
  ],
  providers: [
    NodeService,
    CadastroService,
    ConfirmationService,
    ErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
