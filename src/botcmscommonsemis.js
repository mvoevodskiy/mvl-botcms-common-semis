const {MVLoaderBase} = require('mvloader');

class Botcmscommonsemis extends MVLoaderBase{
    static exportConfig = {
        ext: {
            classes: {
                semis: {},
                controllers: {},
                handlers: {},
            },
            configs: {
                controllers: {},
                handlers: {
                    BotHandler: {
                        schemaFiles: [
                            __dirname + '/botschemas/common.yml',
                        ],
                    },
                },
                semis: {},
            }
        },
        db: {},
    };

    constructor (App, ...config) {
        let localDefaults = {

        };
        super(localDefaults, ...config);
        this.App = App;
    }

    async init() {
        return super.init();
    }

    async initFinish() {
        super.initFinish();
    }

}

module.exports = Botcmscommonsemis;