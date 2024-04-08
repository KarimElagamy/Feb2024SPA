import { Component, OnInit } from '@angular/core';
import { Product } from '../Shared/Models/Product';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../Core/Services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

constructor(private productService:ProductService) { }

sampleProductsList:Product[] = [];
ourProductsListFromAPI:Product[] = [];

ngOnInit(): void {
  for(let i = 0; i < 5; i++){
    this.sampleProductsList.push({Id: i, Name: "Example"});
  }

  console.log(this.sampleProductsList);

  this.productService.GetProductList().subscribe(p => {
    this.ourProductsListFromAPI = p;
    console.log(this.ourProductsListFromAPI);
  });
}
}
