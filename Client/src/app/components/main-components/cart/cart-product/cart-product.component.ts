import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router}from '@angular/router'
import { CartComponent } from '../cart.component';
import { BookService } from '../../../../shared/services/book.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

@Input()
book;
@Output()
bookForDelete:EventEmitter<any>=new EventEmitter();
  constructor(private router:Router,private bookservice:BookService) { 

  }

  ngOnInit() {    
this.book=JSON.parse(this.book);


  }
  removeItemFromCart()
  {
 
    // this.bookservice.subjectBookList
    // .next(this.book);
  this.bookForDelete.emit(JSON.stringify(this.book));
    
  }
}
