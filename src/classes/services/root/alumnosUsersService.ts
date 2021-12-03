import { Request, Response, Router } from 'express';
import Alumno   from '../../../interfaces/alumno';
import Alumnos from '../../models_mongoose/alumnoUser'
import mongoose  from 'mongoose';
import UA from '../../../interfaces/ua';
import ua from '../../models_mongoose/ua';
class AlumnosUsersService{

    public _router: Router;

    constructor(){
        this._router= Router();

        this._router.get('/', this.getAll);
        this._router.post('/one/', this.getOne);
        this._router.post('/', this.create);
        this._router.put('/', this.update);
        this._router.delete('/:id', this.delete);
    }

    private async getAll(req: Request, res: Response){
        const users = await Alumnos.find().populate('aprobadas reprobadas nocursadas');
        res.json(users);        
    }

    private async getOne(req: Request, res: Response){
        const login: {user: String, pass: String} = req.body;
               
        const query = await Alumnos.findOne({boleta: login.user, contra: login.pass}).populate('aprobadas reprobadas nocursadas');
        const user: Alumno = query?.toObject();
        query?.toObject().periodoReprobadas.forEach((periodo: {id: string, periodo: string})=>{
            user.reprobadas.forEach((ua: UA)=>{
                if (periodo.id === ua._id.toString()){
                    ua.periodo = periodo.periodo;
                }
            });
        });
        res.json(user);        
    }

    private async create(req: Request, res: Response){
        const aprobadas: Array<mongoose.Types.ObjectId> = new Array<mongoose.Types.ObjectId>();
        const reprobadas: Array<mongoose.Types.ObjectId> = new Array<mongoose.Types.ObjectId>();
        const periodoReprobadas: Array<{id: String, periodo: String}> = new Array<{id: String, periodo: String}>();
        const nocursadas: Array<mongoose.Types.ObjectId> = new Array<mongoose.Types.ObjectId>();
        const alumnoReceived: Alumno = req.body.newUser;       

        alumnoReceived.aprobadas.forEach((uaAprobada: UA) =>{
            aprobadas.push(new mongoose.Types.ObjectId(uaAprobada._id));            
        });

        alumnoReceived.reprobadas.forEach((uaReprobada: UA) =>{
            reprobadas.push(new mongoose.Types.ObjectId(uaReprobada._id));
            periodoReprobadas.push({id:uaReprobada._id , periodo: uaReprobada.periodo});
        });

        alumnoReceived.nocursadas.forEach((uaNoCursada: UA) =>{
            nocursadas.push(new mongoose.Types.ObjectId(uaNoCursada._id));
        });
       
        const newAlumno = await new Alumnos({
            _id: new mongoose.Types.ObjectId(),
            boleta:alumnoReceived.boleta,
            contra: alumnoReceived.contra,
            licenciatura: alumnoReceived.licenciatura,
            aprobadas: aprobadas,
            reprobadas: reprobadas,
            nocursadas: nocursadas,
            ss: alumnoReceived.ss,
            electivas: alumnoReceived.electivas,
            periodoReprobadas: periodoReprobadas,
        });
        newAlumno.save();

        res.send((newAlumno) ? true: false);
    }

    private async update(req: Request, res: Response){
        const aprobadas: Array<mongoose.Types.ObjectId> = new Array<mongoose.Types.ObjectId>();
        const reprobadas: Array<mongoose.Types.ObjectId> = new Array<mongoose.Types.ObjectId>();
        const periodoReprobadas: Array<{id: String, periodo: String}> = new Array<{id: String, periodo: String}>();
        const nocursadas: Array<mongoose.Types.ObjectId> = new Array<mongoose.Types.ObjectId>();
        const userToEdit: Alumno = req.body.userToEdit;       

        userToEdit.aprobadas.forEach((uaAprobada: UA) =>{
            aprobadas.push(new mongoose.Types.ObjectId(uaAprobada._id));            
        });

        userToEdit.reprobadas.forEach((uaReprobada: UA) =>{
            reprobadas.push(new mongoose.Types.ObjectId(uaReprobada._id));
            periodoReprobadas.push({id:uaReprobada._id , periodo: uaReprobada.periodo});
        });

        userToEdit.nocursadas.forEach((uaNoCursada: UA) =>{
            nocursadas.push(new mongoose.Types.ObjectId(uaNoCursada._id));
        });
       
        const newAlumno = await Alumnos.findByIdAndUpdate(userToEdit._id,{ $set: {
                boleta:userToEdit.boleta,
                contra: userToEdit.contra,
                licenciatura: userToEdit.licenciatura,
                aprobadas: aprobadas,
                reprobadas: reprobadas,
                nocursadas: nocursadas,
                ss: userToEdit.ss,
                electivas: userToEdit.electivas,
                periodoReprobadas: periodoReprobadas,
            }           
        });

        res.send((newAlumno) ? true: false);
    }

    private async delete(req: Request, res: Response){
        const deleted = await Alumnos.findByIdAndDelete(req.params.id);
        res.send((deleted) ? true: false);
    }

    /* Setters y Getters */

    get router(): Router{
        return this._router;
    }
}


const alumnosUsersService= new AlumnosUsersService();

export default alumnosUsersService.router;