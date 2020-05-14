{
    const activeshell = require("./modules/activeshell");
    const bytelength = require('./modules/bytelength');
    const jumbohasher = require('./modules/jumbohasher/jumbohasher');
    const oneliner = require('./modules/oneliner');

require('./modules/titlecase');

    global.Hyperfocus = {

            activeshell, bytelength, jumbohasher, oneliner,

        sandbox: {
            intervalbot: require('./sandbox/intervalbot/intervalbot'),
        }
    }
}
module.exports = Hyperfocus, activeshell, bytelength, jumbohasher, oneliner;