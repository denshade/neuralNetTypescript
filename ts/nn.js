function nn(input, weights, biases) {
    var previousActivation = input;
    var currentActivation = [];
    for (var layer = 0; layer < weights.length; layer++) {
        for (var inputElement = 0; inputElement < previousActivation.length; inputElement++) {
            currentActivation = [];
            var currentweight = weights[layer];
            var bias = biases[layer];
            for (var nextInput = 0; nextInput < currentweight.length; nextInput++) {
                if (currentActivation[nextInput] == null) {
                    currentActivation[nextInput] = 0;
                }
                currentActivation[nextInput] += previousActivation[inputElement] * currentweight[inputElement] + bias[inputElement];
            }
            for (var k = 0; k < currentActivation.length; k++) {
                currentActivation[k] = Math.tanh(currentActivation[k]);
            }
            previousActivation = currentActivation.slice();
        }
    }
    return currentActivation;
}
//# sourceMappingURL=nn.js.map