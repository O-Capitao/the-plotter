import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  public isHidden = true;

  constructor() { }

  ngOnInit() {
  }

  public toggleVisibility() {
    this.isHidden = !this.isHidden;
  }

}
