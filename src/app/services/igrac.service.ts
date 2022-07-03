import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Igrac } from '../models/igrac';
import { IGRAC_URL,IGRAC_ZATIM_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class IgracService {

  constructor(private httpClient: HttpClient) { }

  public getIgracZaTimID(idTima: number): Observable<any> {
    return this.httpClient.get(`${IGRAC_ZATIM_URL}/${idTima}`);
  }

  public addIgrac(igrac : Igrac): Observable<any> {
    igrac.id = 150;
    return this.httpClient.post(`${IGRAC_URL}`, igrac);
  }

  public updateIgrac(igrac : Igrac): Observable<any> {
    return this.httpClient.put(`${IGRAC_URL}`, igrac);
  }

  public deleteIgrac(id : number): Observable<any> {
   return this.httpClient.delete(`${IGRAC_URL}/${id}`);
  }
}
