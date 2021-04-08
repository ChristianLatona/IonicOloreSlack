import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit {
  usersToAdd = new FormControl('', Validators.required)
  
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  dismissModal = () => {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  add = () => {
    this.modalCtrl.dismiss(this.usersToAdd.value, 'added')
  }

}
