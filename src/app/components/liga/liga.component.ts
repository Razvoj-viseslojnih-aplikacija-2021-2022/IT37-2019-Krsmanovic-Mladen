import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Liga } from 'src/app/models/liga';
import { LigaService } from 'src/app/services/liga.service';
import { LigaDialogComponent } from '../dialogs/liga-dialog/liga-dialog.component';

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css']
})
export class LigaComponent implements OnInit, OnDestroy {

  displayedColumns= ['id', 'naziv', 'oznaka', 'actions'];
  dataSource!: MatTableDataSource<Liga>;
  subscription!: Subscription;

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

}
