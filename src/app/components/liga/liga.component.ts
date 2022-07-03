import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Liga } from 'src/app/models/liga';
import { LigaService } from 'src/app/services/liga.service';
import { LigaDialogComponent } from '../dialogs/liga-dialog/liga-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css']
})
export class LigaComponent implements OnInit, OnDestroy {

  displayedColumns= ['id', 'naziv', 'oznaka', 'actions'];
  dataSource!: MatTableDataSource<Liga>;
  subscription!: Subscription;

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private ligaService: LigaService,
    public dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.ligaService.getAllLigas().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    },
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
    );
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string): void {
    const dialogRef = this.dialog.open(LigaDialogComponent, {data:{id,naziv, oznaka}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
