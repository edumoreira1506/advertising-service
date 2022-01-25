import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import MerchantController from '@Controllers/MerchantController'
import AdvertisingController from '@Controllers/AdvertisingController'
import AdvertisingQuestionController from '@Controllers/AdvertisingQuestionController'

import { storeMerchantSchema } from '@Schemas/MerchantSchemas'
import { storeAdvertisingSchema, updateAdvertisingSchema } from '@Schemas/AdvertisingSchemas'
import { storeAdvertisingQuestionSchema } from '@Schemas/AdvertisingQuestionSchemas'

import withMerchantParam from '@Middlewares/withMerchantParam'
import withAdvertisingParam from '@Middlewares/withAdvertisingParam'
import withQuestionParam from '@Middlewares/withQuestionParam'

const router = express.Router()

router.post('/merchants', withBodyValidation(storeMerchantSchema), MerchantController.store)

router.get('/merchants', MerchantController.index)

router.post(
  '/merchants/:merchantId/rollback',
  withMerchantParam,
  MerchantController.rollback
)

router.post(
  '/merchants/:merchantId/advertisings',
  withMerchantParam,
  withBodyValidation(storeAdvertisingSchema),
  AdvertisingController.store
)

router.get('/merchants/:merchantId/advertisings', withMerchantParam, AdvertisingController.index)

router.patch(
  '/merchants/:merchantId/advertisings/:advertisingId',
  withBodyValidation(updateAdvertisingSchema),
  withMerchantParam,
  withAdvertisingParam,
  AdvertisingController.update
)

router.delete(
  '/merchants/:merchantId/advertisings/:advertisingId',
  withMerchantParam,
  withAdvertisingParam,
  AdvertisingController.remove
)

router.post(
  '/merchants/:merchantId/advertisings/:advertisingId/questions',
  withMerchantParam,
  withAdvertisingParam,
  withBodyValidation(storeAdvertisingQuestionSchema),
  AdvertisingQuestionController.store
)

router.post(
  '/merchants/:merchantId/advertisings/:advertisingId/questions/:questionId/answers',
  withMerchantParam,
  withAdvertisingParam,
  withQuestionParam,
  withBodyValidation(storeAdvertisingQuestionSchema),
  AdvertisingQuestionController.store
)

export default router
