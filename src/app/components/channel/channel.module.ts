import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChannelComponent } from './channel.component';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { ShowUsersModalComponent } from '../show-users-modal/show-users-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [ChannelComponent, AddUserModalComponent, ShowUsersModalComponent],
  exports: [ChannelComponent],
  entryComponents: [AddUserModalComponent, ShowUsersModalComponent]
})
export class ChannelModule { }
