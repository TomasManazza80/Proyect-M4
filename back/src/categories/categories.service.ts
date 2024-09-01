import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import {UpdateCategoryDto} from './dto/update-category.dto';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(category: Category): Promise<Category> { //como podemos ver la funcion createCategory está esperando un dto como parametro al usar la sentencia: createCategory(category: Category)
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id } });
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    const category = await this.categoryRepository.findOne({ where: { id: id.toString() } });
    if (!category) {
      return null;
    }
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }
  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}