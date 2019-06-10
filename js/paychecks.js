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
       var date = new Date(paycheck.date).toLocaleDateString('ro-RO');

            return `<tr>
     <td class="name" style="color: blue">${paycheck.name}</td>
     <td class="grossPay" style="color: cornflowerblue">${paycheck.grossPay}</td>
     <td class="income_tax" style="color: red">${paycheck.incomeTax}</td>
     <td class="medical_insurance" style="color: red">${paycheck.medicalInsurance}</td>
     <td class="social_security" style="color: red">${paycheck.socialSecurity}</td>
     <td class="net_pay" style="color: green">${paycheck.netPay}</td>    
     <td class="paycheck_date" style="color: blue">${date}</td>  
     <td><a href="#" class="fa fa-trash delete" data-id="${paycheck.id}"></a> </td>

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

    deletePaychecks: function(id){
        $.ajax({
            url: Paycheck.apiUrl + '/paycheck/' + id,
            method: "DELETE"
        }).done(function (response) {
            console.log(response);

            Paycheck.getPaychecks();
        });
    },

    deletePaycheck: function(id){
        $.ajax({
            url: Paycheck.apiUrl + '/paycheck/' + id,
            method: "DELETE"
        }).done(function (response) {
            console.log(response);

            location.reload(true);
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

        $('#paychecks-list tbody').delegate('.delete','click', function () {
            var id = $(this).data('id');

            Paycheck.deletePaychecks(id);
        });

        $('#paycheck-list tbody').delegate('.delete','click', function () {
            var id = $(this).data('id');

            Paycheck.deletePaycheck(id);
        })

    }

};
Paycheck.bindEvents();
