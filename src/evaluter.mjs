export class Evaluter {
    evalute(env, tree) {
        if (tree == undefined || tree.type == undefined) {
            return tree
        }
        const type = tree.type

        switch (type) {
            default:
                console.log(tree)
                break;
        }
    }
}