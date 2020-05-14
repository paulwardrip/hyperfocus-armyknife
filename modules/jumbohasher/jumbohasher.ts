import * as crypto from "crypto";
import * as fs from "fs";
import * as sync from "synchronizer";


export const jumbohasher = (filepath: string, cb): void => {
    try {
        let hash = crypto.createHash('sha1');
        let stream = fs.createReadStream('mybigfile.dat')

        stream.on('data', function (data) {
            this.hash.update(data, 'utf8')
        })
        stream.on('end', function () {
            cb(null, this.hash.digest('hex'));
        })
    } catch (e) {
        cb(e);
    }
}

gitexport const jumbohasher_sync = (() => {
    const swrap = sync(jumbohasher);

    return (filepath: string) => {
        return swrap(filepath);
    }
})();
