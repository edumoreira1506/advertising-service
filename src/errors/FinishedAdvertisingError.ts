import { ApiError } from '@cig-platform/core'

import i18n from '@Configs/i18n'

export default class FinishedAdvertisingError extends ApiError {
  constructor() {
    super(i18n.__('errors.finished-advertising'))

    this.name = 'FinishedAdvertisingError'
  }
}
