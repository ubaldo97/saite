import { Request, Response, Router } from 'express';
import PE from '../../models_mongoose/ua';
import Fecha from '../../../interfaces/fecha';
import mongoose  from 'mongoose';
class EServiceDescripcion{
    public _router: Router;
    

    constructor(){
        this._router= Router();

        this._router.get('/', this.getDesc);
        this._router.put('/', this.updateDesc);

    }

    private async getDesc(req: Request, res: Response){
        let SSTemplate: any;    
        await PE.findOne({licenciatura: -1},(err,_ua) => {
            if (err) {
                res.send('Error')
            }else{
                    SSTemplate = _ua;
                }
        });        
        
        res.json(SSTemplate.descripcion);
    }

    private async updateDesc(req: Request, res: Response){        
        
        const updated = await PE.findOneAndUpdate({licenciatura: -1},{$set: {descripcion: req.body.desc}});

        const updateMany =  await PE.updateMany({periodo: 'electiva'}, {descripcion: req.body.desc});

        res.send((updated) ? true: false);
    }
    
    /* Setters y Getters */

    get router(): Router{
        return this._router;
    }
}


const eServicedescripcion= new EServiceDescripcion();

export default eServicedescripcion.router;