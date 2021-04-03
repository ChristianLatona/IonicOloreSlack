import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  workspace_id:string
  constructor() { }

  ngOnInit() {
    this.workspace_id = sessionStorage.getItem("workspace_id");
  }

}
