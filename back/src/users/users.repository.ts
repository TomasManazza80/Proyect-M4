import { UpdateProductDto } from "src/products/dto/update-product.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";



@Injectable()
 
export class UserRepository {
    private users = [
        {
            id: 1,
            name: "user 1",
            email: "user1@example.com",
            password: "Password123!",
            address: "123 Main St, Anytown, USA",
            phone: "+1-555-123-4567"
        },
        {
            id: 2,
            name: "user 2",
            email: "user2@example.com",
            password: "SecurePass456@",
            address: "456 Elm St, Othertown, USA",
            phone: "+1-555-234-5678"
        },
        {
            id: 3,
            name: "user 3",
            email: "user3@example.com",
            password: "MyPass789#",
            address: "789 Oak St, Anycity, USA",
            phone: "+1-555-345-6789"
        }
    ];
    

    //extrae a todos los usuarios del repositorio:
    findAll(){
        return this.users; //metodo que retorna el listado de usuarios que tenemos arriba
    }

    //crea un nuevo usuario:
    create(createUser: CreateUserDto){
        const newUser = {
            id: this.users.length + 1, 
            ...createUser,
        };
        this.users.push(newUser);
        return newUser.id
    }

    //retorna a un usuario mediante su email:
    findOneByEmail(email: string){
        return this.users.find((user)=>user.email===email);
    }
     
    //retorna a un usuario que busco por id:
    findOne(id:number){
        return this.users.find((user)=>user.id===id);
    }


    //elimina al usuario que le paso por id y me si se elimina correctamente me retorna su id:

    remove(id: number): number | string {
        const userIndex = this.users.findIndex((user) => user.id === id);
    
        if (userIndex === -1) {
            return 'Error: Usuario no encontrado';
        }
    
        this.users.splice(userIndex, 1);
        return id;
    }
    
    
    

    //actualiza un usuario en particular usando un id;
    update(id:number, updateUserDto: UpdateProductDto){
        const user = this.findOne(id);
        const updateUser={
            ...user,
            ...updateUserDto,
        };
        this.users=this.users.map((user)=>(user.id===id ? updateUser : user));
        return updateUser;
    }

}
    

