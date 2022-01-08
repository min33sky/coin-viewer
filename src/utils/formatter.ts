export function formatPrice(price: number) {
  return '$' + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/, '$1, ');
}
