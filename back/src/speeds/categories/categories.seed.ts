import { Injectable } from "@nestjs/common";
import { Category } from "../../categories/entities/category.entity";
import { In, Repository } from "typeorm";
import { categories } from "./categories-mock";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
    export class CategoriesSpeed{
        constructor(
            @InjectRepository(Category)
            private readonly categoryRepository: Repository<Category>,
        ){}

        async seed(){
            const existingCategories = await this.categoryRepository.find({
                where: {name: In(categories)}, 
            });

            for (const categoryName of categories) {
                if(
                    !existingCategories.some((category)=>category.name===categoryName)
                ){
                    const category = new Category();
                    category.name = categoryName;
                    await this.categoryRepository.save(category);
                }
        }

    }

}

//va a buscar en todo el repositorio las categorias por el nombre que tenemos en nuestro mook
//compara las categorias que estan guardadas con las nuevas, de ser nueva se alamcena en el mock
//de ser una ya existente se saltea.
