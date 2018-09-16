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
            currentActivation[k] = tanhActivation(currentActivation[k] + currentbiasPerUnit[k]);
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
    var el1 = document.getElementById("input1");
    var el2 = document.getElementById("input2");
    var neuralnetworkElement = document.getElementById("neuralnetwork");
    var url = neuralnetworkElement.options[neuralnetworkElement.selectedIndex].getAttribute("url");
    var jsonDescription = this.http.get(url);
    var network = JSON.parse(jsonDescription);
    var val = nn([el1.valueAsNumber, el2.valueAsNumber], network);
    var out1 = document.getElementById("out1");
    out1.value = val[0] + "";
}
function getJsonFromUrl(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == 200) {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}
function redrawNN(canvasid) {
    var canvas = document.getElementById(canvasid);
    var neuralnetworkElement = document.getElementById("neuralnetwork");
    var url = neuralnetworkElement.options[neuralnetworkElement.selectedIndex].getAttribute("url");
}
function draw() {
    var network = JSON.parse(jsonDescription);
    var context = canvas.getContext("2d");
    var x = 100;
    for (var _i = 0, _a = network.unitsPerLayer; _i < _a.length; _i++) {
        var entry = _a[_i];
        var y = 20;
        for (var i = 0; i < entry; i++) {
            y += 20;
            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI);
            context.restore();
            context.fillStyle = "FFFFFF";
            context.stroke();
        }
        x += 50;
    }
}
//# sourceMappingURL=nn.js.map