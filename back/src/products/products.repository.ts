// products.repository.ts

import { Injectable } from "@nestjs/common";

@Injectable()
export default class ProductRepository {
    private products = [
        {
            id: 1,
            name: "product 1",
            price: 100
        },
        {
            id: 2,
            name: "product 2",
            price: 150
        },
        {
            id: 3,
            name: "product 3",
            price: 200
        }
    ];

    findAll() {
        return this.products;
    }
}
