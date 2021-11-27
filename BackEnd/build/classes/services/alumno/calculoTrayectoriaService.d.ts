import { Router } from "express";
declare class TrayectoriaService {
    _router: Router;
    constructor();
    private getRecomendation;
    get router(): Router;
}
declare const trayectoriaService: TrayectoriaService;
export default trayectoriaService;
