export class ProductResponseDto{
    name:string;
    price:number;

    constructor(partial: Partial<ProductResponseDto>){
        const {name, price} = partial;
        this.name=name;
        this.price=price;
    }
}