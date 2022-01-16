import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient) { }

  submitCategory(values:any){
    return this.http.post(`${this.SERVER_URL}/Category`,values);
  }

  loadAllCategories(){
    return this.http.get(`${this.SERVER_URL}/Category`);
  }

  loadCategory(id:number){
    return this.http.get(`${this.SERVER_URL}/Category/${id}`);
  }

  updateCategory(id:number,values:any){
    return this.http.put(`${this.SERVER_URL}/Category/${id}`,values);
  }

  deleteCategory(id:number){
    return this.http.delete(`${this.SERVER_URL}/Category/${id}`);
  }

}
