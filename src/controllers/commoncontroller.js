const {MVLoaderBase} = require('mvloader');

class MVLUsersController extends MVLoaderBase {

    caption = 'botcmsCommon';

    reject = () => false;

    clearMsg = ctx => ctx.Message.text = '';

    sendAttach = (ctx, params) => {
        if (typeof params !== 'object') {
            return;
        }
        let parcel = new ctx.BC.config.classes.Parcel();
        parcel.keyboard = (new ctx.BC.config.classes.Keyboard(ctx, this.MT.extract('step.keyboard', ctx.session))).build();
        for (let type in params) {
            if (params.hasOwnProperty(type)) {
                parcel.attachments[type] = parcel.attachments[type] || [];
                let attachments = this.MT.makeArray(params[type]);
                for (let attachment of attachments) {
                    if (this.MT.isString(attachment)) {
                        attachment = {
                            file: attachment,
                        }
                    }
                    attachment.file = process.cwd() + '/' + attachment.file;
                    for (let key in attachment) {
                        if (attachment.hasOwnProperty(key) && key !== 'file') {
                            attachment[key] = ctx.lexicon(attachment[key]);
                        }
                    }
                    parcel.attachments[type].push(attachment);
                }
            }
        }
        // console.log('COMMON SEMIS. SEND ATTACHMENTS: ', parcel.attachments);
        return ctx.reply(parcel);
    }

    botExit = (ctx) => {
        setTimeout(() => process.exit(), 3000);
    }

}

module.exports = MVLUsersController;