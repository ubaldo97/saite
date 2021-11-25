"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TrayectoriaService = /** @class */ (function () {
    function TrayectoriaService() {
        this._router = (0, express_1.Router)();
        this._router.post('/', this.getRecomendation);
    }
    TrayectoriaService.prototype.getRecomendation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var par, impar, lowerSem, _escenario, alumno, aprobadas, reprobadas, nocursadas, totalCreditosAprobados, totalCreditosElectivas, totalCreditosElectivasAprobadas, ssStatus, porcentajeAprobado, mesDeConsulta, ofertaSiguienteSemestre, recomendacion, creditosInscritos, _desfasado_1, _date, _year, _periodoActual_1, _periodoReprobado_1, desfasadas_1;
            return __generator(this, function (_a) {
                par = function (semestres) {
                    var semPar = -1;
                    semestres.forEach(function (sem) {
                        if (sem % 2 === 0) {
                            semPar = sem;
                        }
                    });
                    return semPar;
                };
                impar = function (semestres) {
                    var semPar = -1;
                    semestres.forEach(function (sem) {
                        if (sem % 2 !== 0) {
                            semPar = sem;
                        }
                    });
                    return semPar;
                };
                lowerSem = function (sems) {
                    var lowerSem = 17;
                    sems.forEach(function (sem) {
                        if (sem < lowerSem) {
                            lowerSem = sem;
                        }
                    });
                    return lowerSem;
                };
                _escenario = {
                    totalCreditos: 0,
                    cargas: { min: 0, med: 0, max: 0 },
                    ss: -2,
                    electivas: 0,
                    recomendacion: [],
                    aprobadas: [],
                    advertencia: []
                };
                _escenario.totalCreditos = req.body.total;
                _escenario.cargas = req.body.cargas;
                alumno = req.body.alumno;
                aprobadas = alumno.aprobadas;
                reprobadas = alumno.reprobadas;
                nocursadas = alumno.nocursadas;
                totalCreditosAprobados = 0;
                totalCreditosElectivas = 0;
                totalCreditosElectivasAprobadas = 0;
                ssStatus = false;
                aprobadas.forEach(function (ua) {
                    //Sirve para verificar si el SS ya está acreditado
                    if (ua.licenciatura == -2) {
                        ssStatus = true;
                    }
                    //Sirve para calcular el total de créditos ya liberados
                    //Nota: Las unidades electivas no cuentan dentro del total de créditos liberados
                    if (ua.periodo !== 'electiva') {
                        totalCreditosAprobados += ua.creditos;
                    }
                    else {
                        totalCreditosElectivas += ua.creditos;
                        totalCreditosElectivasAprobadas += ua.creditos;
                    }
                });
                //Sirve, junto con el for each anterior para calcular el total de creditos de las unidades electivas
                //Teniendo ese total se puede calcular el porcentaje aprobado
                nocursadas.forEach(function (ua) { if (ua.periodo === 'electiva') {
                    totalCreditosElectivas += ua.creditos;
                } });
                porcentajeAprobado = ((totalCreditosAprobados * 100) / _escenario.totalCreditos);
                if (!ssStatus) { //Se entra aquí solo en caso de que no se haya liberado aún el SS
                    switch (true) {
                        case porcentajeAprobado > 90:
                            _escenario.ss = -1;
                            break;
                        case porcentajeAprobado > 85:
                            _escenario.ss = 0;
                            break;
                        case porcentajeAprobado > 75:
                            _escenario.ss = 1;
                            break;
                        default:
                            _escenario.ss = -2;
                            break;
                    }
                }
                else {
                    _escenario.ss = 1;
                }
                //-------------------------------------------Cálculo de servicio social
                //___________________________________________Cálculo de Electivas
                //------------------------------El número que se regresa en la respuesta es un valor del 1 al 99
                //------------------------------que representa el porcentaje de creditos aprobados de unidades
                //------------------------------electivas
                _escenario.electivas = ((totalCreditosElectivasAprobadas * 100) / totalCreditosElectivas);
                if (_escenario.electivas === 0) {
                    _escenario.electivas = 4;
                }
                if (_escenario.electivas === 100) {
                    _escenario.electivas = 99;
                }
                mesDeConsulta = new Date().getMonth() + 1;
                ofertaSiguienteSemestre = { noCursadas: [], reprobadas: [] };
                if (mesDeConsulta <= 6) { //La consulta se esta realizando entre Enero y Junio
                    nocursadas.forEach(function (ua) {
                        //Sirve para buscar las UAs qué el alumno aún no ha cursado
                        //y qué se oferten en semestres impares
                        //Nota: todos los semestres impares son en Agosot-Diciembre
                        if (ua.semestres.some(function (sem) { return sem % 2 !== 0; })) {
                            ofertaSiguienteSemestre.noCursadas.push(ua);
                        }
                    });
                    reprobadas.forEach(function (ua) {
                        //Sirve para buscar las UAs qué el alumno aún no ha cursado
                        //y qué se oferten en semestres impares
                        //Nota: todos los semestres impares son en Agosot-Diciembre
                        if (ua.semestres.some(function (sem) { return sem % 2 !== 0; })) {
                            ofertaSiguienteSemestre.reprobadas.push(ua);
                        }
                    });
                    //Ordenar las UAs ofertadas el siguiente semestre de semestre más bajo a semestre más alto
                    ofertaSiguienteSemestre.noCursadas.sort(function (ua1, ua2) {
                        return (impar(ua1.semestres) > impar(ua2.semestres)) ? 1 : -1;
                    });
                    ofertaSiguienteSemestre.reprobadas.sort(function (ua1, ua2) {
                        return (impar(ua1.semestres) > impar(ua2.semestres)) ? 1 : -1;
                    });
                }
                else { //La consulta se esta realizando entre Julio y Diciembre
                    nocursadas.forEach(function (ua) {
                        //Sirve para buscar las UAs qué el alumno aún no ha cursado
                        //y qué se oferten en semestres pares
                        //Nota: todos los semestres pares son en Enero-Julio
                        if (ua.semestres.some(function (sem) { return sem % 2 === 0; })) {
                            ofertaSiguienteSemestre.noCursadas.push(ua);
                        }
                    });
                    reprobadas.forEach(function (ua) {
                        //Sirve para buscar las UAs qué el alumno aún no ha cursado
                        //y qué se oferten en semestres impares
                        //Nota: todos los semestres impares son en Agosot-Diciembre
                        if (ua.semestres.some(function (sem) { return sem % 2 === 0; })) {
                            ofertaSiguienteSemestre.reprobadas.push(ua);
                        }
                    });
                    //Ordenar las UAs ofertadas el siguiente semestre de semestre más bajo a semestre más alto
                    ofertaSiguienteSemestre.noCursadas.sort(function (ua1, ua2) {
                        return (par(ua1.semestres) > par(ua2.semestres)) ? 1 : -1;
                    });
                    ofertaSiguienteSemestre.reprobadas.sort(function (ua1, ua2) {
                        return (par(ua1.semestres) > par(ua2.semestres)) ? 1 : -1;
                    });
                }
                recomendacion = [];
                nocursadas.forEach(function (ua) { if (ua.periodo === 'electiva') {
                    recomendacion.push(ua);
                } });
                nocursadas.forEach(function (ua) { if (ua.licenciatura === -2 && porcentajeAprobado >= 75) {
                    recomendacion.push(ua);
                } });
                creditosInscritos = 0;
                if (reprobadas.length == 0) {
                    //__________Alumno Regular
                    ofertaSiguienteSemestre.noCursadas.forEach(function (ua) {
                        if ((creditosInscritos + ua.creditos) <= _escenario.cargas.med) {
                            creditosInscritos += ua.creditos;
                            recomendacion.push(ua);
                        }
                    });
                    _escenario.advertencia.push(((creditosInscritos < _escenario.cargas.min) ? 2 : 1));
                    //----------Alumno Regular
                }
                else {
                    _desfasado_1 = false;
                    _date = new Date();
                    _year = _date.getFullYear() - 2000;
                    _periodoActual_1 = ((_date.getMonth() + 1) >= 7) ? { year: _year + 1, id: '1' } : { year: _year, id: '2' };
                    desfasadas_1 = [];
                    reprobadas.forEach(function (ua) {
                        var _split = ua.periodo.split('/');
                        _periodoReprobado_1 = { year: +_split[0], id: _split[1] };
                        if (_periodoActual_1.id === '2') {
                            if (_periodoActual_1.year > _periodoReprobado_1.year) {
                                console.log(ua.titulo);
                                _desfasado_1 = true;
                                desfasadas_1.push(ua);
                            }
                        }
                        else {
                            if (_periodoReprobado_1.id === '2') {
                                if (_periodoReprobado_1.year !== _periodoActual_1.year - 1) {
                                    _desfasado_1 = true;
                                    desfasadas_1.push(ua);
                                }
                            }
                            else {
                                _desfasado_1 = true;
                                desfasadas_1.push(ua);
                            }
                        }
                    });
                    desfasadas_1.forEach(function (desfasada) {
                        ofertaSiguienteSemestre.reprobadas.forEach(function (reprobada) {
                            if (reprobada === desfasada) {
                                ofertaSiguienteSemestre.reprobadas.splice(ofertaSiguienteSemestre.reprobadas.indexOf(reprobada), 1);
                            }
                        });
                    });
                    if (!_desfasado_1) {
                        ofertaSiguienteSemestre.reprobadas.forEach(function (ua) {
                            creditosInscritos += ua.creditos;
                            recomendacion.push(ua);
                        });
                        ofertaSiguienteSemestre.noCursadas.forEach(function (ua) {
                            if ((creditosInscritos + ua.creditos) <= _escenario.cargas.med) {
                                creditosInscritos += ua.creditos;
                                recomendacion.push(ua);
                            }
                        });
                        _escenario.advertencia.push(((creditosInscritos < _escenario.cargas.min) ? 4 : 3));
                    }
                    else {
                        desfasadas_1.forEach(function (ua) {
                            creditosInscritos += ua.creditos;
                            recomendacion.push(ua);
                        });
                        ofertaSiguienteSemestre.reprobadas.forEach(function (ua) {
                            creditosInscritos += ua.creditos;
                            recomendacion.push(ua);
                        });
                        _escenario.advertencia.push(5);
                    }
                    //----------Alumno Irregular
                }
                _escenario.recomendacion = recomendacion;
                aprobadas.sort(function (ua1, ua2) {
                    return (lowerSem(ua1.semestres) < lowerSem(ua2.semestres)) ? 1 : -1;
                });
                aprobadas.forEach(function (ua) { _escenario.aprobadas.push(ua); });
                //-------------------------------------------Clasificación del alumno
                //-------------------------------------------Clasificación del alumno
                //*******************************************Clasificación del alumno    
                res.json(_escenario);
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(TrayectoriaService.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    return TrayectoriaService;
}());
var trayectoriaService = new TrayectoriaService();
exports.default = trayectoriaService;
