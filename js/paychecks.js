window.Paycheck = {
    apiUrl: "http://localhost:8082",

    createPaycheck: function () {

        var name = $("input[title='name']").val();
        var grossPay = $("input[title='grossPay']").val();
        var date = $("input[title='date']").val();

        var data = {
            'name': name,
            'grossPay': grossPay,
            'date': date
        };
        $.ajax({
            url: Paycheck.apiUrl + "/paycheck",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);

            Paycheck.getPaycheck(response.id);

        });
    },



        getPaycheckRow: function (paycheck) {
       var date = new Date(paycheck.date).toLocaleDateString();

            return `<tr>
     <td class="name">${paycheck.name}</td>
     <td class="grossPay">${paycheck.grossPay}</td>
     <td class="income_tax">${paycheck.incomeTax}</td>
     <td class="medical_insurance">${paycheck.medicalInsurance}</td>
     <td class="social_security">${paycheck.socialSecurity}</td>
     <td class="net_pay">${paycheck.netPay}</td    
     <td class="paycheck_date">${date}</td  
     </tr>`
        },

    displayPaychecks: function(paychecks){
        var rows = '';

        console.log('Displaying items.');
        console.log(paychecks);


        paychecks.forEach(paycheck => rows += Paycheck.getPaycheckRow(paycheck));
        console.log(rows);

        $('#paychecks-list tbody').html(rows);

    },

    displayPaycheck: function(paychecks){
        var rows = paychecks + Paycheck.getPaycheckRow(paychecks);

        console.log('Displaying items.');
        console.log(paychecks);

        console.log(rows);

        $('#paycheck-list tbody').html(rows);

    },



    getPaycheck: function (id){
        $.ajax({
            url: Paycheck.apiUrl + "/paycheck/" + id,
            method: "GET"
        }).done(function (response) {
            console.log("Getting paycheck");
            console.log(response);
            Paycheck.displayPaycheck(response);
        });
    },

    getPaychecks: function (){

        var name = $("input[title='name']").val();


        $.ajax({
            url: Paycheck.apiUrl + "/paycheck?name=" + name,
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
Paycheck.bindEvents();
