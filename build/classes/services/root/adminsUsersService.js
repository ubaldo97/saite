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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminUser_1 = __importDefault(require("../../models_mongoose/adminUser"));
class AdminsUsersService {
    constructor() {
        this._router = express_1.Router();
        this._router.get('/', this.getAll);
        this._router.post('/', this.create);
        this._router.put('/', this.update);
        this._router.delete('/:id', this.delete);
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield adminUser_1.default.find();
            res.json(users);
        });
    }
    create(req, res) {
        const newUser = new adminUser_1.default(req.body.newUser);
        newUser.save();
        res.send((newUser) ? true : false);
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToEdit = req.body.userToEdit;
            const { _id } = userToEdit, userWithoutId = __rest(userToEdit, ["_id"]);
            const edited = yield adminUser_1.default.findByIdAndUpdate(userToEdit._id, userWithoutId);
            res.send((edited) ? true : false);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield adminUser_1.default.findByIdAndDelete(req.params.id);
            res.send((deleted) ? true : false);
        });
    }
    /* Setters y Getters */
    get router() {
        return this._router;
    }
}
const adminsUsersService = new AdminsUsersService();
exports.default = adminsUsersService.router;
