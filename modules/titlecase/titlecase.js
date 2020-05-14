
global.String.prototype.toTitleCase = function () {
    return this.replace(/\b(\w|')+/g, function(txt){
        function keeplower(word) {
            switch (word) {
                case "of":
                case "and":
                case "for":
                case "a":
                    return true;
                default:
                    return false;
            }
        }

        if (keeplower(txt.toLowerCase())) {
            return txt.toLowerCase();
        } else {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    });
};

global.String.prototype.pad = function (max, chr) {
    var padw = chr || "0";
    return this.length < max ? (padw + this).pad(max, padw) : this;
};

