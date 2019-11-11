/* ----- init ----- */
$("#modal-auth").flythat({});
$("#modal-deposit").flythat({});
$("#deposit-info").flythat({});
$("#modal-history").flythat({});

let flagMedalsPoints;
let flagQualityHoneyPercentsAndPrices;
let flagProfit;
let flagBeesInfo;
let flagSubscribeEvents;
let isGetActualBalance = true;
let actualBalanceTimeout = 0;

fillBeesWaxes();

/* ----- auth ----- */
auth();

function auth(){
    checkMetaMask().then(ok => {
        ethereum.on('accountsChanged', function (accounts) {
            location.reload();
            return; 
            
            balance = 0;
            current_account = '';

            last_playerBees = undefined;
            last_airdropCollected = undefined;
            last_registered = undefined;
            last_unlockedBee = undefined;

            isSentTxStartGame = true;
            $("#modal-start-game").flythat("hide");
            
            clearAllPlayerVariables();
            run();
        });

        $(document).ready(function() {
            run();
        });
    }, error => {
        showModalAuth(error);
    }); 
}

function showModalAuth(message){
    $('#modal-auth > div > .ok-title').html(message);

    $("#modal-auth").flythat("show");
}

$("#modal-auth").on('hide.flythat', function(event, el, instance) {
    auth();
});

/* ----- run ----- */
let balance = 0;
let current_account;
let totalDeposited = 0;
let totalWithdrawed = 0;
let isGetPlayerBees = false;
let playerBees = [];
let qualityLevel = 0;
let balanceHoney = 0;
let balanceWax = 0;
let airdropCollected = false;
let registered = false;
let unlockedBee = 0;
let superBeeUnlocked = false;
let medal = 0;

let last_playerBees;
let last_airdropCollected;
let last_registered;
let last_unlockedBee;

let depositEvent;
let withdrawEvent;
let referrerPaidEvent;
let rewardCollectedEvent;
let medalAwardedEvent;
let beesBoughtEvent;
let qualityUpdatedEvent;
let beeUnlockedEvent;
let userAddedToBonusEvent;

function getActualBalance(){
    setTimeout(function(){
        web3.eth.contract(ABI).at(CONTRACT_ADDRESS).instantBalance(current_account, function(err, actual_balance){
            if(err){
                console.log("ERROR", "web3.instantBalance", err);
                return;
            }
            
            balanceHoney = Math.ceil(web3.toDecimal(actual_balance[0]) / Math.pow(10,18));
            balanceWax = Math.ceil(web3.toDecimal(actual_balance[1]) / Math.pow(10,18));
            if(!airdropCollected && balanceWax > 0){
                balanceWax -= 1000;
            }
            $('#balanceHoney').val(format_number(balanceHoney));
            $('#balanceWax').val(format_number(balanceWax));
        });
        actualBalanceTimeout = 10000;
        if(isGetActualBalance){
            getActualBalance();
        }
    }, actualBalanceTimeout);
}

function run(){
    getGlobalStatistic();

    current_account = web3.eth.accounts[0];
    // current_account = "0x9c076522c963f7a59bd1f9d1154fa1a5f14c87b1";
    
    subscribeEvents();

    isGetActualBalance = true;
    getActualBalance();

    web3.eth.contract(ABI).at(CONTRACT_ADDRESS).players(current_account, function(err, player){
        if(err){
            console.log("ERROR", "web3.players", err);
            return;
        }

        // registered and airdropCollected
        registered = player[0];
        airdropCollected = player[1];
        if(airdropCollected){
            $('#modal-collect-airdrop-init-button').addClass("none-active");  
            $('#modal-collect-airdrop-init-button').html("Collected");  
        } else {
            $('#modal-collect-airdrop-init-button').html("Collect");
            if(registered){
                $('#modal-collect-airdrop-init-button').removeClass("none-active"); 
            } else {
                $('#modal-collect-airdrop-init-button').addClass("none-active"); 
            }
        }

        // referral
        if(player[2] != "0x0000000000000000000000000000000000000000"){
            ref = player[2];
        } else {
            if(window.location.search != "" && web3.isAddress(window.location.search.split('?')[1])){
                reflink = window.location.search.split('?')[1];
            } else {
                if(storage[current_account] == undefined){
                    storage[current_account] = {};
                }

                if(storage[current_account]['ref'] != undefined && web3.isAddress(storage[current_account]['ref'])){
                    reflink = storage[current_account]['ref'];
                } else {
                    reflink = ref;
                }
            }
            isSentTxStartGame = false;
            start_game();
        }

        // balanceHoney = Math.ceil(web3.toDecimal(player[3]) / Math.pow(10,18) * honeyEqual1eth);
        // balanceWax = Math.ceil(web3.toDecimal(player[4]) / Math.pow(10,18));
        // $('#balanceHoney').val(format_number(balanceHoney));
        // $('#balanceWax').val(format_number(balanceWax));

        medal = web3.toDecimal(player[6]);
        let next_medal = web3.toDecimal(player[6]) + 1;
        if(registered && next_medal == 1){
            next_medal++;
        }
        if(next_medal == 11){
            next_medal = 10;
        }
        $('.medal-after').css('background', 'url("../image/medal-'+next_medal+'.png")no-repeat');

        flagMedalsPoints = setInterval(function(){
            if(!isGetMedalsPoints){
                return;
            }

            clearInterval(flagMedalsPoints);
            let points = Math.ceil(web3.toDecimal(player[5]) / Math.pow(10,18));
            let leftower = parseInt((1 - points / medals_points[next_medal-1])*100);
            letfower = (leftower < 0 ? 0: leftower);
            $('.progress-line').css('right', letfower+'%');
            if(letfower != 0 || medal == 10){
                $('#collect-medal').hide();
                $('.medal-after').removeClass('active-100');
            } else {
                $('#collect-medal').show();
                $('.medal-after').addClass('active-100');
            }
            
            // medal popap
            $('#modal-medal-info > div > div > img').attr('src', 'image/big-medal-'+next_medal+'.png');
            $('#medal-info-points').html(parseInt(points));
            $('#medal-info-points-awaiting').html(next_medal == 1 ? 0 : medals_points[next_medal-1]);
            $('[name="medal-info-max"]').hide();
            if(next_medal == 1){
                $('#medal-info-score').hide();
                $('#medal-info-text1').hide();
                $('#medal-info-text0').show();
                $('#medal-info-text2').show();
                $('#medal-info-text3').hide();  
                $('#medal-info-have-points').hide();
                $('#medal-info-need-points').hide();
            } else {
                if(medal == 10){
                    $('#medal-info-score').hide();
                    $('#medal-info-text1').hide();
                    $('#medal-info-text0').hide();
                    $('#medal-info-text2').hide();
                    $('#medal-info-have-points').hide();
                    $('#medal-info-need-points').hide();
                    $('[name="medal-info-max"]').show();
                } else {
                    $('#medal-info-score').show();
                    $('#medal-info-text1').show();
                    $('#medal-info-text0').hide();
                    $('#medal-info-text2').hide();
                    $('#medal-info-text3').show();    
                    $('#medal-info-text3 > span').html($('#medal-info-name-'+(next_medal-1)).html());
                    $('#medal-info-have-points').show();
                    $('#medal-info-need-points').show();
                    $('#medal-info-have-points').html(format_number(medals_rewards[next_medal-2]));
                    $('#medal-info-need-points').html(format_number(medals_rewards[next_medal-1]));   
                }
            }
            for(let i = 1; i < medals_points.length; i++){
                $('#medal-info-name-'+i).hide();
            }
            $('#medal-info-name-'+next_medal).show();

        }, 200);

        // history
        totalDeposited = web3.toDecimal(player[10]) / Math.pow(10,18);
        totalWithdrawed = web3.toDecimal(player[11]) / Math.pow(10,18);

        // qualityLevel
        qualityLevel = web3.toDecimal(player[7]);
        let flagQualityHoneyPercentsAndPrices = setInterval(function(){
            if(!isGetQualityHoneyPercentsAndPrices){
                return;
            }

            clearInterval(flagQualityHoneyPercentsAndPrices);
            $('#qualityHoneyPercent').html(quality_honey_percents[qualityLevel]);
            $('#qualityWaxPercent').html(100 - quality_honey_percents[qualityLevel]);
        }, 200);

        flagProfit = setInterval(function(){
            if(!isGetBeeMonthlyPercentsAndPrices || !isGetPlayerBees){
                return;
            }

            clearInterval(flagProfit);
            let profit = calculateProfitAtHour(playerBees, bee_monthly_percents, bee_levels_prices);
            let waxHour = parseInt(profit*(100 - quality_honey_percents[qualityLevel])/100);
            $('#waxHour').html(format_number(waxHour));
            $('#honeyHour').html(format_number(profit-waxHour));
        }, 200);

        // unlockedBee
        unlockedBee = web3.toDecimal(player[9]);
    });

    web3.eth.contract(ABI).at(CONTRACT_ADDRESS).superBeeUnlocked(function(err, isUnlocked){
        if(err){
            console.log("ERROR", "web3.superBeeUnlocked", err);
            return;
        }
        superBeeUnlocked = isUnlocked;
    });
    
    web3.eth.contract(ABI).at(CONTRACT_ADDRESS).playerBees(current_account, function(err, bees){
        if(err){
            console.log("ERROR", "web3.playerBees", err);
            return;
        }
        
        for(let i = 0; i < bees.length; i++){
            playerBees[i] = web3.toDecimal(bees[i]);
        }
        isGetPlayerBees = true;
    });

    flagBeesInfo = setInterval(function(){
        if(!isGetPlayerBees || !isGetBeeMonthlyPercentsAndPrices){
            return;
        }

        clearInterval(flagBeesInfo);
        if(JSON.stringify(playerBees) !== JSON.stringify(last_playerBees) || airdropCollected !== last_airdropCollected || registered !== last_registered || unlockedBee !== last_unlockedBee){
            last_playerBees = playerBees;
            last_airdropCollected = airdropCollected;
            last_registered = registered;
            last_unlockedBee = unlockedBee;
            fillBeesWaxes(playerBees, airdropCollected, registered, unlockedBee, superBeeUnlocked);
        }
    }, 200);
}

/* ----- common ----- */ 
function checkMetaMask(){
    return new Promise(function(ok, fail){
        let web3 = window.web3;
        let isMobileSiteVersion;
        
        if(!web3){
            if(isMobileSiteVersion)
                fail('Please install the App Trust');
            else
                fail('Please install the Metamask browser extension or similar');
        }
        
        try { 
            window.ethereum.enable().then(function() {
                web3.version.getNetwork((err, netId) => { 
                    if(netId != NETID[NETWORK])
                        fail("Please switch to appropriate network: "+NETWORK);
                        
                    if(!web3.eth.accounts[0]){
                        if(isMobileSiteVersion)
                            fail('Please add account to the App Trust');
                        else
                            fail("Please login to Metamask");
                    }
                        
                    ok(web3.eth.accounts[0]);
                });
            });
        } catch(e) {
            fail('User denied access to Metamask');
        }
    });
}

function clearAllPlayerVariables(){
    clearInterval(flagMedalsPoints);
    clearInterval(flagQualityHoneyPercentsAndPrices);
    clearInterval(flagProfit);
    clearInterval(flagBeesInfo);
    clearInterval(flagSubscribeEvents);
    isGetActualBalance = false;
    actualBalanceTimeout = 0;
    
    if(depositEvent != undefined) depositEvent.stopWatching();
    if(withdrawEvent != undefined) withdrawEvent.stopWatching();
    if(referrerPaidEvent != undefined) referrerPaidEvent.stopWatching();
    if(medalAwardedEvent != undefined) medalAwardedEvent.stopWatching();
    if(beesBoughtEvent != undefined) beesBoughtEvent.stopWatching();
    if(rewardCollectedEvent != undefined) rewardCollectedEvent.stopWatching();
    if(qualityUpdatedEvent != undefined) qualityUpdatedEvent.stopWatching();
    if(beeUnlockedEvent != undefined) beeUnlockedEvent.stopWatching();
    if(userAddedToBonusEvent != undefined) userAddedToBonusEvent.stopWatching();

    totalDeposited = 0;
    totalWithdrawed = 0;
    isGetPlayerBees = false;
    playerBees = [];
    qualityLevel = 0;
    balanceHoney = 0;
    balanceWax = 0;
    airdropCollected = false;
    unlockedBee = 0;
}