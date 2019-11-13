/* ----- quality-upgrade ----- */
$("#modal-quality-upgrade").flythat({});
$("#tx-info").flythat({});

$('[name="modal-quality-upgrade-init-button"]').click(function(){
    checkMetaMask().then(ok => {
        $('#modal-quantity-update-honey-balance').html(format_number(balanceHoney));

        let flagQualityHoneyPercentsAndPrices = setInterval(function(){
            if(!isGetQualityHoneyPercentsAndPrices){
                return;
            }

            clearInterval(flagQualityHoneyPercentsAndPrices);
            if(qualityLevel == 5){
                $('#modal-quality-upgrade-about').hide();
                $('#modal-quality-upgrade-next-level').hide();
                $('#modal-quantity-update-button').hide();
                $('#modal-quality-upgrade-max-level').show();
            } else {
                $('#modal-quality-upgrade-about').show();
                $('#modal-quality-upgrade-next-level').show();
                $('#modal-quantity-update-button').show();
                $('#modal-quality-upgrade-max-level').hide();

                let price = quality_prices[qualityLevel+1];
                $('#quality_upgrade_price').html(price);

                let disabled = false;
                if(price > balanceHoney){
                    $('#modal-quantity-update-not-enough').show();
                    $('#modal-quantity-update-button').prop("disabled", true);
                } else {
                    $('#modal-quantity-update-not-enough').hide();
                    $('#modal-quantity-update-button').prop("disabled", false);
                }
            }

            $('#cur_honey_percent').html(quality_honey_percents[qualityLevel]);
            $('#cur_wax_percent').html(100-quality_honey_percents[qualityLevel]);
            $('#next_honey_percent').html(quality_honey_percents[qualityLevel+1]);
            $('#next_wax_percent').html(100-quality_honey_percents[qualityLevel+1]);
            $('[name="modal-quality-upgrade-balance"]').html(format_number(balanceHoney));

            $('#modal-quality-upgrade').flythat("show");
        }, 200);
    }, error => {
        showModalAuth(error);
    });
});

$('#modal-quantity-update-button').click(function(){
    if($('#modal-quantity-update-button').prop('disabled')){
        return;
    }

    checkMetaMask().then(ok => {
        $.getJSON("https://gasprice.poa.network", function(data) {
            let gasPrice = (data ? data.fast : 3) * Math.pow(10,9);
            web3.eth.contract(ABI).at(CONTRACT_ADDRESS).updateQualityLevel({'from':current_account, 'value':0, 'gasPrice':gasPrice}, function(err, hash){
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
                    $('#modal-quality-upgrade').flythat("hide");
                }

                $('#tx-info-deposit').hide();
                $('#tx-info-withdraw').hide();
                $('#tx-info-quality-upgrade').show();
                $('#tx-info-airdrop').hide();
                $('#tx-info-buy-bee').hide();
                $('#tx-info-collect-medal').hide();

                $('#quality-upgrade-info').flythat("show");
            });
        });
    }, error => {
        showModalAuth(error);
    });
});
