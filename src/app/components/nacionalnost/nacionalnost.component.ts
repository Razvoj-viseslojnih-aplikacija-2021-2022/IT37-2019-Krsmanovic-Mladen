import { Component, OnDestroy, OnInit } from '@angular/core';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { NacionalnostService } from 'src/app/services/nacionalnost.service';
import { MatDialog } from '@angular/material/dialog';
import {NacionalnostDialogComponent} from '../dialogs/nacionalnost-dialog/nacionalnost-dialog.component';

@Component({
  selector: 'app-nacionalnost',
  templateUrl: './nacionalnost.component.html',
  styleUrls: ['./nacionalnost.component.css']
})
export class NacionalnostComponent implements OnInit, OnDestroy {

  displayedColumns= ['id', 'naziv', 'skracenica', 'actions'];
  dataSource!: MatTableDataSource<Nacionalnost>;
  subscription!: Subscription;

  constructor(private nacionalnostService: NacionalnostService,
    public dialog: MatDialog) { }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.nacionalnostService.getAllNacionalnosts().subscribe(data => {
     // console.log(data);
     this.dataSource = new MatTableDataSource(data);
    }, (error: Error) => {
      console.log(error.name + ' ' + error.message);
    });
  }

  public openDialog(flag: number, id?:number, naziv?:string, skracenica?: string) {
    const dialogRef = this.dialog.open(NacionalnostDialogComponent, {data:{id,naziv,skracenica}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1)
        this.loadData();
    });
  }

}
