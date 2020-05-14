const bytelength = {
    byteUnits: (bytes) => {

        const __step = 1024;
        let sized = {
            byte: bytes,
            kilobytes: bytes / __step
        }
        let unit = "kilobytes";

        if (sized.kilobytes > __step) sized[unit = "megabytes"] = sized.kilobytes / __step;
        if (sized.megabytes > __step) sized[unit = "gigabytes"] = sized.megabytes / __step;
        if (sized.gigabytes > __step) sized[unit = "terabytes"] = sized.gigabytes / __step;

        sized.value = `${sized[unit].toFixed(3)} ${unit}`;
        return sized;
    },

    ofString: (str) => {
        var m = encodeURIComponent(str).match(/%[89ABab]/g);
        return bytelength.byteUnits(str.length + (m ? m.length : 0));
    }
}

module.exports = bytelength;