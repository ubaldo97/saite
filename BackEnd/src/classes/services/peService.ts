import { Request, Response, Router } from 'express';
import * as mongoose  from 'mongoose';
import PE from '../models_mongoose/ua';
import UA from '../../interfaces/ua';
import ua from '../models_mongoose/ua';
class PEService{
    
    public _router: Router;

    constructor(){
        this._router= Router();

        this._router.get('/', this.getAll);
        this._router.get('/sis/', this.getSistemas);
        this._router.get('/amb/', this.getAmbiental);
        this._router.get('/mec/', this.getMecatronica);
        this._router.get('/ali/', this.getAlimentos);
        this._router.get('/met/', this.getMetalurgia);
        this._router.get('/ss/', this.getSS);
        this._router.post('/', this.create);
        this._router.put('/', this.update);
        this._router.delete('/:id', this.delete);
    }

    private async getAll(req: Request, res: Response){
        const uas = await PE.find();
        res.json(uas);
    }

    private async getSS(req: Request, res: Response){

        const ss = await PE.findOne({titulo: 'PlantillaSS'});
        res.json(ss);
    }

    private async getSistemas(req: Request, res: Response){
        const uas = await PE.find({licenciatura: 0}).populate('dependencia');
        res.json(uas);
    }

    private async getAmbiental(req: Request, res: Response){
        const uas = await PE.find({licenciatura: 1}).populate('dependencia');
        res.json(uas);
    }

    private async getMecatronica(req: Request, res: Response){
        const uas = await PE.find({licenciatura: 2}).populate('dependencia');
        res.json(uas);
    }

    private async getAlimentos(req: Request, res: Response){
        const uas = await PE.find({licenciatura: 3}).populate('dependencia');
        res.json(uas);
    }

    private async getMetalurgia(req: Request, res: Response){
        const uas = await PE.find({licenciatura: 4}).populate('dependencia');
        res.json(uas);
    }

    private async create(req: Request, res: Response){
        const uaReceived = req.body.newUA;
        uaReceived._id = new mongoose.Types.ObjectId();
        if(uaReceived.periodo === 'electiva')
        {
            let SSTemplate: any;  
            await PE.findOne({licenciatura: -1},(err,_ua) => {
                if (err) {
                    res.send('Error')
                }else{
                        SSTemplate = _ua;
                    }
            });
    
            const dependencia = SSTemplate.dependencia;    
            uaReceived.descripcion = SSTemplate.descripcion;
            uaReceived.fechas = SSTemplate.fechas;
            uaReceived.requisitos = SSTemplate.requisitos;       
    
            await PE.findOneAndUpdate({licenciatura: -1},{$set: {dependencia: dependencia}});
        }

        const newUA = new PE(uaReceived);
        newUA.save();
        res.send((newUA) ? true : false );
    }

    private async update(req: Request, res: Response){        
        const uaToEdit: UA = req.body.uaToEdit;
        const edited = await PE.findByIdAndUpdate(uaToEdit._id,uaToEdit);
        res.send((edited) ? true : false );
        
    }

    private async delete(req: Request, res: Response){
        const deleted = await PE.findByIdAndDelete(req.params.id); 

        let SSTemplate: any;  
        await PE.findOne({licenciatura: -1},(err,_ua) => {
            if (err) {
                res.send('Error')
            }else{
                    SSTemplate = _ua;
                }
        });

        const dependencia: any[] = SSTemplate.dependencia;    
            
        const finded = dependencia.find((id: any) => JSON.stringify(id) === JSON.stringify(req.params.id));
        
        if(finded){
            dependencia.splice(dependencia.indexOf(finded),1);
            
            await PE.findOneAndUpdate({licenciatura: -1},{$set: {dependencia: dependencia}});
        }

        
        res.send((deleted) ? true : false );
    }

    /* Setters y Getters */

    get router(): Router{
        return this._router;
    }
}


const peService= new PEService();

export default peService.router;