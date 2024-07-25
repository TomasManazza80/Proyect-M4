export class UserRepository {
    private users = [
        {
            id: 1,
            name: "user 1",
            age: 25
        },
        {
            id: 2,
            name: "user 2",
            age: 30
        },
        {
            id: 3,
            name: "user 3",
            age: 28
        }
    ];

    findAll(){
        return this.users; //metodo que retorna el listado de usuarios que tenemos arriba
    }
}
