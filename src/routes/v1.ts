import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import MerchantController from '@Controllers/MerchantController'
import AdvertisingController from '@Controllers/AdvertisingController'

import { storeMerchantSchema } from '@Schemas/MerchantSchemas'
import { storeAdvertisingSchema } from '@Schemas/AdvertisingSchemas'

import withMerchantParam from '@Middlewares/withMerchantParam'
import withAdvertisingParam from '@Middlewares/withAdvertisingParam'

const router = express.Router()

router.post('/merchants', withBodyValidation(storeMerchantSchema), MerchantController.store)

router.get('/merchants', MerchantController.index)

router.post(
  '/merchants/:merchantId/advertisings',
  withMerchantParam,
  withBodyValidation(storeAdvertisingSchema),
  AdvertisingController.store
)

router.post(
  '/merchants/:merchantId/rollback',
  withMerchantParam,
  MerchantController.rollback
)

router.get('/merchants/:merchantId/advertisings', withMerchantParam, AdvertisingController.index)

router.delete(
  '/merchants/:merchantId/advertisings/:advertisingId',
  withMerchantParam,
  withAdvertisingParam,
  AdvertisingController.remove
)

export default router
