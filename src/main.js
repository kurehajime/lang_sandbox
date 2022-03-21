import peg from "./peg.mjs";
import * as evaluter from "./evaluter.mjs";
const parser = peggy.generate(peg)

document.querySelector("#run").addEventListener('click', event => {
    const code = document.querySelector("#code").value
    const parsed = parser.parse(code)
    const _evaluter = new evaluter.Evaluter()
    const result = _evaluter.evalute({},parsed)
    print(result)
});

function print(str){
    document.querySelector("#result").value = str;
}