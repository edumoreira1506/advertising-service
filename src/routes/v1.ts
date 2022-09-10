import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import MerchantController from '@Controllers/MerchantController'
import AdvertisingController from '@Controllers/AdvertisingController'
import AdvertisingQuestionController from '@Controllers/AdvertisingQuestionController'
import AdvertisingQuestionAnswerController from '@Controllers/AdvertisingQuestionAnswerController'
import AdvertisingFavoriteController from '@Controllers/AdvertisingFavoriteController'

import { storeMerchantSchema } from '@Schemas/MerchantSchemas'
import { storeAdvertisingSchema, updateAdvertisingSchema } from '@Schemas/AdvertisingSchemas'
import { storeAdvertisingQuestionSchema } from '@Schemas/AdvertisingQuestionSchemas'
import { storeAdvertisingFavoriteSchema } from '@Schemas/AdvertisingFavoriteSchemas'

import withMerchantParam from '@Middlewares/withMerchantParam'
import withAdvertisingParam, { withUnfinishedAdvertisingParam } from '@Middlewares/withAdvertisingParam'
import withQuestionParam from '@Middlewares/withQuestionParam'
import withFavoriteParam from '@Middlewares/withFavoriteParam'
import withApiKey from '@Middlewares/withApiKey'

const router = express.Router()

router.get('/advertisings', withApiKey, AdvertisingController.search)

router.post('/merchants', withApiKey, withBodyValidation(storeMerchantSchema), MerchantController.store)

router.get('/merchants', withApiKey, MerchantController.index)

router.get('/merchants/:merchantId', withApiKey, withMerchantParam, MerchantController.show)

router.post(
  '/merchants/:merchantId/rollback',
  withApiKey,
  withMerchantParam,
  MerchantController.rollback
)

router.post(
  '/merchants/:merchantId/advertisings',
  withApiKey,
  withMerchantParam,
  withBodyValidation(storeAdvertisingSchema),
  AdvertisingController.store
)

router.get(
  '/merchants/:merchantId/advertisings',
  withApiKey,
  withMerchantParam,
  AdvertisingController.index
)

router.get(
  '/merchants/:merchantId/advertisings/:advertisingId',
  withApiKey,
  withMerchantParam,
  withAdvertisingParam,
  AdvertisingController.show
)

router.patch(
  '/merchants/:merchantId/advertisings/:advertisingId',
  withApiKey,
  withBodyValidation(updateAdvertisingSchema),
  withMerchantParam,
  withAdvertisingParam,
  AdvertisingController.update
)

router.delete(
  '/merchants/:merchantId/advertisings/:advertisingId',
  withApiKey,
  withMerchantParam,
  withAdvertisingParam,
  AdvertisingController.remove
)

router.post(
  '/merchants/:merchantId/advertisings/:advertisingId/favorites',
  withApiKey,
  withMerchantParam,
  withUnfinishedAdvertisingParam,
  withBodyValidation(storeAdvertisingFavoriteSchema),
  AdvertisingFavoriteController.store
)

router.get(
  '/merchants/:merchantId/advertisings/:advertisingId/favorites',
  withApiKey,
  withMerchantParam,
  withUnfinishedAdvertisingParam,
  AdvertisingFavoriteController.index
)

router.get(
  '/favorites',
  withApiKey,
  AdvertisingFavoriteController.index
)

router.delete(
  '/merchants/:merchantId/advertisings/:advertisingId/favorites/:favoriteId',
  withApiKey,
  withMerchantParam,
  withUnfinishedAdvertisingParam,
  withFavoriteParam,
  AdvertisingFavoriteController.remove
)

router.post(
  '/merchants/:merchantId/advertisings/:advertisingId/questions',
  withApiKey,
  withMerchantParam,
  withUnfinishedAdvertisingParam,
  withBodyValidation(storeAdvertisingQuestionSchema),
  AdvertisingQuestionController.store
)

router.get(
  '/merchants/:merchantId/advertisings/:advertisingId/questions',
  withApiKey,
  withMerchantParam,
  withAdvertisingParam,
  AdvertisingQuestionController.index
)

router.post(
  '/merchants/:merchantId/advertisings/:advertisingId/questions/:questionId/answers',
  withApiKey,
  withMerchantParam,
  withUnfinishedAdvertisingParam,
  withQuestionParam,
  withBodyValidation(storeAdvertisingQuestionSchema),
  AdvertisingQuestionAnswerController.store
)

export default router
