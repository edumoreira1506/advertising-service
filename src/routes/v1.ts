import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import MerchantController from '@Controllers/MerchantController'
import { storeMerchantSchema } from '@Schemas/MerchantSchemas'

const router = express.Router()

router.post('/merchants', withBodyValidation(storeMerchantSchema), MerchantController.store)

export default router
