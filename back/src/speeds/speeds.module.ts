import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../categories/entities/category.entity";
import { Product } from "../products/entities/product.entity";
import { CategoriesSpeed } from "./categories/categories.seed";
import { ProductsSpeed } from "./products/products.speed";


@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoriesSpeed, ProductsSpeed],
    exports: [CategoriesSpeed, ProductsSpeed]
})
export class SpeedsModule { }