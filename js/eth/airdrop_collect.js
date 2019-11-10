/* ----- airdrop_collect ----- */
$("#modal-airdrop-collect").flythat({});
$("#modal-medal-info").flythat({});
$("#tx-info").flythat({});

$('#modal-collect-airdrop-init-button').click(function(){
    console.log(airdropCollected, !registered);
    if(airdropCollected || !registered){
        return;
    }

    checkMetaMask().then(ok => {
        $.getJSON("https://gasprice.poa.network", function(data) {
            let gasPrice = (data ? data.fast : 3) * Math.pow(10,9);
            web3.eth.contract(ABI).at(CONTRACT_ADDRESS).collect({'from':current_account, 'value':0, 'gasPrice':gasPrice}, function(err, hash){
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
                    // $('#modal-airdrop-collect').flythat("show");
                }     
                
                $('#tx-info-deposit').hide();
                $('#tx-info-withdraw').hide();
                $('#tx-info-quality-upgrade').hide();
                $('#tx-info-airdrop').show();
                $('#tx-info-buy-bee').hide();
                $('#tx-info-collect-medal').hide();

                $('#tx-info').flythat("show");
            });
        });
    }, error => {
        showModalAuth(error);
    });
});

/* ----- collect-medal ----- */
$('#collect-medal').click(function(){
    $('#modal-medal-info').flythat("hide");
    
    checkMetaMask().then(ok => {
        $.getJSON("https://gasprice.poa.network", function(data) {
            let gasPrice = (data ? data.fast : 3) * Math.pow(10,9);
            web3.eth.contract(ABI).at(CONTRACT_ADDRESS).collectMedals(current_account, {'from':current_account, 'value':0, 'gasPrice':gasPrice}, function(err, hash){
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
                }     
                
                $('#tx-info-deposit').hide();
                $('#tx-info-withdraw').hide();
                $('#tx-info-quality-upgrade').hide();
                $('#tx-info-airdrop').hide();
                $('#tx-info-buy-bee').hide();
                $('#tx-info-collect-medal').show();

                $('#tx-info').flythat("show");
            });
        });
    }, error => {
        showModalAuth(error);
    });
});
