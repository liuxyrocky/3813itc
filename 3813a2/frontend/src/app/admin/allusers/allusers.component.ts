import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  modalStatus = 0;

  constructor() {
  }

  ngOnInit() {
  }

  showModal() {
    this.modalStatus = 1;
  }

  hideModal() {
    this.modalStatus = 0;
  }
}
