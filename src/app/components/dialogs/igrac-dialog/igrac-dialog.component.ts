import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Igrac } from 'src/app/models/igrac';
import { NacionalnostService } from 'src/app/services/nacionalnost.service';
import { IgracService } from 'src/app/services/igrac.service';

@Component({
  selector: 'app-igrac-dialog',
  templateUrl: './igrac-dialog.component.html',
  styleUrls: ['./igrac-dialog.component.css']
})
export class IgracDialogComponent implements OnInit, OnDestroy {

  flag!:number;
  nacionalnosti!: Nacionalnost[];
  subscription!: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<IgracDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Igrac,
    private igracService: IgracService,
    private nacionalnostService: NacionalnostService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.nacionalnostService.getAllNacionalnosts().subscribe(data =>{
        this.nacionalnosti = data;
    });
  }

  compareTo(a: any, b:any) {
    return a.id == b.id;
  }

  public add(): void {
    this.igracService.addIgrac(this.data).subscribe(() => {
      this.snackBar.open('Dodali ste novog igraca!', 'OK', {duration: 2500});
    }, (error: Error) => {
      this.snackBar.open('Došlo je do greške', 'Zatvori', {duration:2500});
    });
  }

  public update(): void {
    this.igracService.updateIgrac(this.data).subscribe(() => {
      this.snackBar.open('Izmenili ste igrača!', 'OK', {duration: 2500});
    }, (error: Error) => {
      this.snackBar.open('Došlo je do greške', 'Zatvori', {duration:2500});
    });

  }

  public delete(): void {
    this.igracService.deleteIgrac(this.data.id).subscribe(() => {
      this.snackBar.open('Obrisali ste igrača!', 'OK', {duration: 2500});
    }, (error: Error) => {
      this.snackBar.open('Došlo je do greške', 'Zatvori', {duration:2500});
    });
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'OK', {duration:1000});
  }

}
