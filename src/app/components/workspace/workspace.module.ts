import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorkspaceComponent } from './workspace.component';
import { CreateChannelModalComponent } from '../create-channel-modal/create-channel-modal.component';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';



@NgModule({
  declarations: [WorkspaceComponent, CreateChannelModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[WorkspaceComponent],
  entryComponents: [CreateChannelModalComponent]
})
export class WorkspaceModule { }
