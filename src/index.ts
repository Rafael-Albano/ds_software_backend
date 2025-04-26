import { ProductService } from './Services/ProductServices';
const productService = new ProductService()

async function main() {
  await productService.process();
}

main();