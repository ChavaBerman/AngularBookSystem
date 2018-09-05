import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../shared/services/book.service';
import { UserService } from '../../../../shared/services/user.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currentbook;
  currentuser;
  obj: Object = new Object();

  constructor(private bookservice: BookService, private userservice: UserService) { }
  ngOnInit() {
    this.userservice.subjectUser.subscribe({
      next: (v: JSON) => { this.currentuser = v }

    });

    if (localStorage['currentuser'])
      this.currentuser = {};
    this.currentbook = this.bookservice.book;

  }

  addToCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    this.currentbook.id = cart.length ? JSON.parse(cart[cart.length - 1]).id + 1 : 0;
    cart.push(JSON.stringify(this.currentbook));
    localStorage.setItem('cart', JSON.stringify(cart));
    swal({
      title: 'This book was added successfully',
      type: 'success',
      confirmButtonText: 'OK'
    })

  }


}
