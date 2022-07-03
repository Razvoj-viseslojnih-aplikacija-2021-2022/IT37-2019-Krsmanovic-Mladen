import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TIM_URL } from '../app.constants';
import { Tim } from '../models/tim';

@Injectable({
  providedIn: 'root'
})
export class TimService {

  constructor(private httpClient: HttpClient) { }

  public getAllTims(): Observable<any> {
    return this.httpClient.get(`${TIM_URL}`);
  }

  public addTim(tim: Tim): Observable<any> {
    tim.id=150;
    return this.httpClient.post(`${TIM_URL}`, tim);
  }

  public updateTim(tim: Tim): Observable<any> {
    return this.httpClient.put(`${TIM_URL}`, tim);
  }
  public deleteTim(id: number): Observable<any> {
    return this.httpClient.delete(`${TIM_URL}/${id}`);
  }
}
