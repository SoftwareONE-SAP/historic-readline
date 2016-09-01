var readline = require('readline');
var fs = require('fs-extra');

function createInterface(options) {

    fs.createFileSync(options['path']);

    var history = fs.readFileSync(options['path'], "utf8").toString().split("\n").slice(0, -1).reverse().slice(0, options['maxLength']);

    /**
     * Set the history size based on our history length
     */
    readline.kHistorySize = Math.max(readline.kHistorySize, options['maxLength']);

    /**
     * Create the interface
     */
    var rl = readline.createInterface(options);

    /**
     * Set prompt
     */
    if(options.prompt){
        rl.setPrompt(options.prompt);
    }

    var oldAddHistory = rl._addHistory;

    rl._addHistory = function() {

        var last = rl.history[0];

        var line = oldAddHistory.call(rl);

        if (line.length > 0 && line != last) {
            fs.appendFileSync(options['path'], line + "\n");
        }

        return line;
    }

    rl.history.push.apply(rl.history, history);

    options['next'](rl);

}

exports.createInterface = createInterface;