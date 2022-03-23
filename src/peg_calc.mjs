// original https://github.com/peggyjs/peggy/blob/main/examples/arithmetics.pegjs

export default `

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/" / "😊") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
        if (element[1] === "😊") { return (result + element[3])/2; }
      }, head);
    }

Integer "integer"
= _ [0-9]+ { return parseInt(text(), 10); }

Factor
  = "(" _ @Expression _ ")"
  / Integer

_ "whitespace"
  = [ ]*
`
