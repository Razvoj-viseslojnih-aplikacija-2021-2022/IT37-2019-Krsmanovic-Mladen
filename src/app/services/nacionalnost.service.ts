import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NACIONALNOST_URL } from '../app.constants';
import { Nacionalnost } from '../models/nacionalnost';

@Injectable({
  providedIn: 'root'
})
export class NacionalnostService {

  constructor(private httpClient: HttpClient) { }

  public getAllNacionalnosts(): Observable<any> {
    return this.httpClient.get(`${NACIONALNOST_URL}`);
  }
}

