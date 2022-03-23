export class Evaluter {

    //与えられた構文木を解釈
    evalute(env, tree) {
        if (tree == undefined || tree.type == undefined) {
            return tree
        }
        // ノードのタイプ
        const type = tree.type

        switch (type) {
            case "Identifier":
                return this.Identifier(env, tree.name)
            case "Program":
                return this.Program(env, tree.body)
            case "Literal":
                return this.Literal(env, tree.value)
            case "ExpressionStatement":
                return this.ExpressionStatement(env, tree.expression)
            case "BlockStatement":
                return this.BlockStatement(env, tree.body)
            case "IfStatement":
                return this.IfStatement(env, tree.test, tree.consequent, tree.alternate)
            case "CallExpression":
                return this.CallExpression(env, tree.callee, tree.arguments)
            case "BinaryExpression":
                return this.BinaryExpression(env, tree.operator, tree.left, tree.right)
            default:
                console.log(JSON.stringify(tree))
                break;
        }
    }

    // 変数
    // https://github.com/estree/estree/blob/master/es5.md#identifier
    Identifier(env, name) {
        return name
    }

    // プログラム
    // https://github.com/estree/estree/blob/master/es5.md#programs
    Program(env, body) {
        for (const item of body) {
            this.evalute(env, item)
        }
    }

    // リテラル(数字とか文字とか)
    // https://github.com/estree/estree/blob/master/es5.md#literal
    Literal(env, value) {
        return value;
    }

    // 式
    // https://github.com/estree/estree/blob/master/es5.md#expressionstatement
    ExpressionStatement(env, expression) {
        return this.evalute(env, expression)
    }

    // ブロック
    // https://github.com/estree/estree/blob/master/es5.md#blockstatement
    BlockStatement(env, body) {
        return this.Program(env, body)
    }

    // if文
    // https://github.com/estree/estree/blob/master/es5.md#ifstatement
    IfStatement(env, test, consequent, alternate) {
        const result = this.evalute(env, test)
        if (result) {
            this.evalute(env, consequent)
        } else if (alternate) {
            this.evalute(env, alternate)
        }
    }

    // メソッド呼び出し
    // https://github.com/estree/estree/blob/master/es5.md#callexpression
    CallExpression(env, callee, _arguments) {
        const args = _arguments.map((x) => {
            return this.evalute(env, x)
        })
        env.native_functions[callee.name](args[0])
    }

    // 右辺と左辺がある演算子
    // https://github.com/estree/estree/blob/master/es5.md#binaryexpression
    BinaryExpression(env, operator, left, right) {
        const op = operator
        const l = this.evalute(env, left)
        const r = this.evalute(env, right)

        switch (op) {
            case "==":
                return l == r
            case "+":
                return l + r
            case "-":
                return l - r
            case "*":
                return l * r
            case "/":
            default:
                break;
        }
    }
}