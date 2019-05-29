window.Paycheck = {
    apiUrl: "http://localhost:8082",

    createPaycheck: function () {

        var name = $("input[title='name']").val();
        var grossPay = $("input[title='grossPay']").val();

        var data = {
            'name': name,
            'grossPay': grossPay
        };
        $.ajax({
            url: Paycheck.apiUrl + "/paycheck",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);
        });
    },


        getPaycheckRow: function (paycheck) {

            return `<tr>
     <td class="name">${paycheck.name}</td>
     <td class="grossPay">${paycheck.grossPay}</td>
     <td class="income_tax">${paycheck.incomeTax}</td>
     <td class="medical_insurance">${paycheck.medicalInsurance}</td>
     <td class="social_security">${paycheck.socialSecurity}</td>
     <td class="net_pay">${paycheck.netPay}</td    
     </tr>`
        },

    displayPaychecks: function(paychecks){
        var rows = '';

        console.log('Displaying items.');
        console.log(paychecks);


        paychecks.forEach(paycheck => rows += Paycheck.getPaycheckRow(paycheck));
        console.log(rows);

        $('#paychecks-list').html(rows);

    },

    getPaychecks: function (){


        $.ajax({
            url: Paycheck.apiUrl + "/paycheck",
            method: "GET"
        }).done(function (response) {
            console.log(response);

            Paycheck.displayPaychecks(response.content);
        });


    },


    bindEvents: function () {

        $("#create-paycheck").submit(function (event) {
            event.preventDefault();

            console.log('Submitting form');

            Paycheck.createPaycheck();
            return false;
        });

        $("#getPaycheck-by-name").submit(function (event) {
            event.preventDefault();

            console.log('Submitting get form');

            Paycheck.getPaychecks();
            return false;
        });

    }

};

//Paycheck.getPaychecks();
Paycheck.bindEvents();
