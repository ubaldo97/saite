import { Request, Response, Router } from 'express';
import PE from '../../models_mongoose/ua';
import Fecha from '../../../interfaces/fecha';
class SSServiceDescripcion{
    public _router: Router;
    

    constructor(){
        this._router= Router();

        this._router.get('/', this.getDesc);
        this._router.put('/', this.updateDesc);

    }

    private async getDesc(req: Request, res: Response){
        let SSTemplate: any;    
        await PE.findOne({licenciatura: -2},(err,_ua) => {
            if (err) {
                res.send('Error')
            }else{
                    SSTemplate = _ua;
                }
        });        
        
        res.json(SSTemplate.descripcion);
    }

    private async updateDesc(req: Request, res: Response){        
        const updated = await PE.findOneAndUpdate({licenciatura: -2},{$set: {descripcion: req.body.desc}});
        res.send((updated) ? true: false);
    }
    
    /* Setters y Getters */

    get router(): Router{
        return this._router;
    }
}


const ssServicedescripcion= new SSServiceDescripcion();

export default ssServicedescripcion.router;