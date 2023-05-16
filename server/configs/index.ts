/**
 * Your can config valiable here for server
 */

const defaultPort: number = Number(process.env.PORT) || 3000
const isDevelopment: boolean = process.env.NODE_ENV === 'development'

const dbHostname: string = process.env.MYSQL_HOSTNAME || 'localhost'
const dbUsername: string = process.env.MYSQL_USERNAME || 'root'
const dbPassword: string = process.env.MYSQL_PASSWORD || 'hendrix_dev_root'
const dbDatabase: string = process.env.MYSQL_DATABASE || 'hendrix_dev'
const dbPort: number = Number(process.env.MYSQL_PORT) || 3306

export const config = {
    defaultPort,
    isDevelopment,
    dbHostname,
    dbUsername,
    dbPassword,
    dbDatabase,
    dbPort
}