var dataEntries = []; // Prin Payments per month (For Bar Graph)

function calculate() {
    //Step 1: Getting the data
    let bal = Number(document.getElementById("balance").value); // Input 1 is total balance input
    let term = Number(document.getElementById("term").value); // Input 2 is the monthly term input
    let rate = Number(document.getElementById("rate").value);  // Input 3 is the interest rate input


    //Step 2: Run Collected Data
    let totMonPay = (bal) * (rate / 1200) / (1 - Math.pow((1 + rate / 1200), -term)); // Total Monthly Payment = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)^(-Number of Months) )
    let remBal = bal;                                                 //rem balance = balance after each monthly pay
    let intPay = remBal * rate / 1200;                               //Interest Payment = Previous Remaining Balance * rate/1200
    let prinPay = totMonPay - intPay;                                // Principal Payment = Total Monthly Payment - Interest Payment
    let totIntPay = 0;                                               //Remaining Balance = Previous Remaining Balance - principal payments
    let accuPay = 0;

    //Step 3: Result / Outputting to table
    // Base format of the Table
    let template = `<tr>
        <th>Month</th>
        <th>Payment</th>
        <th>Principal</th>
        <th>Interest</th>
        <th>Total Interest</th>
        <th>Balance</th>        
    </tr>`;


    //Loop will dynamically fill the table based on how many months the interest is
    // i = starting month

    for (let i = 1; i <= term; i++) {

        totIntPay += intPay;                        //total interest will gradually increase as monthly payments are made
        prinPay = totMonPay - intPay;               //Principal will increase since interest amount owed goes down 
        remBal = remBal - prinPay;                  //Remaining balance will slowly decrease as payments are made
        intPay = remBal * rate / 1200;              //As loop continues, it gradually decreases as more payments are made
        accuPay += totMonPay;

        if (i <= 6) {                               //(Bar Graph) checks for 1st 6 months and pushes principal pay into data entries variable
            dataEntries.push(accuPay);
        }


        //How result will be formatted as loop continues 
        template += `<tr>
        <td>${i}</td>
        <td>${totMonPay.toFixed(2)}</td>
        <td>${prinPay.toFixed(2)}</td>
        <td>${intPay.toFixed(2)}</td>
        <td>${totIntPay.toFixed(2)}</td>
        <td>${remBal.toFixed(2)}</td>
    </tr>`
    };

    //Puts into HTML
    document.getElementById("result").innerHTML = template;
    document.getElementById("termMon").innerHTML = `${term} months`
    document.getElementById("totBal").innerHTML = `$${bal}`
    document.getElementById("monPay").innerHTML = `$${totMonPay.toFixed(2)}`;
    document.getElementById("intRate").innerHTML = `${rate}%`

    prinGraph();
    prinDonut();

};

// function prevents input of all letters into input field
function isNumber(evt) {                                     //parameter of event
    evt = (evt) ? evt : window.event;                        //evt variable = event of the key press
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
};

//Prints graph showing principal paid based on the first 6 months 
function prinGraph() {
    document.getElementById("chart").innerHTML = ``;
    var options = {
        chart: {
            type: 'bar'
        },
        series: [{
            name: 'Accumulated Payments',
            data: [dataEntries[0].toFixed(2), dataEntries[1].toFixed(2), dataEntries[2].toFixed(2), dataEntries[3].toFixed(2), dataEntries[4].toFixed(2), dataEntries[5].toFixed(2)]
        }],
        xaxis: {
            categories: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"]
        }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    dataEntries = [];                   // Resets array to empty 
};

//displays empty chart at the launch of the page 
window.onload = function defaultGraph() {
    document.getElementById("chart").innerHTML = `<br><br><br><br><br><br><br><br><br><br><br><br><br>`;
}


/////////////////////////////////////////////////////////////////////
//                         SHYANN EDITS                            //
/////////////////////////////////////////////////////////////////////


// Button Event
document.getElementById('calc').addEventListener('click', function () {

    let verifyBal = Number(document.getElementById('balance').value);
    let verifyTerm = Number(document.getElementById('term').value);
    let verifyRate = Number(document.getElementById('rate').value);


    if (verifyBal == "" || verifyTerm == "" || verifyRate == "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill out all selections before using the calculator.',
        })
    }
    else {
        calculate();
        taxFunction();
    }
});

