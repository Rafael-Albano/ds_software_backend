import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '../Entity/Products';
import { IProductInfo, IProductResponse } from '../Interfaces/IProduct';

export class ProductService {
  private async getProducts(): Promise<Product[]> {
    const filePath = path.join(__dirname, '../product.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const productInfo: IProductResponse[] = JSON.parse(data);

    const products = productInfo.map(product => new Product(product))

    return products
  }

  private async findProductsAllowed(): Promise<Product[]> {
    const products = await this.getProducts()
    const productCategories = Array.from(new Set(products.map(({category}) => category)))

    const productsFiltered: Product[] = []
    type CategoryAllowed = {
      allowed: boolean
    }

    for await (const category of productCategories) {
      try {
        const response = await fetch(`https://posdesweb.igormaldonado.com.br/api/allowedCategory?category=${category}`)
        if (!response.ok) {
          throw new Error('Request Failed: ' + response.status);
        }
    
        const {allowed}: CategoryAllowed =  await response.json()
        if (!allowed) continue
  
        const productsFound = products.filter(({category: productCategory}) => productCategory === category)
  
        productsFiltered.push(...productsFound)
  
      }catch (error) {
        console.error('Unexpected Error', error);
      }
    }

    return productsFiltered
  }

  public async process(): Promise<void> {
    try {
      const products = await this.findProductsAllowed();
      const productInfos = products.map<IProductInfo>(({ id, name }) => ({ id, name }));
      await this.saveToFile('processed.json', productInfos);
      console.log('File processed.json created with sucess!');
    } catch (error) {
      console.error('Process Error:', error);
    }
  }

  private async saveToFile(fileName: string, data: any): Promise<void> {
    const filePath = path.join(__dirname, '..', fileName);
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, json);
  }
}