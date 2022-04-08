import { DataSource } from 'typeorm'
import dotEnv from 'dotenv'

dotEnv.config()

const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = process.env
const isProduction = process.env.NODE_ENV === 'production'

const aditionalProductionRequirednConfig = {
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

import Advertising from '../entities/AdvertisingEntity'
import AdvertisingFavorite from '../entities/AdvertisingFavoriteEntity'
import AdvertisingQuestion from '../entities/AdvertisingQuestionEntity'
import AdvertisingQuestionAnswer from '../entities/AdvertisingQuestionAnswerEntity'
import Merchant from '../entities/MerchantEntity'

export const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [Advertising, AdvertisingFavorite, AdvertisingQuestion, AdvertisingQuestionAnswer, Merchant],
  logging: true,
  migrations: [
    isProduction ? 'build/database/migrations/**/*.js' : 'src/database/migrations/**/*.ts'
  ],
  subscribers: [],
  ...(isProduction ? aditionalProductionRequirednConfig : {}),
})

dataSource.initialize()
  .then(() => console.log('Connected to the database'))
  .catch(error => console.log(error))
