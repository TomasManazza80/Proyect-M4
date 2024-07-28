import { Injectable } from "@nestjs/common";
import { UpdateProductDto } from "./dto/update-product.dto"; // Asegúrate de que esta ruta sea correcta
import { CreateProductDto } from "./dto/create-product.dto"; // Asegúrate de que esta ruta sea correcta

@Injectable()
export default class ProductRepository {
    private products = [
        { id: 1, name: "product 1", price: 100 },
        { id: 2, name: "product 2", price: 150 },
        { id: 3, name: "product 3", price: 200 }
    ];

    findAll() {
        return this.products;
    }

    create(createProduct: CreateProductDto) {
        const newProduct = {
            id: this.products.length + 1,
            ...createProduct,
        };
        this.products.push(newProduct);
        return newProduct.id;
    }

    findOne(id: number) {
        return this.products.find((product) => product.id === id);
    }

    remove(id: number): number | string {
        const productToDelete = this.products.findIndex((product) => product.id === id);

        if (productToDelete === -1) {
            return 'Error: Producto no encontrado';
        }

        this.products.splice(productToDelete, 1);
        return id;
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        const product = this.findOne(id);
        
        if (!product) {
            return 'Error: Producto no encontrado';
        }

        const updatedProduct = {
            ...product,
            ...updateProductDto,
        };

        this.products = this.products.map((prod) =>
            prod.id === id ? updatedProduct : prod
        );

        return updatedProduct;
    }
}
