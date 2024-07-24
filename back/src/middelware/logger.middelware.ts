export function loggerGlobal(req: Request, res: Response, next: ()=>void){
    console.log(`Se ejecutò el controlador con el metodo ${req.method} en la ruta ${req.url}, a la hora ${new Date().getHours()}:${new Date().getMinutes()}`
    ),
    next();
}