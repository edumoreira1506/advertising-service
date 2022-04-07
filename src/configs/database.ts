import { DataSource } from 'typeorm'

const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = process.env

import Advertising from '@Entities/AdvertisingEntity'
import AdvertisingFavorite from '@Entities/AdvertisingFavoriteEntity'
import AdvertisingQuestion from '@Entities/AdvertisingQuestionEntity'
import AdvertisingQuestionAnswer from '@Entities/AdvertisingQuestionAnswerEntity'
import Merchant from '@Entities/MerchantEntity'

export const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [Advertising, AdvertisingFavorite, AdvertisingQuestion, AdvertisingQuestionAnswer, Merchant]
});

(async () => {
  await dataSource.initialize()
    .then(() => console.log('Connected to the database'))
    .catch(error => console.log(error))
})()
