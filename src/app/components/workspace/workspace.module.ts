import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorkspaceComponent } from './workspace.component';
import { CreateChannelModalComponent } from '../create-channel-modal/create-channel-modal.component';



@NgModule({
  declarations: [WorkspaceComponent, CreateChannelModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports:[WorkspaceComponent],
  entryComponents: [CreateChannelModalComponent]
})
export class WorkspaceModule { }
