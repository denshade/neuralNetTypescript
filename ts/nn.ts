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
            currentActivation[k] = activation(currentActivation[k] + currentbiasPerUnit[k]);
        }
        previousActivation = currentActivation.slice();
    }
    return currentActivation;
}

function activation(t : number)
{
    return 1/(1+Math.pow(Math.E, -t));
}