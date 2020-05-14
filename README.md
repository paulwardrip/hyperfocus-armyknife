# @hyperfocus/armyknife

Library consisting of tiny addons and enhancements to javascript that can be included by themselves or as a bundle.

npm install @hyperfocus/armyknife

## @hyperfocus/activeshell

an asynchronous shell that receives step (exec, args) and provides listeners for stdout, stderr and exit.


    const sh = require("@hyperfocus-activeshell").active();
    sh.stdout(msg => {
        console.log(msg);
    }).stderr(msg => {
        // parse & process
    }).close(exitcode => {
        // then?
    });
    
    sh.step("ls");
    sh.step("mkdir", "-P /opt/my/dir");

## @hyperfocus/bytelength

    const bytelen = require("@hyperfocus-bytelength");
    let data = bytelen.byteUnits(bytes);
    
Example: