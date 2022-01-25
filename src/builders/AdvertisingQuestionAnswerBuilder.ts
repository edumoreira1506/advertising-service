import AdvertisingQuestionEntity from '@Entities/AdvertisingQuestionEntity'
import AdvertisingQuestionAnswer from '@Entities/AdvertisingQuestionAnswerEntity'

export default class AdvertisingQuestionAnswerBuilder {
  private _externalId = '';
  private _content: string;
  private _question: AdvertisingQuestionEntity;

  setQuestion(question: AdvertisingQuestionEntity) {
    this._question = question

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
    const advertisingQuestionAnswer = new AdvertisingQuestionAnswer()

    advertisingQuestionAnswer.externalId = this._externalId
    advertisingQuestionAnswer.content = this._content
    advertisingQuestionAnswer.question = this._question

    return advertisingQuestionAnswer
  }
}
