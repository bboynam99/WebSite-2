/* ----- withdraw ----- */
$("#modal-withdraw").flythat({});
$("#tx-info").flythat({});

$('#modal-withdraw-init-button').click(function(){
    checkMetaMask().then(ok => {
    
        $('#modal-withdraw-input').val(honeyEqual1eth);
        $('#honeyEqual1eth').html(format_number(honeyEqual1eth));
        $('#modal-withdraw-button-value').html(1);
        $('[name="modal-honey-balance"]').html(format_number(balanceHoney));

        if($('#modal-withdraw-input').val() > balanceHoney){
            $('#modal-withdraw-not-enough').show();
            $('#modal-withdraw-button').prop("disabled", true);
        } else {
            $('#modal-withdraw-not-enough').hide();
            $('#modal-withdraw-button').prop("disabled", false);
        }

        $('#modal-withdraw').flythat("show");
        
    }, error => {
        showModalAuth(error);
    });
});

$('#modal-withdraw-input').on('input', function(){
    let honey = parseInt($('#modal-withdraw-input').val());
    if(honey < 0){
        honey = 0;
        $('#modal-withdraw-input').val(0);
    }

    let value = (isNaN(honey) ? 0 : parseFloat(honey / honeyEqual1eth));

    $('#modal-withdraw-button-value').html(format_number(value,3));

    let disabled = false;
    if(honey < 500){
        $('#modal-withdraw-less-min').show();
        $('#modal-withdraw-not-enough').hide();
        disabled = true;
    } else {
        $('#modal-withdraw-less-min').hide();
    }

    if (!disabled &&
        (honey > balanceHoney || isNaN(honey))){
        $('[name="modal-withdraw-balance"]').html(format_number(balanceHoney));
        $('#modal-withdraw-not-enough').show();
        disabled = true;
    } else {
        $('#modal-withdraw-not-enough').hide();
    }
    $('#modal-withdraw-button').prop("disabled", disabled);
});

$('#modal-withdraw-button').click(function(){
    if($('#modal-deposit-button').prop('disabled')){
        return;
    }

    let valueHoney = $('#modal-withdraw-input').val();
    checkMetaMask().then(ok => {
        $.getJSON("https://gasprice.poa.network", function(data) {
            let gasPrice = (data ? data.fast : 3) * Math.pow(10,9);
            web3.eth.contract(ABI).at(CONTRACT_ADDRESS).withdraw(valueHoney * Math.pow(10,18), {'from':current_account, 'value':0, 'gasPrice':gasPrice}, function(err, hash){
                if(err){
                    $('[name="tx-info-success"]').hide();
                    $('#tx-info-success-img').hide();
                    $('[name="tx-info-fail"]').show();
                    $('#tx-info-fail-img').show();
                } else {
                    $('#tx-info-tx').attr('href', 'https://'+NETWORK+'.etherscan.io/tx/'+hash);
                    $('[name="tx-info-success"]').show();
                    $('#tx-info-success-img').show();
                    $('[name="tx-info-fail"]').hide();
                    $('#tx-info-fail-img').hide();
                    $('#modal-withdraw').flythat("hide");
                }

                $('#tx-info-deposit').hide();
                $('#tx-info-withdraw').show();
                $('#tx-info-quality-upgrade').hide();
                $('#tx-info-airdrop').hide();
                $('#tx-info-buy-bee').hide();
                $('#tx-info-collect-medal').hide();

                $('#tx-info').flythat("show");
            });
        });
    }, error => {
        showModalAuth(error);
    });
});
