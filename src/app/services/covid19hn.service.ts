import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Covid19hnService {

  data = [];
  constructor(private http: HttpClient) { }
  


  getCasosCovid(){
    return this.http.get('/assets/casos.json');
  }



}
