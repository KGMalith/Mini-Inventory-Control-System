import { Component, OnInit,TemplateRef } from '@angular/core';
import { Validators,FormGroup, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { CategoryService } from 'src/app/services/category/category.service';
import {ProductService} from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  constructor(private modalService: BsModalService,private categoryService:CategoryService,private productService:ProductService) { }

  modalRef?: BsModalRef;
  productForm:FormGroup;
  editProductForm:FormGroup;
  category_values:any;
  categoryArray:any;
  productsArray:any;
  product_values:any;

  ngOnInit(): void {
    this.loadCategory();
    this.loadProducts();
  }

  loadCategory(){
      this.categoryService.loadAllCategories().subscribe(
        res=>{
          this.categoryArray = res;
          this.productForm = new FormGroup({
            'name': new FormControl(null,Validators.required),
            'desctiption':new FormControl(null,Validators.required),
            'price':new FormControl(null,Validators.required),
            'quantity':new FormControl(null,Validators.required),
            'category':new FormControl(this.categoryArray[0].categoryId,Validators.required)
          })
        },
        err=>{
          console.log(err)
        }
      );
  }

  loadProducts(){
    this.productService.loadAllProducts().subscribe(
        res=>{
          this.productsArray = res;
        },
        err=>{
          console.log(err)
        }
      );
  }

  onSubmitProduct(){
    let dataSet = {
      productName:this.productForm.value.name,
      productDescription:this.productForm.value.desctiption,
      productPrice:this.productForm.value.price,
      productQuantity:this.productForm.value.quantity,
      categoryId:this.productForm.value.category,
    }
    this.productService.submitProduct(dataSet).subscribe(
      res=>{
        this.productForm.reset();
        this.loadProducts();
      },
      err=>{
        console.log(err)
      }
    );
  }

  editProduct(id:number){
     this.productService.loadProduct(id).subscribe(
        res=>{
          this.product_values = res;
          this.editProductForm = new FormGroup({
            'name': new FormControl(this.product_values.productName,Validators.required),
            'desctiption':new FormControl(this.product_values.productDescription,Validators.required),
            'price':new FormControl(this.product_values.productPrice,Validators.required),
            'quantity':new FormControl(this.product_values.productQuantity,Validators.required),
            'category':new FormControl(this.product_values.categoryId,Validators.required)
          })
        },
        err=>{
          console.log(err)
        }
      );
  }

  onSubmitEditedProduct(){
     let dataSet = {
      productId:this.product_values.productId,
      productName:this.editProductForm.value.name,
      productDescription:this.editProductForm.value.desctiption,
      productPrice:this.editProductForm.value.price,
      productQuantity:this.editProductForm.value.quantity,
      categoryId:this.editProductForm.value.category
    }
    this.productService.updateProduct(this.product_values.productId,dataSet).subscribe(
      res=>{
        this.modalRef.hide();
        this.loadProducts();
      },
      err=>{
        console.log(err)
      }
    );
  }

  deleteProduct(productID:number){
    this.productService.deleteProduct(productID).subscribe(
      res=>{
        this.loadCategory();
        this.loadProducts();
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
