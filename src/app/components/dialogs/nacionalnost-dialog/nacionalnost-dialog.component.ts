import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { NacionalnostService } from 'src/app/services/nacionalnost.service';

@Component({
  selector: 'app-nacionalnost-dialog',
  templateUrl: './nacionalnost-dialog.component.html',
  styleUrls: ['./nacionalnost-dialog.component.css']
})
export class NacionalnostDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NacionalnostDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Nacionalnost,
    public nacionalnostService: NacionalnostService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.nacionalnostService.insertNacionalnost(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodata nacionalnost ' + this.data.naziv, 'OK', {duration:2500});
    }, (error:Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja nove nacionalnosti',
      'Zatvori', {duration: 2500});
    });
  }

  public update(): void {
    this.nacionalnostService.updateNacionalnost(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjena nacionalnost ' + this.data.naziv, 'OK', {duration:2500});
    }, (error:Error) => {
      this.snackBar.open('Došlo je do greške prilikom izmene nacionalnosti',
      'Zatvori', {duration: 2500});
    });
  }

  public delete(): void {
    this.nacionalnostService.deleteNacionalnost(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisana nacionalnost ' + this.data.naziv, 'OK', {duration:2500});
    }, (error:Error) => {
      this.snackBar.open('Došlo je do greške prilikom brisanja nacionalnosti',
      'Zatvori', {duration: 2500});
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration:1000});
  }

}
