// Let anything run after the page has loaded
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tabs li');

    const inputLabel = document.querySelector('label[for="userInput"]');

    const unitOptions = {
        "Length": ["meters", "feet", "inches", "kilometers"],

        "Weight": ["kilograms", "grams", "pounds", "ounces"],

        "Temperature": ["celsius", "fahrenheit", "kelvin"]
    };

    function updateDropdown(selectedTabText) {
        const fromUnit = document.getElementById("fromUnit");
        const toUnit = document.getElementById("toUnit");
    
        // Clear existing options
        fromUnit.innerHTML = "";
        toUnit.innerHTML = "";
    
        // Get the relevant unit list
        const units = unitOptions[selectedTabText];
    
        // Populate the dropdowns
        units.forEach(unit => {
            let option1 = new Option(unit, unit);
            let option2 = new Option(unit, unit);
            fromUnit.add(option1);
            toUnit.add(option2);
        });
    }
    

    function activateTab(selectedTab) {
        tabs.forEach((tab)=> {
            if (tab == selectedTab) {
                tab.querySelector("a").style.textDecoration = 'underline';
                tab.querySelector('a').style.color = 'blue';
                tab.style.textDecorationColor = 'blue';
                tab.style.textUnderlineOffset = "4px";

                // select the current tab text
                tabText = tab.textContent.trim();

                updateDropdown(tabText);

                // put in the new label
                inputLabel.innerHTML = `Enter the ${tabText} to convert`;


            } else {
                tab.querySelector("a").style.textDecoration = "none";
                tab.querySelector('a').style.color = 'black';
            }
            
        })
    }

    activateTab(tabs[0]);

    updateDropdown(tabs[0].textContent.trim());

    //click event for tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab));
    });


    // Convert Logic for Length

    // store conversions
    const lengthConversions = {
        meters: {
            feet: 3.28084,
            inches: 39.3701,
            kilometers: 0.001
        },
        feet: {
            meters: 0.3048,
            inches: 12,
            kilometers: 0.0003048
        },
        inches: {
            meters: 0.0254,
            feet: 0.0833333,
            kilometers: 0.0000254
        },
        kilometers: {
            meters: 1000,
            feet: 3280.84,
            inches: 39370.1
        }
    };


    // Now define conversions

//Length
    function convertLength(inputValue, fromUnit, toUnit) {
        if(fromUnit == toUnit) {
            return inputValue;
        }

       let conversion = lengthConversions[fromUnit][toUnit];

        return inputValue * conversion;
    }

//Temperature
const tempConversions = {
    celsius: {
        fahrenheit: (c) => (c * 9/5) + 32,
        kelvin: (c) => c + 273.15
    },
    fahrenheit: {
        celsius: (f) => (f - 32) * 5/9,
        kelvin: (f) => (f - 32) * 5/9 + 273.15
    },
    kelvin: {
        celsius: (k) => k - 273.15,
        fahrenheit: (k) => (k - 273.15) * 9/5 + 32
    }
};

function convertTemp(inputValue, fromUnit, toUnit) {
    if(fromUnit == toUnit) {
        return inputValue;
    }

   let conversion = tempConversions[fromUnit][toUnit];

    return conversion(inputValue); //remember we had to make each conversion a function. So we calol the input value as the function so it will work in the operation, eg 12 - 273.15. yeah.
}


// Weight
const weightConversions = {
    kilograms: {
        grams: 1000,
        pounds: 2.20462,
        ounces: 35.274
    },
    grams: {
        kilograms: 0.001,
        pounds: 0.00220462,
        ounces: 0.035274
    },
    pounds: {
        kilograms: 0.453592,
        grams: 453.592,
        ounces: 16
    },
    ounces: {
        kilograms: 0.0283495,
        grams: 28.3495,
        pounds: 0.0625
    }
};

function convertWeight(inputValue, fromUnit, toUnit) {
    if(fromUnit == toUnit) {
        return inputValue;
    }

   let conversion = weightConversions[fromUnit][toUnit];

    return inputValue * conversion;
}



    // Make the button listen
    submit = document.getElementById('submit');
    //get the new div for the answer
    result = document.getElementById('result');

    // Put it all together in your display answer
    function displayAnswer() {

        if(tabText == 'Length' ) {
            inputValue = document.getElementById('userInput').value;

        convertFrom = document.getElementById('fromUnit').value;

        convertTo = document.getElementById('toUnit').value;

        answer = convertLength(inputValue, convertFrom, convertTo);

        result.innerHTML = `<h3>Result of your calculation</h3>
        <p style= "margin-top: 10px;">
        ${inputValue} ${convertFrom} = ${answer} ${convertTo}
        </p>
        `;
        result.style.color = 'black';

        }
        if (tabText == 'Temperature') {
            inputValue = document.getElementById('userInput').value;

        convertFrom = document.getElementById('fromUnit').value;

        convertTo = document.getElementById('toUnit').value;

        answer = convertTemp(inputValue, convertFrom, convertTo);

        result.innerHTML = `<h2>Result of your calculation</h2>
        <p>
        ${inputValue} ${convertFrom} = ${answer} ${convertTo}
        </p>
        `;
        result.style.color = 'black';
        }

        if(tabText == 'Weight') {
            inputValue = document.getElementById('userInput').value;

        convertFrom = document.getElementById('fromUnit').value;

        convertTo = document.getElementById('toUnit').value;

        answer = convertWeight(inputValue, convertFrom, convertTo);

        result.innerHTML = `<h2>Result of your calculation</h2>
        <p>
        ${inputValue} ${convertFrom} = ${answer} ${convertTo}
        </p>
        `;
        result.style.color = 'black';
        }

        
        
    }

    submit.addEventListener('click', displayAnswer);

    resetBtn = document.getElementById('reset')

    function reset() {
       return result.innerHTML = '<p style="color: rgb(210, 209, 209)">Answer will be displayed here</p>'
    }

    resetBtn.addEventListener('click', reset);


});



