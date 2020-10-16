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
};

// function prevents input of all letters into input field
function isNumber(evt) {            //parameter of event
    evt = (evt) ? evt : window.event;   //evt variable = 
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
};