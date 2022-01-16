import { Component, OnInit,TemplateRef } from '@angular/core';
import { Validators,FormGroup, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import {CategoryService} from '../../services/category/category.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryForm:FormGroup;
  editCategoryForm:FormGroup;
  category_values:any;
  
  constructor(private modalService: BsModalService,private categoryService:CategoryService) {}

  modalRef?: BsModalRef;
  categoryArray:any;

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'desctiption':new FormControl(null,Validators.required)
    })
    this.loadCategory();
  }

  
  loadCategory(){
      this.categoryService.loadAllCategories().subscribe(
        res=>{
          this.categoryArray = res;
        },
        err=>{
          console.log(err)
        }
      );
  }

  onSubmitCategory(){
    let dataSet = {
      categoryName:this.categoryForm.value.name,
      categoryDescription:this.categoryForm.value.desctiption
    }
    this.categoryService.submitCategory(dataSet).subscribe(
      res=>{
        this.categoryForm.reset();
        this.loadCategory();
      },
      err=>{
        console.log(err)
      }
    );
  }

  editCategory(categoryID:number){
    this.categoryService.loadCategory(categoryID).subscribe(
        res=>{
          this.category_values = res;
          this.editCategoryForm = new FormGroup({
            'name': new FormControl(this.category_values.categoryName,Validators.required),
            'desctiption':new FormControl(this.category_values.categoryDescription,Validators.required)
          })
        },
        err=>{
          console.log(err)
        }
      );
  }

  onSubmitEditedCategory(){
    let dataSet = {
      categoryId:this.category_values.categoryId,
      categoryName:this.editCategoryForm.value.name,
      categoryDescription:this.editCategoryForm.value.desctiption
    }
    this.categoryService.updateCategory(this.category_values.categoryId,dataSet).subscribe(
      res=>{
        this.modalRef.hide();
        this.loadCategory();
      },
      err=>{
        console.log(err)
      }
    );
  }

  deleteCategory(categoryID:number){
    this.categoryService.deleteCategory(categoryID).subscribe(
      res=>{
        this.loadCategory();
      },
      err=>{
        console.log(err)
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
