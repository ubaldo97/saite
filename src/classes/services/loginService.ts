import { Request, Response, Router } from 'express';
import Admin from '../../interfaces/admin';
import Alumnos from '../models_mongoose/alumnoUser';
import Admins from '../models_mongoose/adminUser';
import axios from 'axios';
import mongoose  from 'mongoose';

class LoginService{
    
    public router: Router;
    

    constructor(){
        this.router= Router();

        this.router.post('/', this.login);
    }

    private async login(req: Request, res: Response){
        const login: {user: String, pass: String, tipo: Number} = req.body;   
             
        if (login.user === 'root' && login.pass === '') {
            res.json('admin');
        }else if(login.tipo === 0) {

            let valid = false;
            let lic = -1;

            await axios.post('http://148.204.142.2/pump/web/index.php/login',{
                'username':login.user,
                'password':login.pass
            }
            ,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 250220204758'
                }
            }).then(( resGESCO )=> {                     
                if(resGESCO.data.estatus === 'true'){
                    valid = true;
                    switch (resGESCO.data.datos.Carrera) {
                        case 'ING. EN SISTEMAS COMPUTACIONALES':
                            lic = 0;
                            break;
                        case 'ING. AMBIENTAL':
                            lic = 1;
                            break;
                        case 'ING. MECATRÓNICA':
                            lic = 2;
                            break;
                        case 'ING. EN ALIMENTOS':
                            lic = 3;
                            break;
                        case 'ING. METALUÚRGICA':
                            lic = 4;
                            break;
                        default:
                            lic = -1;
                            break;
                    }
                }
            });
            
            let exist = false;
            if (valid){
                await Alumnos.findOne({boleta: login.user, contra: login.pass}, (err,al) => {
                    if (err) {
                        res.json('404');
                    }else if(al){
                        exist = true;
                    }
                });
            }    
            
            if (valid && !exist) {
                const newAlumno = await new Alumnos({
                    _id: new mongoose.Types.ObjectId(),
                    boleta:login.user,
                    contra: login.pass,
                    licenciatura: lic,
                    aprobadas: [],
                    reprobadas: [],
                    nocursadas: [],
                    ss: false,
                    electivas: false,
                    periodoReprobadas:[]
                });
                newAlumno.save();
                (newAlumno!==null) ? res.json('alumno') : res.json('404');    
            }else if (valid && exist){
                res.json('alumno');
            }else{
                res.json('404');
            }
        }else if(login.tipo === 1){
            const query = await Admins.findOne({correo: login.user, contra: login.pass});
            const admin: Admin = JSON.parse(JSON.stringify(query));           
            if (admin!==null) {
                switch (admin.tipo) {
                    case 0:
                        res.json('pe');
                        break;

                    case 1:
                        res.json('electivas');
                        break;

                    case 2:
                        res.json('ss');
                        break;
                
                    default:
                        break;
                }
            } else {
                res.json('404');
            }
        }else{
            res.json('404');
        }       
   }
}


const loginService= new LoginService();

export default loginService.router;