import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient) { }

  submitProduct(values:any){
    return this.http.post(`${this.SERVER_URL}/Product`,values);
  }

  loadAllProducts(){
    return this.http.get(`${this.SERVER_URL}/Product`);
  }

  loadProduct(id:number){
    return this.http.get(`${this.SERVER_URL}/Product/${id}`);
  }

  updateProduct(id:number,values:any){
    return this.http.put(`${this.SERVER_URL}/Product/${id}`,values);
  }

  deleteProduct(id:number){
    return this.http.delete(`${this.SERVER_URL}/Product/${id}`);
  }
}
