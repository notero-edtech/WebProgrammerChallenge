import next from 'next'
import { config } from './configs'
import { ServerService } from './server'
import { ApiServer } from './apis'
import { Database } from './database'

export interface IPreparer {
    prepare(): Promise<void>
}

/**
 * This all initialize
 * @param preparers is prepare for initialize
 */
async function prepareAll(preparers: IPreparer[]) {
    for (const preparer of preparers) {
        if (!!preparer) await preparer.prepare()
    }
}

/**
 * This Start server and all initailize for each app
 */
export async function start() {
    // Create server instrance
    const server = await ServerService.defaultInstance()
    const db = await Database.defaultInstance()
    const api = await ApiServer.defaultInstance()

    // Create next app
    const app = next({
        dir: __dirname,
        dev: config.isDevelopment
    })

    // all initailize for application
    await prepareAll([db, api, app])

    // register application view by Nextjs
    server.registerApi(api)

    // register application view by Nextjs
    server.registerView(app)

    // Listen server
    server.start()
}