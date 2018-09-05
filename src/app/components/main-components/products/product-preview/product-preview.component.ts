import { Component, OnInit, Input } from '@angular/core';
import {Router}from '@angular/router'
import { BookService } from '../../../../shared/services/book.service';
@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})

export class ProductPreviewComponent  {

  @Input()
  book;
 
  constructor(private router:Router,private bookservice:BookService) { 

  }

  
  transforInfo()
  {
    this.router.navigate(['/book/products/product-details']);
    this.bookservice.book=this.book;
      
  }
}
