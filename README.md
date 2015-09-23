# historic-readline
Add the ability for the node readline module to save history to file

## Example
```
var readline = require('historic-readline');
var path = require('path');
var osHomedir = require('os-homedir');

readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    path: path.join(osHomedir(), ".myApp", "command_history.txt"),
    maxLength: 100, //Only keep 100 lines worth of history
    next: function(rl){
        rl.on("line", function(line){ console.log("You ran the command: " + line) });
        rl.on("close", function(){"console.log('Goodbye!')"} );
    }
});
```

The 'next' function supplies a slightly modified version the node's own readline module, so the api for that module should be used for any expansion.
