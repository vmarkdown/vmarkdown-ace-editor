ace.define("ace/theme/github", ["require", "exports", "module", "ace/lib/dom"], function (require, exports, module) {
    exports.isDark = false;
    exports.cssClass = "ace-earthsong";
    exports.cssText = require('./theme.css');

    var r = require("../lib/dom");
    r.importCssString(exports.cssText, exports.cssClass)
});

(function () {
    ace.require(["ace/theme/github"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
            