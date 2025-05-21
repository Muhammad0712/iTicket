export class CreateBookingDto {
  cart_id: number;
  finished: Date;
  payment_method_id: number;
  delivery_method_id: number;
  discount_coupon_id: number;
  status_id: number;
}
