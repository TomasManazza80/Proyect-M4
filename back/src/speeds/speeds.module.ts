import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/categories/entities/category.entity";
import { Product } from "src/products/entities/product.entity";
import { CategoriesSpeed } from "./categories/categories.seed";
import { ProductsSpeed } from "./products/products.speed";


@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoriesSpeed, ProductsSpeed],
    exports: [CategoriesSpeed, ProductsSpeed]
})
export class SpeedsModule { }