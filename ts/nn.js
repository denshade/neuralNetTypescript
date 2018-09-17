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
            switch (currentLayer.activation) {
                case "tanh":
                    currentActivation[k] = tanhActivation(currentActivation[k] + currentbiasPerUnit[k]);
                    break;
                case "relu":
                    currentActivation[k] = relu(currentActivation[k] + currentbiasPerUnit[k]);
                    break;
                case "sigmoid":
                    currentActivation[k] = sigmoid(currentActivation[k] + currentbiasPerUnit[k]);
                    break;
                default: throw "Unknown activation function " + currentLayer.activation;
            }
        }
        previousActivation = currentActivation.slice();
    }
    return currentActivation;
}
function tanhActivation(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}
function relu(t) {
    return Math.max(0, t);
}
function sigmoid(t) {
    return Math.max(0, t);
}
function runSelectedNetwork() {
    var neuralnetworkElement = document.getElementById("neuralnetwork");
    var url = neuralnetworkElement.options[neuralnetworkElement.selectedIndex].getAttribute("url");
    getJsonFromUrl(url, runNetworkFile, null);
}
function runNetworkFile(jsonDescription) {
    var el1 = document.getElementById("input1");
    var el2 = document.getElementById("input2");
    var network = JSON.parse(jsonDescription);
    var val = nn([el1.valueAsNumber, el2.valueAsNumber], network);
    var out1 = document.getElementById("out1");
    out1.value = val[0] + "";
}
function getJsonFromUrl(file, callback, canvas) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == 200) {
            callback(rawFile.responseText, canvas);
        }
    };
    rawFile.send(null);
}
function redrawNN(canvasid) {
    var canvas = document.getElementById(canvasid);
    var neuralnetworkElement = document.getElementById("neuralnetwork");
    var url = neuralnetworkElement.options[neuralnetworkElement.selectedIndex].getAttribute("url");
    getJsonFromUrl(url, draw, canvas);
}
function draw(rawtext, canvas) {
    var network = JSON.parse(rawtext);
    var context = canvas.getContext("2d");
    var x = 100;
    for (var entrycounter = 0; entrycounter < network.unitsPerLayer.length; entrycounter++) {
        var neuronCount = network.unitsPerLayer[entrycounter];
        var nextNeuronCount = null;
        if (entrycounter + 1 < network.unitsPerLayer.length) {
            nextNeuronCount = network.unitsPerLayer[entrycounter + 1];
        }
        var y = 20;
        for (var currentNeuron = 0; currentNeuron < neuronCount; currentNeuron++) {
            y += 20;
            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI);
            context.restore();
            context.fillStyle = "FFFFFF";
            context.stroke();
            var nextY = 20;
            for (var nextNeuron = 0; nextNeuron < nextNeuronCount; nextNeuron++) {
                nextY += 20;
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x + 50, nextY);
                context.stroke();
            }
        }
        x += 50;
    }
}
//# sourceMappingURL=nn.js.map