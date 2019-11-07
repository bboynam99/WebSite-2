/* ----- deposit ----- */
$("#modal-deposit").flythat({});
$("#tx-info").flythat({});

$('#modal-deposit-init-button').click(function(){
    checkMetaMask().then(ok => {
        web3.eth.getBalance(current_account, function(err, _balance){
            balance = web3infura.toDecimal(_balance) / Math.pow(10, 18);

            $('#modal-deposit-input').val(1);
            $('#waxEqual1eth').html(format_number(waxEqual1eth));
            $('#modal-deposit-button-value').html(format_number(waxEqual1eth))
            $('[name="modal-deposit-balance"]').html(format_number(balance,4));

            if($('#modal-deposit-input').val() > balance){
                $('#modal-deposit-not-enough').show();
                $('#modal-deposit-button').prop("disabled", true);
            } else {
                $('#modal-deposit-not-enough').hide();
                $('#modal-deposit-button').prop("disabled", false);
            }

            $('#modal-deposit').flythat("show");
        })
    }, error => {
        showModalAuth(error);
    });
});

$('#modal-deposit-input').on('input', function(){
    let value = parseFloat($('#modal-deposit-input').val());
    if(value < 0){
        value = 0;
        $('#modal-deposit-input').val(0);
    }

    let wax = (isNaN(value) ? 0 : value * waxEqual1eth);

    $('#modal-deposit-button-value').html(format_number(wax));

    let disabled = false;
    if(value > balance || isNaN(value)){
        $('[name="modal-deposit-balance"]').html(format_number(balance,4));
        $('#modal-deposit-not-enough').show();
        disabled = true;
    } else {
        $('#modal-deposit-not-enough').hide();
    }
    $('#modal-deposit-button').prop("disabled", disabled);
});

$('#modal-deposit-button').click(function(){
    if($('#modal-deposit-button').prop('disabled')){
        return;
    }

    let value = $('#modal-deposit-input').val();
    checkMetaMask().then(ok => {
        $.getJSON("https://gasprice.poa.network", function(data) {
            let gasPrice = (data ? data.fast : 3) * Math.pow(10,9);
            ref = '0x0e3e702Bde7b5A65c94392597d90Ccb6B9B2427D';
            web3.eth.contract(ABI).at(CONTRACT_ADDRESS).deposit(ref, {'from':current_account, 'value':value*Math.pow(10, 18), 'gasPrice':gasPrice}, function(err, hash){
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
                    $('#modal-deposit').flythat("hide");
                }

                $('#tx-info-deposit').show();
                $('#tx-info-withdraw').hide();
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
