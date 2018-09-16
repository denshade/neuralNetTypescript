// network = {unitsPerLayer : [], layer0: {weights : [][], biasPerUnit: []}, layer1: {weights : [][], biasPerUnit : []}}

function nn(input : number[], network : any) : number[]
{
    let unitsPerLayer = network.unitsPerLayer;
    let previousActivation : number[] = input;
    let currentActivation : number[] = [];
    for (let layer = 0; layer < unitsPerLayer.length - 1; layer++)
    {
        currentActivation=[];
        let currentLayer = network["layer"+layer];
        let currentbiasPerUnit = currentLayer.biasPerUnit;
        for (let currentHiddenElement = 0; currentHiddenElement < unitsPerLayer[layer + 1]; currentHiddenElement++)
        {
            let currentHiddenElementUnitWeights = currentLayer.weights[currentHiddenElement];
            if (currentbiasPerUnit.length != unitsPerLayer[layer + 1])
            {
                throw new Error("The length of the bias for layer " + layer + " is different " + currentbiasPerUnit.length +"  from the weight length " + unitsPerLayer[layer + 1]);
            }

            for (let nextInput = 0; nextInput < previousActivation.length; nextInput++)
            {
                if (currentActivation[currentHiddenElement] == null) {
                    currentActivation[currentHiddenElement] = 0;
                }
                currentActivation[currentHiddenElement] += previousActivation[nextInput] * currentHiddenElementUnitWeights[nextInput];
            }
        }
        for (let k = 0; k < currentActivation.length; k++)
        {
            currentActivation[k] = tanhActivation(currentActivation[k] + currentbiasPerUnit[k]);
        }
        previousActivation = currentActivation.slice();
    }
    return currentActivation;
}

function tanhActivation(t : number)
{
    return 1/(1+Math.pow(Math.E, -t));
}

function relu(t : number)
{
    return Math.max(0, t);
}

function sigmoid(t : number)
{
    return Math.max(0, t);
}

function runSelectedNetwork()
{
    let el1 = <HTMLInputElement>document.getElementById("input1");
    let el2 = <HTMLInputElement>document.getElementById("input2");
    let neuralnetworkElement = document.getElementById("neuralnetwork") as HTMLSelectElement;
    let url = neuralnetworkElement.options[neuralnetworkElement.selectedIndex].getAttribute("url");
    let jsonDescription = this.http.get(url);
    let network = JSON.parse(jsonDescription);
    let val = nn([el1.valueAsNumber, el2.valueAsNumber], network);

    let out1 = <HTMLInputElement>document.getElementById("out1");
    out1.value = val[0]+"";
}

function getJsonFromUrl(file: string, callback:any)
{
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == 200) {
            callback(rawFile.responseText);

        }
    }
    rawFile.send(null);
}
function redrawNN(canvasid)
{
    let canvas = document.getElementById(canvasid) as HTMLCanvasElement;
    let neuralnetworkElement = document.getElementById("neuralnetwork")as HTMLSelectElement;
    let url = neuralnetworkElement.options[neuralnetworkElement.selectedIndex].getAttribute("url");
}

function draw()
{
    let network = JSON.parse(jsonDescription);
    let context = canvas.getContext("2d");
    let x = 100;
    for (let entry of network.unitsPerLayer)
    {
        let y = 20;
        for (let i = 0; i < entry; i++)
        {
            y+= 20;
            context.beginPath();
            context.arc(x, y, 5, 0, 2*Math.PI);
            context.restore();
            context.fillStyle = "FFFFFF";
            context.stroke();
        }
        x += 50;
    }

}
