import { Request, Response, Router } from 'express';
import Admins from '../../models_mongoose/adminUser'
import Admin from '../../../interfaces/admin';
class AdminsUsersService{

    public _router: Router;

    constructor(){
        this._router= Router();

        this._router.get('/', this.getAll);
        this._router.post('/', this.create);
        this._router.put('/', this.update);
        this._router.delete('/:id', this.delete);
    }

    private async getAll(req: Request, res: Response){
        const users = await Admins.find();
        res.json(users);   
    }

    private create(req: Request, res: Response){
        const newUser = new Admins(req.body.newUser);
        newUser.save();
        res.send((newUser) ? true: false);
    }

    private async update(req: Request, res: Response){
        const userToEdit: Admin = req.body.userToEdit;        
        const {_id,...userWithoutId} = userToEdit;
        const edited = await Admins.findByIdAndUpdate(userToEdit._id, userWithoutId);
        res.send((edited) ? true : false );
    }

    private async delete(req: Request, res: Response){
        const deleted = await Admins.findByIdAndDelete(req.params.id); 
        res.send((deleted) ? true : false );
    }

    /* Setters y Getters */

    get router(): Router{
        return this._router;
    }
}


const adminsUsersService= new AdminsUsersService();

export default adminsUsersService.router;