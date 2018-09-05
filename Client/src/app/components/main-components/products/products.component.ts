import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../shared/services/book.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  list;
  filterString:string="a";
  constructor(private bookservice:BookService) { 
    
  this.getBooksList();
  }
 getBooksList()
 {
  this.bookservice.getBooksList(this.filterString).subscribe(res=>{
    this.list=res; });
 }
  
  }


