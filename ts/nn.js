// network = {unitsPerLayer : [], layer0: {weights : [][], biasPerUnit: []}, layer1: {weights : [][], biasPerUnit : []}}
function nn(input, network) {
    var unitsPerLayer = network.unitsPerLayer;
    var previousActivation = input;
    var currentActivation = [];
    for (var layer = 0; layer < unitsPerLayer.length - 1; layer++) {
        currentActivation = [];
        var currentLayer = network["layer" + layer];
        var currentbiasPerUnit = currentLayer.biasPerUnit;
        for (var currentHiddenElement = 0; currentHiddenElement < unitsPerLayer[layer + 1]; currentHiddenElement++) {
            var currentHiddenElementUnitWeights = currentLayer.weights[currentHiddenElement];
            if (currentbiasPerUnit.length != unitsPerLayer[layer + 1]) {
                throw new Error("The length of the bias for layer " + layer + " is different " + currentbiasPerUnit.length + "  from the weight length " + unitsPerLayer[layer + 1]);
            }
            for (var nextInput = 0; nextInput < previousActivation.length; nextInput++) {
                if (currentActivation[currentHiddenElement] == null) {
                    currentActivation[currentHiddenElement] = 0;
                }
                currentActivation[currentHiddenElement] += previousActivation[nextInput] * currentHiddenElementUnitWeights[nextInput];
            }
        }
        for (var k = 0; k < currentActivation.length; k++) {
            currentActivation[k] = activation(currentActivation[k] + currentbiasPerUnit[k]);
        }
        previousActivation = currentActivation.slice();
    }
    return currentActivation;
}
function activation(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}
//# sourceMappingURL=nn.js.map