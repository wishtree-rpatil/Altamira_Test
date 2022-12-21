function incomingNumber (data) {
    console.log(data);
    // let items = data
    // if(data)

    //check the data 
    // if value Clear
    if(data == 'x')
    {
        document.getElementById("Calculations_Values").innerHTML =  "";
        return;
    }
   
    // console.log("Available Data",document.getElementById("Calculations_Values").innerHTML);
    let previosData = document.getElementById("Calculations_Values").innerHTML;
    document.getElementById("Calculations_Values").innerHTML =  previosData + data ;
    console.log(data);
}

function calculate () {
    let calculationValue = "" + document.getElementById("Calculations_Values").innerHTML;
    console.log("calculationValue", calculationValue);
    console.log(" test value", 1-2);

    let valuesArray = [];
    let currentNumber = "";
    let currentOperator = "";
    for(let i = 0; i < calculationValue.length; i++)
    {
        if( calculationValue.charAt(i) != '+' && 
            calculationValue.charAt(i) != '-' && 
            calculationValue.charAt(i) != '/' && 
            calculationValue.charAt(i) != '*'
        )
        {
            currentNumber = currentNumber + calculationValue.charAt(i);
        }
        else
        { 
            valuesArray.push(currentNumber);
            valuesArray.push(calculationValue.charAt(i));
            currentNumber = "";
        }
    }

    if(currentNumber != "")
    {
        valuesArray.push(currentNumber);
    }

    // * / + - for loop function(array, +)

    // check * present of not

    // 12 * 32 + 67 * 32
    // 0  1  2  3  4  5  6

    // if present *

    // 12*32 = 384  0
    //          +   1
    // 67*32 = 2144 2
    //              3

    // 384 + 2144 = 2528

    let oprators = "*/+-";
    let calculatedArray = valuesArray;

    // 12 * 12 * 12 == 144 * 12
    for(let j = 0; j < oprators.length; j++)
    {
        calculatedArray = opratorFunction(calculatedArray, oprators.charAt(j))
    }

    let count = 0;
    function opratorFunction (tempArray, oprator) { 
        let newArray = [];
        for(let item in tempArray)
        {
            if(item == oprator)
            {
                newArray.push(calculationOpration(parseInt(tempArray[count -1]), parseInt(tempArray[count +1]), oprator));
                count++;
            }
            else
            {
                newArray.push(item);
            }
            count++;
        }
        return newArray;
    }

    function calculationOpration (firstNumber, secondNumber, opration)
    {
        if(opration == '*')
        {
            return firstNumber * secondNumber;
        }
        else if(opration == '/')
        {
            return firstNumber / secondNumber;
        }
        else if(opration == '+')
        {
            return firstNumber + secondNumber;
        }
        else {
            return firstNumber - secondNumber;
        }
    }



}