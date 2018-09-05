import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../shared/services/book.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  bookList;
  currentbook;
  constructor(private bookservice: BookService) {
    this.bookList = JSON.parse(localStorage.getItem('cart'));
    if(!this.bookList.length)
    swal({
      title: 'Your cart is empty!',
      type: 'info',
      confirmButtonText: 'OK'
    })

  }

  ngOnInit() {
    // this.bookservice.subjectBookList.subscribe(
    //   {
    //     next: (v) => {
    //       this.currentbook=JSON.stringify(v);
         
    //      return;
    //     }
    //   }
    // );
  }
  remove(event){
    let cart=JSON.parse(localStorage.getItem('cart'));
    let index=cart.indexOf(event);
    cart.splice(index,1);
    localStorage.setItem('cart',JSON.stringify(cart));
    this.bookList=cart;


  }

}
