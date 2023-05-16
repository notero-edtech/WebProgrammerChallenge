import express, { Application } from 'express'
import http from 'http'
import { parse } from 'url'
import { NextServer } from 'next/dist/server/next'
import { config } from './configs'
import { ApiServer } from './apis'

export class ServerService {
    private static _defaultInstance: ServerService

    private readonly _app: Application
    private readonly _server: http.Server

    private _isApiRegistered = false

    /**
     * This singleton for default instance
     * @returns default instance for server service
     */
    public static async defaultInstance() {
        if (!this._defaultInstance) {
            this._defaultInstance = new ServerService()
        }

        return this._defaultInstance
    }

    constructor() {
        // Get cache express application
        this._app = express()

        // Create Http server for socket.io
        this._server = http.createServer(this._app)
    }

    public registerApi(apis: ApiServer) {
        this._app.use('/api', apis.router)
        this._isApiRegistered = true
    }

    /**
     * This register view of nextjs for custom server side
     * @param app is next js application for custom server side
     */
    public registerView(app: NextServer) {
        if (!this._isApiRegistered) {
            console.log("[warning] you just register view before /api. this will make api path unable to reach from UI")
        }

        // Get request handler of nextjs application
        const handler = app.getRequestHandler()

        // Handler request, response for nextjs application
        this._app.all("*", async (req, res) => {
            const url = parse(req.url, true)
            await handler(req, res, url)
        })
    }

    /**
     * This listen server as default port
     */
    public start() {
        this._server.listen(config.defaultPort, () => {
            console.log(`[Server service] Application start on port: ${config.defaultPort}`)
        })
    }
}