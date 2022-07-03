import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tim } from 'src/app/models/tim';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Liga } from 'src/app/models/liga';
import { TimService } from 'src/app/services/tim.service';
import { TimDialogComponent } from '../dialogs/tim-dialog/tim-dialog.component';

@Component({
  selector: 'app-tim',
  templateUrl: './tim.component.html',
  styleUrls: ['./tim.component.css']
})
export class TimComponent implements OnInit, OnDestroy {

  displayedColumns= ['id', 'naziv', 'osnovan', 'sediste', 'liga' , 'actions'];
  subscription!: Subscription;
  dataSource!: MatTableDataSource<Tim>;
  selektovanTim!: Tim;


  constructor(private timService: TimService,
    public dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  selectRow(row: Tim) {
    this.selektovanTim = row;
  }

  public loadData(): void {
    this.subscription = this.timService.getAllTims().subscribe(data =>
      {
        this.dataSource = new MatTableDataSource(data);
      }, (error:Error) => {
        console.log(error.name + ' ' + error.message);
      });
  }


  public openDialog(flag:number, id?:number, naziv?:string, osnovan?:Date, sediste?:string, liga?: Liga) {
    const dialogRef = this.dialog.open(TimDialogComponent, {data:{id,naziv, osnovan, sediste, liga}});

      dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        this.loadData();
      }
    })
  }



}

