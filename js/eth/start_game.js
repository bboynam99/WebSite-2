/* ----- start_game ----- */
$("#modal-start-game").flythat({});

let isSentTxStartGame = false;
$("#modal-start-game").on('hide.flythat', function(event, el, instance) {
    if(!isSentTxStartGame){
        $("#modal-start-game").flythat("show");
    }
});

let representatives = [];
$.get('https://sheets.googleapis.com/v4/spreadsheets/' + GOOGLE_SPREASHEET_ID +
      '/values/' + GOOGLE_SHEET_TAB_NAME + '!A1:L200' + 
      '?key=' + GOOGLE_API_KEY, 
function(data, result){
    if(result != "success"){
        console.log("ERROR", "get_google", err);
    } else {
        for(let i = 1; i < data.values.length; i++){
            representatives.push(data.values[i][4]);
        }
    }
});

function start_game(){
    $('#modal-start-game-input').val(reflink);

    checkStartGameAddress();

    $("#modal-start-game").flythat("show");
}

$('#modal-start-game-input').on('input', function(){
    checkStartGameAddress();
});

$('#modal-start-game-button').click(function(){
    if($('#modal-start-game-button').prop('disabled')){
        return;
    }

    isSentTxStartGame = true;

    ref = $('#modal-start-game-input').val();
    storage[current_account]['ref'] = ref;
    localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

    $.getJSON("https://gasprice.poa.network", function(data) {
        let gasPrice = (data ? data.fast : 3) * Math.pow(10,9);
        web3.eth.contract(ABI).at(CONTRACT_ADDRESS).deposit(ref, {'from':current_account, 'value':0, 'gasPrice':gasPrice}, function(err, hash){
            $("#modal-start-game").flythat("hide");

            if(err){
                console.log("ERROR", "web3_register", err);
                start_game();
            }
        });
    });
});

function checkStartGameAddress(){
    if(!web3infura.isAddress($('#modal-start-game-input').val())){
        $('#modal-start-game-bad-address').show();
        $('#modal-start-game-bad-player').hide();
        $('#modal-start-game-button').prop('disabled', true);
    } else {
        $('#modal-start-game-bad-address').hide();

        web3infura.eth.contract(ABI).at(CONTRACT_ADDRESS).players($('#modal-start-game-input').val(), function(err, player){
            if(err){
                console.log("ERROR", "web3infura_players", err);
            } else {
                // check registered
                if(!player[0] && total_invest > 0 && representatives.indexOf($('#modal-start-game-input').val()) == -1){
                    $('#modal-start-game-bad-player').show();
                    $('#modal-start-game-button').prop('disabled', true);
                } else {
                    $('#modal-start-game-bad-player').hide();
                    $('#modal-start-game-button').prop('disabled', false);
                }
            }
        });
    }
}