import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { MatTableDataSource } from '@angular/material/table';
import { filter,Subscription } from 'rxjs';
import { NacionalnostService } from 'src/app/services/nacionalnost.service';
import { MatDialog } from '@angular/material/dialog';
import {NacionalnostDialogComponent} from '../dialogs/nacionalnost-dialog/nacionalnost-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-nacionalnost',
  templateUrl: './nacionalnost.component.html',
  styleUrls: ['./nacionalnost.component.css']
})
export class NacionalnostComponent implements OnInit, OnDestroy {

  displayedColumns= ['id', 'naziv', 'skracenica', 'actions'];
  dataSource!: MatTableDataSource<Nacionalnost>;
  subscription!: Subscription;

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

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
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
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

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
