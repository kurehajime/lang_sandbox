import peg_js from "./peg_js.mjs";
import * as evaluter from "./evaluter.mjs";
const parser = peggy.generate(peg_js)

document.querySelector("#run").addEventListener('click', event => {
    document.querySelector("#result").value = ""
    const code = document.querySelector("#code").value
    const parsed = parser.parse(code)
    const _evaluter = new evaluter.Evaluter()
    const _env = {native_functions:{print:print}}
    _evaluter.evalute(_env,parsed)
});

// 組み込み関数print
function print(str){
    document.querySelector("#result").value = str;
}
