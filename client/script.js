class ASTNode {
    constructor(type, left = null, right = null, value = null) {
        this.type = type; // "operator" or "operand"
        this.left = left; // left child (for operators)
        this.right = right; // right child (for operators)
        this.value = value; // value for operand nodes
    }
}

function parseRule(ruleString) {
    // Simplified parsing logic (you may want to improve this)
    const ast = eval(ruleString); // Simplified for demonstration; use a parser instead in production
    return ast;
}

function evaluate_rule(ast, data) {
    if (ast.type === 'operand') {
        const value = data[ast.value];
        return value !== undefined; // Simplified for demonstration
    } else if (ast.type === 'operator') {
        const leftResult = evaluate_rule(ast.left, data);
        const rightResult = evaluate_rule(ast.right, data);
        return (ast.value === '&&') ? (leftResult && rightResult) : (leftResult || rightResult);
    }
}

document.getElementById('createRuleBtn').addEventListener('click', async () => {
    const ruleInput = document.getElementById('ruleInput').value;
    const ast = parseRule(ruleInput);
    document.getElementById('astOutput').textContent = JSON.stringify(ast, null, 2);

    // Send to server
    const response = await fetch('http://localhost:5000/api/rules/create_rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleString: ruleInput, astRepresentation: ast }),
    });
    const result = await response.json();
    console.log(result);
});

document.getElementById('evaluateRuleBtn').addEventListener('click', () => {
    const contextInput = document.getElementById('contextInput').value;
    const data = JSON.parse(contextInput);
    const ruleInput = document.getElementById('ruleInput').value;
    const ast = parseRule(ruleInput);
    const result = evaluate_rule(ast, data);
    document.getElementById('evaluationResult').textContent = `Evaluation Result: ${result}`;
});
