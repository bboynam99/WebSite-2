/* ----- buy_bee ----- */
$("#modal-buy-bee").flythat({});
$("#modal-unlock-bee").flythat({});
$("#tx-info").flythat({});
$("#web-info").flythat({});

let id = 2;

$('#modal-bee-buy-minus').click(function(){
    let input_val = parseInt($('#modal-bee-buy-input').val());
    if(input_val <= 1){
        input_val = 2;
    }
    
    let price = bee_levels_prices[id-1] * (input_val-1);
    $('#modal-bee-buy-input').val(input_val-1);
    $('#modal-bee-buy-price').html(format_number(price));
    //check that have
    if(price > balanceHoney*1.1+balanceWax){
        $('#modal-buy-bee-button').prop('disabled', true);
        $('[name="modal-buy-bee-not-enough"]').show();
        $('#modal-buy-bee-comment').hide();
        $('[name="modal-buy-bee-button"]').hide();
    } else {
        $('#modal-buy-bee-button').prop('disabled', false);
        $('[name="modal-buy-bee-not-enough"]').hide();
        $('#modal-buy-bee-comment').show();
        $('[name="modal-buy-bee-button"]').show();
    }
});

$('#modal-bee-buy-plus').click(function(){
    let input_val = parseInt($('#modal-bee-buy-input').val());
    if(input_val >= 32 - playerBees[id-1]){
        input_val = 32 - playerBees[id-1] - 1;
    }
    
    let price = bee_levels_prices[id-1] * (input_val+1);
    $('#modal-bee-buy-input').val(input_val+1);
    $('#modal-bee-buy-price').html(format_number(price));
    //check that have
    if(price > balanceHoney*1.1+balanceWax){
        $('#modal-buy-bee-button').prop('disabled', true);
        $('[name="modal-buy-bee-not-enough"]').show();
        $('#modal-buy-bee-comment').hide();
        $('[name="modal-buy-bee-button"]').hide();
    } else {
        $('#modal-buy-bee-button').prop('disabled', false);
        $('[name="modal-buy-bee-not-enough"]').hide();
        $('#modal-buy-bee-comment').show();
        $('[name="modal-buy-bee-button"]').show();
    }
});

let element;

$('[name="bee_type_button"]').click(function(event){
    element = event.target.id;

    if($('#'+element).hasClass('none-active')){
        return;
    }

    id = parseInt(element.split('bee_type_button_')[1]);
    checkMetaMask().then(ok => {
        if(!isGetBeeMonthlyPercentsAndPrices || !isGetPlayerBees){
            $('#web-info').flythat("show");
            return;
        }

        for(let i = 2; i <= 8; i++){
            $('[name="modal-buy-bee-'+i+'"]').hide();    
        }
        $('[name="modal-buy-bee-'+id+'"]').show();
        $('[name="modal-bee-buy-amount"]').html(format_number(balanceHoney*1.1+balanceWax));

        $('#modal-unlock-bee-price').html(format_number(bee_levels_prices[id-1]));
        $('#modal-unlock-bee-unlock-price').html(format_number(unlockBeePrice[id-1]));
        $('#modal-unlock-bee-percent').html(bee_monthly_percents[id-1]);
        $('#modal-unlock-bee-profit').html(format_number(parseFloat(bee_levels_prices[id-1] * bee_monthly_percents[id-1] / 30 / 24 / 100), 2));

        $('[name="modal-buy-bee-img"]').attr('src', 'image/'+id+'.png');
        $('#modal-buy-bee-have').html(playerBees[id-1]);

        $('#modal-bee-buy-input').val(1);
        $('#modal-bee-buy-price').html(format_number(bee_levels_prices[id-1]));
        $('#modal-bee-buy-max').html(32 - playerBees[id-1]);
        
        if($(event.target).html() == "Unlock"){
            $('#modal-unlock-bee').flythat("show"); 
            if(balanceHoney*1.1+balanceWax < unlockBeePrice[id-1]){
                $('[name="modal-buy-bee-button"]').prop('disabled', true);
                $('[name="modal-buy-bee-not-enough"]').show();
            } else {
                $('[name="modal-buy-bee-button"]').prop('disabled', false);
                $('[name="modal-buy-bee-not-enough"]').hide();
            }

            if(!bees_can_unlock[element.split('bee_type_button_')[1]-1] || (element.split('bee_type_button_')[1]-1 == 6 && medal < 9)){
                $('#modal-unlock-bee-about-first').hide();
                $('#modal-unlock-bee-about-failed').hide();
                $('#modal-unlock-bee-about-last').hide();

                if(element.split('bee_type_button_')[1]-1 == 1){
                    $('#modal-unlock-bee-about-first').show();    
                } else if(element.split('bee_type_button_')[1]-1 == 7){
                    $('#modal-unlock-bee-about-last').show();
                } else {
                    $('#modal-unlock-bee-about-failed').show();
                }
                $('#modal-unlock-bee-about-success').hide();
                $('[name="modal-buy-bee-button"]').hide();
                $('[name="modal-buy-bee-not-enough"]').hide();
            } else {
                $('#modal-unlock-bee-about-first').hide();   
                $('#modal-unlock-bee-about-failed').hide();
                $('#modal-unlock-bee-about-last').hide();
                $('#modal-unlock-bee-about-success').show();
                $('[name="modal-buy-bee-button"]').show();
            }
        } else {
            $('[name="modal-buy-bee-button"]').show();
            if($('#modal-bee-buy-input').val() * bee_levels_prices[id-1] > balanceHoney*1.1+balanceWax){
                $('[name="modal-buy-bee-button"]').prop('disabled', true);
                $('[name="modal-buy-bee-not-enough"]').show();
                $('#modal-buy-bee-comment').hide();
            } else {
                $('[name="modal-buy-bee-button"]').prop('disabled', false);
                $('[name="modal-buy-bee-not-enough"]').hide();
                $('#modal-buy-bee-comment').show();
            }

            $('#modal-buy-bee').flythat("show");
        }
        
    }, error => {
        showModalAuth(error);
    });
});

$('#modal-bee-buy-input').on('input', function(){
    let value = parseInt($('#modal-bee-buy-input').val());

    if(value < 1){
        value = 1;
    }
    if(value > 32 - playerBees[id-1]){
        value = 32 - playerBees[id-1];
    }
    
    let price = (isNaN(value) ? 0 : bee_levels_prices[id-1] * value);
    $('#modal-bee-buy-input').val(value);
    $('#modal-bee-buy-price').html(format_number(price));

    //check that have
    if(price > balanceHoney*1.1+balanceWax || isNaN(value)){
        $('#modal-buy-bee-button').prop('disabled', true);
        $('#modal-buy-bee-comment').hide();
        $('[name="modal-buy-bee-button"]').hide();

        if(isNaN(value)){
            $('[name="modal-buy-bee-not-enough"]').hide();
            $('[name="modal-buy-bee-not-value"]').show();
        } else {
            $('[name="modal-buy-bee-not-enough"]').show();
            $('[name="modal-buy-bee-not-value"]').hide();
        }
    } else {
        $('#modal-buy-bee-button').prop('disabled', false);
        $('[name="modal-buy-bee-not-enough"]').hide();
        $('[name="modal-buy-bee-not-value"]').hide();
        $('#modal-buy-bee-comment').show();
        $('[name="modal-buy-bee-button"]').show();
    }
});

$('[name="modal-buy-bee-button"]').click(function(){
    if($('#modal-buy-bee-button').prop('disabled') || (!bees_can_unlock[element.split('bee_type_button_')[1]-1] && id != 8) || (id == 8 && !superBeeUnlocked)){
        return;
    }

    let value = parseInt($('#modal-bee-buy-input').val());
    checkMetaMask().then(ok => {
        $.getJSON("https://gasprice.poa.network", function(data) {
            let gasPrice = (data ? data.fast : 3) * Math.pow(10,9);
            if(unlockedBee < id-1 && id != 8){
                web3.eth.contract(ABI).at(CONTRACT_ADDRESS).unlock(id-1, {'from':current_account, 'value':0, 'gasPrice':gasPrice}, function(err, hash){
                    actionAfterMetamask(err, hash);
                });
            } else {
                web3.eth.contract(ABI).at(CONTRACT_ADDRESS).buyBees(id-1, value, {'from':current_account, 'value':0, 'gasPrice':gasPrice}, function(err, hash){
                    actionAfterMetamask(err, hash);
                });
            }
        });
    }, error => {
        showModalAuth(error);
    });
});

function actionAfterMetamask(err, hash){
    
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
        $('#modal-buy-bee').flythat("hide");
        $("#modal-unlock-bee").flythat("hide");
    }

    $('#tx-info-deposit').hide();
    $('#tx-info-withdraw').hide();
    $('#tx-info-quality-upgrade').hide();
    $('#tx-info-airdrop').hide();
    $('#tx-info-buy-bee').show();
    $('#tx-info-collect-medal').hide();

    $('#tx-info').flythat("show");
}