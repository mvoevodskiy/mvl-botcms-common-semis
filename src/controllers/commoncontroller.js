const { MVLoaderBase } = require('mvloader')

class MVLUsersController extends MVLoaderBase {
  constructor (...config) {
    super(...config)

    this.caption = 'botcmsCommon'

    this.messageFromAnswers = async (ctx, params) => {
      const fields = ctx.getAnswers(params.thread)
      // console.log('MESSAGE FROM ANSWERS. LEX', params.lexicon, 'FIELDS', fields)
      return ctx.lexicon(params.lexicon, fields)
    }

    this.reject = () => false
    this.pass = () => true
    this.clearMsg = ctx => { ctx.Message.text = '' }

    this.sendAttach = (ctx, params) => {
      if (typeof params !== 'object') {
        return
      }
      const parcel = new ctx.BC.config.classes.Parcel()
      parcel.keyboard = (new ctx.BC.config.classes.Keyboard(ctx, this.MT.extract('step.keyboard', ctx.session))).build()
      for (const type in params) {
        if (Object.prototype.hasOwnProperty.call(params, type)) {
          parcel.attachments[type] = parcel.attachments[type] || []
          const attachments = this.MT.makeArray(params[type])
          for (let attachment of attachments) {
            if (this.MT.isString(attachment)) {
              attachment = {
                file: attachment
              }
            }
            attachment.file = process.cwd() + '/' + attachment.file
            for (const key in attachment) {
              if (Object.prototype.hasOwnProperty.call(attachment, key) && key !== 'file') {
                attachment[key] = ctx.lexicon(attachment[key])
              }
            }
            parcel.attachments[type].push(attachment)
          }
        }
      }
      // console.log('COMMON SEMIS. SEND ATTACHMENTS: ', parcel.attachments);
      return ctx.reply(parcel)
    }

    this.botExit = (ctx) => {
      setTimeout(() => process.exit(), 3000)
    }

    this.answerCB = async (ctx, params) => {
      await ctx.answerCB(await ctx.lexicon(params.lexicon, params))
    }

    this.storeMessageAsFormAnswer = (ctx) => {
      ctx.session.form = ctx.session.form || {}
      ctx.session.form.formAnswerIds = ctx.session.form.formAnswerIds || []
      if (ctx.session.form.formAnswerIds.indexOf(ctx.Message.id) === -1) {
        ctx.session.form.formAnswerIds.push(ctx.Message.id)
      }
    }

    this.removeUserMessage = (ctx) => ctx.remove(ctx.Message.id)
  }
}

module.exports = MVLUsersController
