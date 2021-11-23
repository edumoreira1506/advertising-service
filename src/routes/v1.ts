import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import MerchantController from '@Controllers/MerchantController'

import { storeMerchantSchema } from '@Schemas/MerchantSchemas'
import { storeAdvertisingSchema } from '@Schemas/AdvertisingSchemas'

import withMerchantParam from '@Middlewares/withMerchantParam'
import AdvertisingController from '@Controllers/AdvertisingController'

const router = express.Router()

router.post('/merchants', withBodyValidation(storeMerchantSchema), MerchantController.store)

router.get('/merchants', MerchantController.index)

router.post(
  '/merchants/:merchantId/advertisings',
  withMerchantParam,
  withBodyValidation(storeAdvertisingSchema),
  AdvertisingController.store
)

router.get('/merchants/:merchantId/advertisings', withMerchantParam, AdvertisingController.index)

export default router
