import { Request, Response, Router } from 'express';
import PE from '../../models_mongoose/ua';
import Fecha from '../../../interfaces/fecha';
class EServiceFechas{

    public _router: Router;
    

    constructor(){
        this._router= Router();

        this._router.get('/', this.getAll);
        this._router.post('/', this.create);
        this._router.put('/', this.update);
        this._router.delete('/:id',this.delete);
    }

    private async getAll(req: Request, res: Response){

        let SSTemplate: any;    
        await PE.findOne({licenciatura: -1},(err,_ua) => {
            if (err) {
                res.send('Error')
            }else{
                    SSTemplate = _ua;
                }
        });        
        res.send(SSTemplate.fechas);
    } 

    private async create(req: Request, res: Response){

        const stringDate: string = req.body.date;
        const newDate: Fecha = {fecha: new Date(JSON.parse(stringDate))};
        let SSTemplate: any;    
        await PE.findOne({licenciatura: -1},(err,_ua) => {
            if (err) {
                res.send('Error')
            }else{
                    SSTemplate = _ua;
                }
        });

        const fechasModificadas: Array<Fecha> = SSTemplate.fechas;        
        fechasModificadas.push(newDate);

        const update = await PE.findOneAndUpdate({licenciatura: -1},{$set: {fechas: fechasModificadas}});
        const updateMany =  await PE.updateMany({periodo: 'electiva'}, {fechas: fechasModificadas});
        
        res.send((update) ? true: false);
    }

    private async update(req: Request, res: Response){

        const editedDate: any =  req.body.date;       
        
        let SSTemplate: any;    
        await PE.findOne({licenciatura: -1},(err,_ua) => {
            if (err) {
                res.send('Error')
            }else{
                    SSTemplate = _ua;
                }
        });

        const dates: any = SSTemplate.fechas;
        
        

        dates.forEach((date: any) => {
            (JSON.stringify(date._id) === JSON.stringify(editedDate._id)) ? 
                date.fecha = editedDate.fecha: console.log(false);
        });

        const update = await PE.findOneAndUpdate({licenciatura: -1},{$set: {fechas: dates}});

        const updateMany =  await PE.updateMany({periodo: 'electiva'}, {fechas: dates});
        
        res.send((update) ? true: false);
    }

    private async delete(req: Request, res: Response){

        const idToDelete = JSON.stringify(req.params.id);
        let SSTemplate: any;    
        await PE.findOne({licenciatura: -1},(err,_ua) => {
            if (err) {
                res.send('Error')
            }else{
                    SSTemplate = _ua;
                }
        });

        const dates: any[] = SSTemplate.fechas;
        const index = dates.findIndex((date: any) => JSON.stringify(date._id)===idToDelete);
        
        dates.splice(index,1);
        
        const update = await PE.findOneAndUpdate({licenciatura: -1},{$set: {fechas: dates}});
        const updateMany =  await PE.updateMany({periodo: 'electiva'}, {fechas: dates});
        
        res.send((update) ? true: false);
    }

    /* Setters y Getters */

    get router(): Router{
        return this._router;
    }
}


const eServiceFechas= new EServiceFechas();

export default eServiceFechas.router;