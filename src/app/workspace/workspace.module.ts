import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorkspaceComponent } from './workspace.component';



@NgModule({
  declarations: [WorkspaceComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[WorkspaceComponent]
})
export class WorkspaceModule { }
