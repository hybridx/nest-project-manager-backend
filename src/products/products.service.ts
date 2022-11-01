import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(id: string, title: string, desc: string, price: number) {
    const newProduct = new Product(id, title, desc, price);
    this.products.push(newProduct);
    return {
      productId: id,
    };
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(id) {
    const [product] = this.findProduct(id);
    return { ...product };
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const [product, index] = this.findProduct(id);
    this.products[index] = {
      ...product,
      title: title ? title : this.products[index].title,
      description: description ? description : this.products[index].description,
      price: price ? price : this.products[index].price,
    };
    return { ...this.products[index] };
  }

  deleteProduct(id: string) {
    const index = this.findProduct(id)[1];
    const product = this.products.splice(index, 1);
    return [...product];
  }

  private findProduct(id): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('No product Found');
    }
    return [product, productIndex];
  }
}
