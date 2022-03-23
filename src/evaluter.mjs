export class Evaluter {
    evalute(env, tree) {
        if (tree == undefined || tree.type == undefined) {
            return tree
        }
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

    // https://github.com/estree/estree/blob/master/es5.md#identifier
    Identifier(env, name) {
        return name
    }

    // https://github.com/estree/estree/blob/master/es5.md#programs
    Program(env, body) {
        for (const item of body) {
            this.evalute(env, item)
        }
    }

    // https://github.com/estree/estree/blob/master/es5.md#literal
    Literal(env, value) {
        return value;
    }

    // https://github.com/estree/estree/blob/master/es5.md#expressionstatement
    ExpressionStatement(env, expression) {
        return this.evalute(env, expression)
    }

    // https://github.com/estree/estree/blob/master/es5.md#blockstatement
    BlockStatement(env, body) {
        return this.Program(env, body)
    }

    // https://github.com/estree/estree/blob/master/es5.md#ifstatement
    IfStatement(env, test, consequent, alternate) {
        let result = this.evalute(env, test)
        if (result) {
            this.evalute(env, consequent)
        } else if (alternate) {
            this.evalute(env, alternate)
        }
    }

    // https://github.com/estree/estree/blob/master/es5.md#callexpression
    CallExpression(env, callee, _arguments) {
        let args = _arguments.map((x) => {
            return this.evalute(env, x)
        })
        env.native_functions[callee.name](args[0])
    }

    // https://github.com/estree/estree/blob/master/es5.md#binaryexpression
    BinaryExpression(env, operator, left, right) {
        let op = operator
        let l = this.evalute(env, left)
        let r = this.evalute(env, right)

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