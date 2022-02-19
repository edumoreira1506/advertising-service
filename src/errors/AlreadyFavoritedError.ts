import { ApiError } from '@cig-platform/core'

import i18n from '@Configs/i18n'

export default class AlreadyFavoritedError extends ApiError {
  constructor() {
    super(i18n.__('errors.already-favorited'))

    this.name = 'AlreadyFavoritedError'
  }
}
