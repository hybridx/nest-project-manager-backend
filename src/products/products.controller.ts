import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProduct() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id,
    @Body()
    body: {
      title: string;
      description: string;
      price: number;
    },
  ) {
    return this.productsService.updateProduct(
      id,
      body.title,
      body.description,
      body.price,
    );
  }

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body() completeBody: { description: string; price: number },
  ) {
    const prodId = `${Math.floor(Math.random() * (100 - 1)) + 1}`;
    return this.productsService.insertProduct(
      prodId,
      title,
      completeBody.description,
      completeBody.price,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id) {
    return this.productsService.deleteProduct(id);
  }
}
