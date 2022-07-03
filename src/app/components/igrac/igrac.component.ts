import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Igrac } from 'src/app/models/igrac';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Subscription } from 'rxjs';
import { Tim } from 'src/app/models/tim';
import { IgracService } from 'src/app/services/igrac.service';
import { MatDialog } from '@angular/material/dialog';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { IgracDialogComponent } from '../dialogs/igrac-dialog/igrac-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns = ['id', 'ime', 'prezime', 'brojReg', 'datumRodjenja',
  'nacionalnost', 'tim', 'actions'];
 dataSource!: MatTableDataSource<Igrac>;
 subcription!: Subscription;
 @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
 @Input() selektovaniTim!: Tim;

 constructor(private igracService: IgracService,
   private dialog: MatDialog) { }

 ngOnChanges(): void {
   if(this.selektovaniTim) {
     this.loadData();
   }
 }

 ngOnDestroy(): void {
   this.subcription.unsubscribe();
 }

 ngOnInit(): void {
   this.loadData();
 }

 loadData() {
   this.subcription = this.igracService. getIgracZaTimID(this.selektovaniTim.id)
         .subscribe(data => {
           this.dataSource = new MatTableDataSource(data);
           this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator;

         }, (error: Error) => {
           console.log(error.name +' '+ error.message);
         });
 }

 openDialog(flag: number, id?:number, ime?: string, prezime?: string, brojReg?: string, datumRodjenja?:Date,
       nacionalnost?:Nacionalnost, tim?:Tim) {

         const dialogRef = this.dialog.open(IgracDialogComponent,
           {data:{id,ime,prezime,brojReg,datumRodjenja,nacionalnost,tim}});

         dialogRef.componentInstance.flag = flag;
         if(flag === 1) {
           dialogRef.componentInstance.data.tim = this.selektovaniTim;
         }
         dialogRef.afterClosed().subscribe(res => {
           if(res === 1) {
             this.loadData();
           }
         });
 }

 applyFilter(filterValue: any) {
  filterValue = filterValue.target.value;
  filterValue = filterValue.trim();
  filterValue = filterValue.toLocaleLowerCase();
  this.dataSource.filter = filterValue;
}

}
