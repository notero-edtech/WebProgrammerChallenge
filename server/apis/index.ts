import express, { IRouter } from 'express'
import { IPreparer } from '@App/bootstraper'

export class ApiServer implements IPreparer {

    private static _defaultInstance?: ApiServer

    private readonly _app: IRouter

    public static async defaultInstance(): Promise<ApiServer> {
        if (!this._defaultInstance) {
            this._defaultInstance = new ApiServer()
        }

        return this._defaultInstance
    }

    constructor() {
        this._app = express.Router()
    }

    public get router() {
        return this._app
    }

    /**
     * do prepare task for API Server here before start application
     */
    public async prepare() {
        // exemple route
        this._app.get('/', (req, res) => res.send('Hello world, API Server'))

        // add route here
    }
}