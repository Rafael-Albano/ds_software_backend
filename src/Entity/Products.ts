import { IProductResponse } from "../Interfaces/IProduct"

export enum ProductCategory {
  FASHION = 'Moda',
  ELETRONICS = 'Eletronicos',
  FOOD = 'Alimentos',
  DRINKS = 'Bebidas',
  HOME_DECORATION = 'CasaDecoracao',
  HEALTH_BEAUTY = 'SaudeBeleza',
  SPORT_LEISURE = 'EsporteLazer',
  BOOKS = 'Livros',
  STATIONERY_SHOP = 'Papelaria',
  TOYS = 'Brinquedos',
  ACCESSORIES = 'Acessorios',
  HOME_APPLIANCES = 'Eletrodomesticos'
}

export class Product {
  id: string
  name: string
  description: string
  price: Number
  category: ProductCategory
  pictureUrl: string

  constructor(productInfo: IProductResponse) {
    this.id = productInfo.id
    this.name = productInfo.name
    this.description = productInfo.description
    this.price = productInfo.price
    this.category = productInfo.category
    this.pictureUrl = productInfo.pictureUrl
  }
}