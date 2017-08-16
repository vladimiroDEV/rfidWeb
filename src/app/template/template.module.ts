import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from "app/template/template.component";
import { HeaderComponent } from "app/template/header/header.component";
import { MainHeaderComponent } from "app/template/main-header/main-header.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TemplateComponent, HeaderComponent, MainHeaderComponent, SidebarComponent, FooterComponent, ControlSidebarComponent],
  exports: [MainHeaderComponent,SidebarComponent,FooterComponent,ControlSidebarComponent]
})
export class TemplateModule { }
