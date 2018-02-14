import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Holding } from '../shared/models';
import { PortfolioService } from '../shared/services/portfolio.service';
import { PortfolioTableComponent } from '../portfolio-table/portfolio-table.component';
import { CartService } from '../shared/services/cart.service';
import { Order } from '../shared/models/order';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  options: FormGroup;
  loading: boolean = false;
  chipColor: string;
  constructor(
    fb: FormBuilder,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { holding: Holding, side: string },
    private portfolioService: PortfolioService,
    private cartService: CartService) {
    this.options = fb.group({
      'quantity': ['', Validators.min(0)],
      'price': [this.data.holding.realtime_price, Validators.min(0)],
    });
  }

  ngOnInit() {
    this.data.holding
    if (this.data.side === 'Sell') {
      this.chipColor = 'warn';
    } else if (this.data.side === 'Buy') {
      this.chipColor = 'primary';
    }
  }

  sell() {
    this.loading = true;
    this.portfolioService.sell(this.data.holding, this.options.value.quantity, this.options.value.price).subscribe(
      response => {
        this.snackBar.open('Sell order sent', 'Close', {
          duration: 2000,
        });
        this.loading = false;
      },
      error => {
        this.snackBar.open('Unknown error');
        this.loading = false;
      });
  }

  buy() {
    this.loading = true;
    this.portfolioService.buy(this.data.holding, this.options.value.quantity, this.options.value.price).subscribe(
      response => {
        this.snackBar.open('Buy order sent', 'Close', {
          duration: 2000,
        });
        this.loading = false;
      },
      error => {
        this.snackBar.open('Unknown error');
        this.loading = false;
      });
  }

  order() {
    if (this.data.side === 'Buy') {
      this.buy();
    } if (this.data.side === 'Sell') {
      this.sell();
    }
  }

  addSellOrder() {
    let order: Order = {
      holding: this.data.holding,
      quantity: this.options.value.quantity,
      price: this.options.value.price,
      submitted: false,
      pending: false,
      side: 'Sell'
    };

    this.cartService.addToCart(order);
  }

  addBuyOrder() {
    let order: Order = {
      holding: this.data.holding,
      quantity: this.options.value.quantity,
      price: this.options.value.price,
      submitted: false,
      pending: false,
      side: 'Buy'
    };

    this.cartService.addToCart(order);
  }

  addToCart() {
    if (this.data.side === 'Buy') {
      this.addBuyOrder();
    } if (this.data.side === 'Sell') {
      this.addSellOrder();
    }
    this.snackBar.open("Order added to cart");
  }
}
