function nn(input : number[], weights : number[][], biases : number[][]) : number[]
{
    let previousActivation : number[] = input;
    let currentActivation : number[] = [];
    for (let layer = 0; layer < weights.length; layer++)
    {
        for (let inputElement = 0; inputElement < previousActivation.length; inputElement++)
        {
            currentActivation=[];
            let currentweight = weights[layer];
            let bias = biases[layer];
            for (let nextInput = 0; nextInput < currentweight.length; nextInput++)
            {
                if (currentActivation[nextInput] == null) {
                    currentActivation[nextInput] = 0;
                }
                currentActivation[nextInput] += previousActivation[inputElement] * currentweight[inputElement] + bias[inputElement];
            }
            for (let k = 0; k < currentActivation.length; k++)
            {
                currentActivation[k] = Math.tanh(currentActivation[k]);
            }
            previousActivation = currentActivation.slice();
        }
    }
    return currentActivation;
}