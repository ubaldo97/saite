import { Request, Response, Router } from 'express';
import PE from '../../models_mongoose/ua';
import { Requisito } from '../../../interfaces/requisito';
class EServiceReq{

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
        res.send(SSTemplate.requisitos);
    } 

    private async create(req: Request, res: Response){

        const newReq: Requisito = {req : req.body.req};
        let SSTemplate: any;    
        await PE.findOne({licenciatura: -1},(err,_ua) => {
            if (err) {
                res.send('Error')
            }else{
                    SSTemplate = _ua;
                }
        });

        const reqsModificados: Array<Requisito> = SSTemplate.requisitos;        
        reqsModificados.push(newReq);

        const update = await PE.findOneAndUpdate({licenciatura: -1},{$set: {requisitos: reqsModificados}});
        const updateMany =  await PE.updateMany({periodo: 'electiva'}, {requisitos: reqsModificados});
        res.send((update) ? true: false);
    }

    private async update(req: Request, res: Response){

        const editedReq: any =  req.body.req;       
        
        let SSTemplate: any;    
        await PE.findOne({licenciatura: -1},(err,_ua) => {
            if (err) {
                res.send('Error')
            }else{
                    SSTemplate = _ua;
                }
        });

        const reqs: any = SSTemplate.requisitos;
        
        reqs.forEach((requirement: any) => {
            (JSON.stringify(requirement._id) === JSON.stringify(editedReq._id)) ? 
                requirement.req = editedReq.req: console.log(false);
        });

        const update = await PE.findOneAndUpdate({licenciatura: -1},{$set: {requisitos: reqs}});
        const updateMany =  await PE.updateMany({periodo: 'electiva'}, {requisitos: reqs});
        
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

        const reqs: any[] = SSTemplate.requisitos;
        const index = reqs.findIndex((req: any) => JSON.stringify(req._id)===idToDelete);
        
        reqs.splice(index,1);
        
        const update = await PE.findOneAndUpdate({licenciatura: -1},{$set: {requisitos: reqs}});
        const updateMany =  await PE.updateMany({periodo: 'electiva'}, {requisitos: reqs});
        
        res.send((update) ? true: false);
    }

    /* Setters y Getters */

    get router(): Router{
        return this._router;
    }
}


const eServiceReq= new EServiceReq();

export default eServiceReq.router;