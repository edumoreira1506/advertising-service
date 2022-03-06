import Advertising from '@Entities/AdvertisingEntity'
import AdvertisingQuestion from '@Entities/AdvertisingQuestionEntity'

export default class AdvertisingQuestionBuilder {
  private _externalId = ''
  private _content: string
  private _advertising: Advertising

  setAdvertising(advertising: Advertising) {
    this._advertising = advertising

    return this
  }

  setExternalId(externalId: string) {
    this._externalId = externalId

    return this
  }

  setContent(content: string) {
    this._content = content

    return this
  }

  build = () => {
    const advertisingQuestion = new AdvertisingQuestion()

    advertisingQuestion.externalId = this._externalId
    advertisingQuestion.content = this._content
    advertisingQuestion.advertising = this._advertising

    return advertisingQuestion
  }
}
