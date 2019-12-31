var exec = require("child_process").exec;

async function crear(){
    await exec(`cd ./src/components && mkdir ${process.argv[2]}`);
    await exec(`cd ./src/components/${process.argv[2]} && echo export interface I${process.argv[2].charAt(0).toUpperCase()+process.argv[2].slice(1)}{} > model.ts`);
    await exec(`cd ./src/components/${process.argv[2]} && echo import {I${process.argv[2].charAt(0).toUpperCase()+process.argv[2].slice(1)}} from './model'; > controller.ts`);
    await exec(`cd ./src/components/${process.argv[2]} && echo import * as controller from './controller'; > route.ts`);
}

crear();