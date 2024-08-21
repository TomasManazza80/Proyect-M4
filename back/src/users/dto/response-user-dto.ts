import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto{
    @ApiProperty({
        type: String,
        description: 'the uuid of the user, asignated by the database',
        required: true
    })
    id:string;
    @ApiProperty({
        type: String,
        description: 'the name of the user, asignated by the database',
        required: true
    })
    name: string;
    @ApiProperty({
        type: String,
        description: 'the email of the user, asignated by the database',
        required: true
    })
    email:string;
    @ApiProperty({
        type: String,
        description: 'the address of the user, asignated by the database',
        required: true
    })
    address:string;
    @ApiProperty({
        type: String,
        description: 'the phone number of the user, asignated by the database',
        required: false
    })
    phone:string;
    @ApiProperty({
        type: String,
        description: 'the country of the user, asignated by the database',
        required: false
    })
    country?:string;
    @ApiProperty({
        type: String,
        description: 'the city of the user, asignated by the database',
        required: true
    })
    city?:string;
    @ApiProperty({
        type: String,
        description: 'the password of the user, asignated by the database',
        required: true
    })
    password:string;

    constructor(partial: Partial<UserResponseDto>){
        const {id,name, email, address, phone, country, city, password}=partial;
        this.id=id;
        this.name=name;
        this.email=email;
        this.address=address;
        this.phone=phone;
        this.country=country;
        this.city=city;
        this.password=password;
    }
}