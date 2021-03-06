import peg_js from "./peg_js.mjs";
import * as evaluter from "./evaluter.mjs";

document.querySelector("#run").addEventListener('click', event => {
    document.querySelector("#result").value = ""
    const code = document.querySelector("#code").value
    const parser = peggy.generate(peg_js)
    const parsed = parser.parse(code)
    const _evaluter = new evaluter.Evaluter()
    const _env = {native_functions:{print:print},values:{}}
    _evaluter.evalute(_env,parsed)
    printTree(JSON.stringify(parsed, null, 2))
});

// 組み込み関数print
function print(str){
    document.querySelector("#result").value = str;
}
function printTree(str){
    document.querySelector("#tree").value = str;
}
