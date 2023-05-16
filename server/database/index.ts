import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { RepositoryProvider } from '@App/database/types'
import { config } from '@App/configs'

/**
 * Datastore factory type
 */
type DatabaseStore = {}

/**
 * Database is singleton connection database connection class which also support
 * datastore factory
 */
export class Database implements RepositoryProvider {

    /**
     * We only support MySQL
     */
    private static _defaultConnectionOption: MysqlConnectionOptions = {
        type: "mysql",
        host: config.dbHostname,
        username: config.dbUsername,
        password: config.dbPassword,
        database: config.dbDatabase,
        port: config.dbPort,
        entities: [__dirname + '/entities/*.ts'],
        migrations: [__dirname + '/migrates/*.ts'],
        synchronize: false,
        logging: ['migration', 'warn', 'error']
    }

    private static _deafultInstance: Database

    private _dataSource: DataSource
    private _stores: DatabaseStore | null = null

    public static async defaultInstance(): Promise<Database> {
        if (!this._deafultInstance) {
            /**
             * Lazy connection initialize on call
             */
            const dataSource = new DataSource(this._defaultConnectionOption)

            this._deafultInstance = new Database(dataSource)
        }

        return this._deafultInstance
    }

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource
    }

    public get stores() {
        if (this._stores === null) {
            throw new Error('unable to access store, make sure you already run initialStore before access it')
        }

        return this._stores
    }

    public async prepare() {
        console.log('[Database] initialize database')
        await this._dataSource.initialize()
        console.log('[Database] start migrate database...')
        await this._dataSource.runMigrations()
        console.log('[Database] database migration done')
        this.initialStores()
    }

    public getRepository<T extends ObjectLiteral>(entities: EntityTarget<T>): Repository<T> {
        throw new Error('Method not implemented.')
    }

    /**
     * Prepare datastore factory, can new datastore here
     */
    private initialStores() {
        this._stores = {}
    }
}