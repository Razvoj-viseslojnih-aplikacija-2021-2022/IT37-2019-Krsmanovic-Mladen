import { Component, OnInit } from '@angular/core';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-nacionalnost',
  templateUrl: './nacionalnost.component.html',
  styleUrls: ['./nacionalnost.component.css']
})
export class NacionalnostComponent implements OnInit {

  displayedColumns= ['id', 'naziv', 'skracenica', 'actions'];
  dataSource!: MatTableDataSource<Nacionalnost>;

  constructor() { }

  ngOnInit(): void {
  }

}
