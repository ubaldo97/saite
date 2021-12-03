import { Router, Request, Response } from "express";
import Alumnos from '../../models_mongoose/alumnoUser'
import Alumno from '../../../interfaces/alumno';
import UA from "../../../interfaces/ua";
import Escenario from "../../../interfaces/escenario";

class TrayectoriaService{

    public _router: Router;

    constructor(){
        this._router= Router();

        this._router.post('/', this.getRecomendation);
    }

    private async getRecomendation(req: Request, res: Response){

        const par = (semestres: Array<number>) => {
            let semPar = -1;
            semestres.forEach((sem)=> {
                if(sem %2 === 0){
                    semPar = sem;
                }
            });
            return semPar;
        }

        const impar = (semestres: Array<number>) => {
            let semPar = -1;
            semestres.forEach((sem)=> {
                if(sem %2 !== 0){
                    semPar = sem;
                }
            });
            return semPar;
        }

        const lowerSem = (sems: Array<number>): number => {
            let lowerSem = 17;
            sems.forEach((sem) => {
                if (sem < lowerSem){
                    lowerSem = sem;
                }
            });
            return lowerSem;
        }

        let _escenario: Escenario= {
            totalCreditos: 0,
            cargas: {min: 0, med: 0, max: 0},
            ss:-2,
            electivas: 0,
            recomendacion:[],
            aprobadas:[],
            advertencia: []
        };
        
        _escenario.totalCreditos = req.body.total;
        _escenario.cargas = req.body.cargas;

        const alumno: Alumno = req.body.alumno;          
        const aprobadas: Array<UA> = alumno.aprobadas;
        const reprobadas: Array<UA> = alumno.reprobadas;
        const nocursadas: Array<UA> = alumno.nocursadas;     
        

        //Variables necesarias para los calculos
        let totalCreditosAprobados: number = 0;
        let totalCreditosElectivas: number = 0;
        let totalCreditosElectivasAprobadas: number = 0;
        let ssStatus: boolean = false;
        aprobadas.forEach((ua: UA)=>{  
            //Sirve para verificar si el SS ya está acreditado
            if (ua.licenciatura==-2){ ssStatus=true }
            //Sirve para calcular el total de créditos ya liberados
            //Nota: Las unidades electivas no cuentan dentro del total de créditos liberados
            if (ua.periodo!=='electiva')
            {totalCreditosAprobados+= ua.creditos}else
            {totalCreditosElectivas+=ua.creditos; totalCreditosElectivasAprobadas+=ua.creditos}
        });
        //Sirve, junto con el for each anterior para calcular el total de creditos de las unidades electivas
        //Teniendo ese total se puede calcular el porcentaje aprobado
        nocursadas.forEach((ua: UA)=>{if (ua.periodo==='electiva'){totalCreditosElectivas+=ua.creditos}});
        //___________________________________________Cálculo de servicio social
        //-----------------------------1: ya acreditado o a tiempo para acreditarse
        //-----------------------------0: aún no es muy tarde para acreditarse
        //--------------------------(-1): ya es tarde
        let porcentajeAprobado: number = ((totalCreditosAprobados*100)/_escenario.totalCreditos);       
        if (!ssStatus){//Se entra aquí solo en caso de que no se haya liberado aún el SS
            switch (true) {
                case porcentajeAprobado>90: _escenario.ss = -1; break;
                case porcentajeAprobado>85: _escenario.ss = 0; break;
                case porcentajeAprobado>75: _escenario.ss = 1; break;
                default: _escenario.ss = -2; break;
            }
        }else { _escenario.ss = 1 }
        //-------------------------------------------Cálculo de servicio social
                
        //___________________________________________Cálculo de Electivas
        //------------------------------El número que se regresa en la respuesta es un valor del 1 al 99
        //------------------------------que representa el porcentaje de creditos aprobados de unidades
        //------------------------------electivas
        _escenario.electivas = ((totalCreditosElectivasAprobadas*100)/totalCreditosElectivas);
        if (_escenario.electivas === 0){ _escenario.electivas= 4;} 
        if (_escenario.electivas === 100){ _escenario.electivas= 99;} 
        
        //-------------------------------------------Cálculo de Electivas

        //___________________________________________Clasificación del alumno
        let mesDeConsulta: number = new Date().getMonth()+1;        
        let ofertaSiguienteSemestre: {noCursadas: Array<UA>; reprobadas: Array<UA>}
         = {noCursadas:[], reprobadas:[]};

        if(mesDeConsulta <= 6) {//La consulta se esta realizando entre Enero y Junio
            nocursadas.forEach((ua:UA)=>{
                //Sirve para buscar las UAs qué el alumno aún no ha cursado
                //y qué se oferten en semestres impares
                //Nota: todos los semestres impares son en Agosot-Diciembre
                if (ua.semestres.some(sem => sem % 2 !== 0)){
                    ofertaSiguienteSemestre.noCursadas.push(ua);
                }
            }); 
            
            reprobadas.forEach((ua:UA)=>{
                //Sirve para buscar las UAs qué el alumno aún no ha cursado
                //y qué se oferten en semestres impares
                //Nota: todos los semestres impares son en Agosot-Diciembre
                if (ua.semestres.some(sem => sem % 2 !== 0)){
                    ofertaSiguienteSemestre.reprobadas.push(ua);
                }
            }); 
            

            //Ordenar las UAs ofertadas el siguiente semestre de semestre más bajo a semestre más alto
            ofertaSiguienteSemestre.noCursadas.sort((ua1: UA, ua2: UA) => 
                (impar(ua1.semestres) > impar(ua2.semestres)) ? 1 : -1
            );
            ofertaSiguienteSemestre.reprobadas.sort((ua1: UA, ua2: UA) => 
                (impar(ua1.semestres) > impar(ua2.semestres)) ? 1 : -1
            );
        }else{//La consulta se esta realizando entre Julio y Diciembre
            nocursadas.forEach((ua:UA)=>{
                //Sirve para buscar las UAs qué el alumno aún no ha cursado
                //y qué se oferten en semestres pares
                //Nota: todos los semestres pares son en Enero-Julio
                if (ua.semestres.some(sem => sem % 2 === 0)){
                    ofertaSiguienteSemestre.noCursadas.push(ua);
                }
            }); 

            reprobadas.forEach((ua:UA)=>{
                //Sirve para buscar las UAs qué el alumno aún no ha cursado
                //y qué se oferten en semestres impares
                //Nota: todos los semestres impares son en Agosot-Diciembre
                if (ua.semestres.some(sem => sem % 2 === 0)){
                    ofertaSiguienteSemestre.reprobadas.push(ua);
                }
            }); 

            //Ordenar las UAs ofertadas el siguiente semestre de semestre más bajo a semestre más alto
            ofertaSiguienteSemestre.noCursadas.sort((ua1: UA, ua2: UA) => 
                (par(ua1.semestres) > par(ua2.semestres)) ? 1 : -1
            );
            ofertaSiguienteSemestre.reprobadas.sort((ua1: UA, ua2: UA) => 
                (par(ua1.semestres) > par(ua2.semestres)) ? 1 : -1
            );
        }
            let recomendacion: Array<UA> = [];

            nocursadas.forEach((ua:UA)=>{if(ua.periodo==='electiva'){recomendacion.push(ua)}});
            nocursadas.forEach((ua: UA)=>{if(ua.licenciatura===-2 && porcentajeAprobado>=75){recomendacion.push(ua)}});

            let creditosInscritos: number = 0;
            if (reprobadas.length==0){
                //__________Alumno Regular
                ofertaSiguienteSemestre.noCursadas.forEach((ua: UA)=>{
                    if((creditosInscritos+ua.creditos)<=_escenario.cargas.med){
                        creditosInscritos+=ua.creditos;
                        recomendacion.push(ua);
                    }
                });

                _escenario.advertencia.push(((creditosInscritos<_escenario.cargas.min) ?  2 : 1))
                
                //----------Alumno Regular
            }else {
                //__________Alumno Irregular
                let _desfasado = false;
                let _date = new Date();
                let _year = _date.getFullYear() - 2000;
                const _periodoActual: {year: number; id: String} = 
                ((_date.getMonth() + 1) >= 7) ? {year:_year+1, id: '1'} : {year:_year, id: '2'};
                let _periodoReprobado: {year: number; id: String};

                let desfasadas: Array<UA> = [];       
                reprobadas.forEach((ua: UA)=>{                    
                    let _split = ua.periodo.split('/');
                    _periodoReprobado= {year: +_split[0], id: _split[1]};
                    if (_periodoActual.id ==='2'){
                        if (_periodoActual.year>_periodoReprobado.year){
                            console.log(ua.titulo);
                            _desfasado = true;
                            desfasadas.push(ua);
                        }
                    }else{                        
                        if (_periodoReprobado.id === '2'){
                            if(_periodoReprobado.year !== _periodoActual.year-1){
                                _desfasado = true;
                                desfasadas.push(ua);
                            }
                        }else{
                            _desfasado = true;
                            desfasadas.push(ua);
                        }
                    }
                });

                desfasadas.forEach((desfasada: UA)=>{
                    ofertaSiguienteSemestre.reprobadas.forEach((reprobada:UA) => {
                        if(reprobada === desfasada){
                            ofertaSiguienteSemestre.reprobadas.splice(ofertaSiguienteSemestre.reprobadas.indexOf(reprobada),1);
                        }
                    });
                });
                
                if (!_desfasado){
                    ofertaSiguienteSemestre.reprobadas.forEach((ua: UA)=>{
                        creditosInscritos+=ua.creditos;
                        recomendacion.push(ua);
                    });
                    ofertaSiguienteSemestre.noCursadas.forEach((ua: UA)=>{
                        if((creditosInscritos+ua.creditos)<=_escenario.cargas.med){
                            creditosInscritos+=ua.creditos;
                            recomendacion.push(ua);
                        }
                    });

                    _escenario.advertencia.push(
                        ((creditosInscritos<_escenario.cargas.min) ?  4 : 3)
                    );
                }else{
                    desfasadas.forEach((ua: UA)=>{
                        creditosInscritos+=ua.creditos;
                        recomendacion.push(ua);
                    });
                    ofertaSiguienteSemestre.reprobadas.forEach((ua: UA)=>{
                        creditosInscritos+=ua.creditos;
                        recomendacion.push(ua);
                    });
                    _escenario.advertencia.push(5);
                }
                //----------Alumno Irregular
            }

            _escenario.recomendacion = recomendacion;

            aprobadas.sort((ua1: UA, ua2: UA) => 
                (lowerSem(ua1.semestres) < lowerSem(ua2.semestres)) ? 1 : -1
            );

            aprobadas.forEach((ua: UA) =>{_escenario.aprobadas.push(ua)});
            
        //-------------------------------------------Clasificación del alumno

        //-------------------------------------------Clasificación del alumno
        //*******************************************Clasificación del alumno    
        res.json(_escenario);               
    }

    get router(): Router{
        return this._router;
    }
}

const trayectoriaService = new TrayectoriaService()

export default trayectoriaService;