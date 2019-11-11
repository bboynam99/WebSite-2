$("#modal-success-action").flythat({});

function subscribeEvents(){
    if(storage[current_account] == undefined){
        storage[current_account] = {};
    }
    if(storage['rate'] == undefined){
        storage['rate'] = [];
    }

    flagSubscribeEvents = setInterval(function(){
        if(!isGetBeeMonthlyPercentsAndPrices){
            return;
        }
        
        clearInterval(flagSubscribeEvents);
        subscribeDeposit();
        subbscribeWithdraw();
        subscribeReferrerPaid();
        subscribeMedalAwarded();
        subscribeBeesBought();
        subscribeRewardCollected();
        subscribeQualityUpdated();
        subscribeBeeUnlocked();
        subscribeUserAddedToBonus();
    }, 200);
}

function subscribeDeposit(){
    if(storage[current_account]['deposit'] == undefined){
        storage[current_account]['deposit'] = [];
    }
    let lastDeposit = storage[current_account]['deposit'][storage[current_account]['deposit'].length-1];
    let fromBlock = (lastDeposit == undefined ? CREATE_CONTRACT_BLOCK : lastDeposit['blockNumber']);

    depositEvent = web3.eth.contract(ABI).at(CONTRACT_ADDRESS).Deposited({}, {
        fromBlock: fromBlock,
        toBlock: 'latest',
        topics: ['0x000000000000000000000000'+current_account.split('0x')[1]]
    });

    depositEvent.watch(function(err, event){
        if(err){
            console.log("ERROR", "eth_Deposited", err.toString());
        } else {

            web3.eth.getBlock(event.blockNumber, function(err, data){
                if(err){
                    console.log("ERROR", "getBlock", err);
                    block_timestamp = 0;
                } else {
                    block_timestamp = data.timestamp*1000;
                }

                if(storage['rate'].find(x => x.user === event.args.user) == undefined){
                    let bees = [0,0,0,0,0,0,0,0];
                    storage['rate'].push({
                        'user': event.args.user,
                        'bees': 0,
                        'profit': 0,
                        'logIndexes': [],
                        'count': 0,
                    });
                }

                if(current_account != event.args.user){
                    localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
                    return;
                }

                let deposit = {
                    'amount': web3.toDecimal(event.args.amount) / Math.pow(10,18),
                    'blockNumber': event.blockNumber,
                    'transactionHash': event.transactionHash,
                    'type': 'deposit',
                    'datetime': getDateTime(block_timestamp),
                };
                if(storage[current_account]['deposit'].map(function(e) { return JSON.stringify(e); }).indexOf(JSON.stringify(deposit)) != -1){
                    return;
                }

                storage[current_account]['deposit'].push(deposit);
                localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

                if(web3.toDecimal(event.args.amount) / Math.pow(10,18) != 0){
                    $('[name="modal-success-action-deposit"]').show();
                    $('[name="modal-success-action-withdraw"]').hide();
                    $('[name="modal-success-action-airdrop-collect"]').hide();
                    $('[name="modal-success-action-medal"]').hide();
                    $('[name="modal-success-action-buy-bee"]').hide();
                    $('[name="modal-success-quality-upgrade"]').hide();
                    $('[name="modal-success-bee-unlock"]').hide();
                    $('[name="modal-success-action-deposit"] > span').html(format_number(Math.ceil(waxEqual1eth * web3.toDecimal(event.args.amount) / Math.pow(10,18))));
                    $('[name="modal-success-action-deposit"] > a').attr('href', 'https://'+NETWORK+'.etherscan.io/tx/'+event.transactionHash);
                    $('#modal-success-action > div > div > img').attr('src', 'image/ok-medal.png');

                    $('#modal-success-action').flythat("show");
                }

                clearAllPlayerVariables();
                run();
            });
            
        }
    });
}

function subbscribeWithdraw(){
    if(storage[current_account]['withdraw'] == undefined){
        storage[current_account]['withdraw'] = [];
    }
    let lastWithdraw = storage[current_account]['withdraw'][storage[current_account]['withdraw'].length-1];
    let fromBlock = (lastWithdraw == undefined ? CREATE_CONTRACT_BLOCK : lastWithdraw['blockNumber']);

    withdrawEvent = web3.eth.contract(ABI).at(CONTRACT_ADDRESS).Withdrawed({}, {
        fromBlock: fromBlock,
        toBlock: 'latest',
        topics: ['0x000000000000000000000000'+current_account.split('0x')[1]]
    });

    withdrawEvent.watch(function(err, event){
        if(err){
            console.log("ERROR", "eth_Withdrawed", err.toString());
        } else {
            web3.eth.getBlock(event.blockNumber, function(err, data){
                if(err){
                    console.log("ERROR", "getBlock", err);
                    block_timestamp = 0;
                } else {
                    block_timestamp = data.timestamp*1000;
                }

                if(current_account != event.args.user){
                    return;
                }
                let withdraw = {
                    'amount': web3.toDecimal(event.args.amount) / Math.pow(10,18),
                    'blockNumber': event.blockNumber,
                    'transactionHash': event.transactionHash,
                    'type': 'withdraw',
                    'datetime': getDateTime(block_timestamp),
                };
                if(storage[current_account]['withdraw'].map(function(e) { return JSON.stringify(e); }).indexOf(JSON.stringify(withdraw)) != -1){
                    return;
                }

                storage[current_account]['withdraw'].push(withdraw);

                $('[name="modal-success-action-deposit"]').hide();
                $('[name="modal-success-action-withdraw"]').show();
                $('[name="modal-success-action-airdrop-collect"]').hide();
                $('[name="modal-success-action-medal"]').hide();
                $('[name="modal-success-action-buy-bee"]').hide();
                $('[name="modal-success-quality-upgrade"]').hide();
                $('[name="modal-success-bee-unlock"]').hide();
                $('[name="modal-success-action-withdraw"] > span').html(format_number(web3.toDecimal(event.args.amount) / Math.pow(10,18), 3));
                $('[name="modal-success-action-withdraw"] > a').attr('href', 'https://'+NETWORK+'.etherscan.io/tx/'+event.transactionHash);
                $('#modal-success-action > div > div > img').attr('src', 'image/ok-medal.png');

                $('#modal-success-action').flythat("show");

                clearAllPlayerVariables();
                run();
                
                localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
            });
        }
    });
}

function subscribeReferrerPaid(){
    if(storage[current_account]['referrerPaid'] == undefined){
        storage[current_account]['referrerPaid'] = [];
    }
    let lastReferrerPaid = storage[current_account]['referrerPaid'][storage[current_account]['referrerPaid'].length-1];
    let fromBlock = (lastReferrerPaid == undefined ? CREATE_CONTRACT_BLOCK : lastReferrerPaid['blockNumber']);

    referrerPaidEvent = web3.eth.contract(ABI).at(CONTRACT_ADDRESS).ReferrerPaid({}, {
        fromBlock: fromBlock,
        toBlock: 'latest',
        topics: ['0x000000000000000000000000'+current_account.split('0x')[1]]
    });

    referrerPaidEvent.watch(function(err, event){
        if(err){
            console.log("ERROR", "eth_ReferrerPaid", err.toString());
        } else {

            web3.eth.getBlock(event.blockNumber, function(err, data){
                if(err){
                    console.log("ERROR", "getBlock", err);
                    block_timestamp = 0;
                } else {
                    block_timestamp = data.timestamp*1000;
                }

                if(storage['refs'] == undefined){
                    storage['refs'] = {};
                }
                if(storage['refs'][event.args.referrer] == undefined){
                    storage['refs'][event.args.referrer] = [];
                }
                if(storage['refs'][event.args.user] == undefined){
                    storage['refs'][event.args.user] = [];
                }
                if(storage['refs'][event.args.referrer].indexOf(event.args.user) == -1){
                    storage['refs'][event.args.referrer].push(event.args.user);
                    storage['refs'][event.args.user]['ref'] = event.args.referrer;

                    // level 2
                    if (storage['refs'][event.args.referrer]['ref'] != undefined && 
                        storage['refs'][ storage['refs'][event.args.referrer]['ref'] ].indexOf(event.args.user) == -1){
                        storage['refs'][ storage['refs'][event.args.referrer]['ref'] ].push(event.args.user);
                    }
                    // level 3
                    if (storage['refs'][event.args.referrer]['ref'] != undefined && storage['refs'][ storage['refs'][event.args.referrer]['ref'] ]['ref'] != undefined &&
                        storage['refs'][ storage['refs'][ storage['refs'][event.args.referrer]['ref'] ]['ref'] ].indexOf(event.args.user) == -1){
                        storage['refs'][ storage['refs'][ storage['refs'][event.args.referrer]['ref'] ]['ref'] ].push(event.args.user);
                    }
                    localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

                    let hive_leader = parseInt($('.hive_leader').html());
                    if(hive_leader < storage['refs'][event.args.referrer].length){
                        hive_leader = storage['refs'][event.args.referrer].length;
                    }
                    if (storage['refs'][ storage['refs'][event.args.referrer]['ref'] ] != undefined && 
                        hive_leader < storage['refs'][ storage['refs'][event.args.referrer]['ref'] ].length){
                        hive_leader = storage['refs'][ storage['refs'][event.args.referrer]['ref'] ].length;
                    }
                    if (storage['refs'][ storage['refs'][event.args.referrer]['ref'] ] != undefined &&
                        storage['refs'][ storage['refs'][ storage['refs'][event.args.referrer]['ref'] ]['ref'] ] != undefined && 
                        hive_leader < storage['refs'][ storage['refs'][ storage['refs'][event.args.referrer]['ref'] ]['ref'] ].length){
                        hive_leader = storage['refs'][ storage['refs'][ storage['refs'][event.args.referrer]['ref'] ]['ref'] ].length;
                    }
                    $('.hive_leader').html(hive_leader);
                }

                if(current_account != event.args.referrer){
                    return;
                }

                let referrerPaid = {
                    'amount': web3.toDecimal(event.args.amount) / Math.pow(10,18) * honeyEqual1eth,
                    'level': web3.toDecimal(event.args.level),
                    'user': event.args.user,
                    'blockNumber': event.blockNumber,
                    'transactionHash': event.transactionHash,
                    'datetime': getDateTime(block_timestamp),
                };
                
                if(storage[current_account]['referrerPaid'].map(function(e) { return JSON.stringify(e); }).indexOf(JSON.stringify(referrerPaid)) != -1){
                    return;
                }

                storage[current_account]['referrerPaid'].push(referrerPaid);

                clearAllPlayerVariables();
                run();

                localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
            });
            
        }
    });
}
 
function subscribeRewardCollected(){
    let lastRewardCollected = storage[current_account]['lastRewardCollected'];
    let fromBlock = (lastRewardCollected == undefined ? CREATE_CONTRACT_BLOCK : lastRewardCollected['blockNumber']);

    rewardCollectedEvent = web3.eth.contract(ABI).at(CONTRACT_ADDRESS).RewardCollected({}, {
        fromBlock: fromBlock,
        toBlock: 'latest',
        topics: ['0x000000000000000000000000'+current_account.split('0x')[1]]
    });

    rewardCollectedEvent.watch(function(err, event){
        if(err){
            console.log("ERROR", "eth_RewardCollected", err.toString());
        } else {
            if(current_account == event.args.user && !airdropCollected){
                $('[name="modal-success-action-deposit"]').hide();
                $('[name="modal-success-action-withdraw"]').hide();
                $('[name="modal-success-action-airdrop-collect"]').show();
                $('[name="modal-success-action-medal"]').hide();
                $('[name="modal-success-action-buy-bee"]').hide();
                $('[name="modal-success-quality-upgrade"]').hide();
                $('[name="modal-success-bee-unlock"]').hide();
                $('[name="modal-success-action-airdrop-collect"] > a').attr('href', 'https://'+NETWORK+'.etherscan.io/tx/'+event.transactionHash);
                $('#modal-success-action > div > div > img').attr('src', 'image/ok-medal.png');

                $('#modal-success-action').flythat("show");                
            }

            // statistic
            if(storage['rate'].find(x => x.user === event.args.user) == undefined){
                let bees = [32,0,0,0,0,0,0,0];
                storage['rate'].push({
                    'user': event.args.user,
                    'bees': bees,
                    'profit': calculateProfitAtHour(bees, bee_monthly_percents, bee_levels_prices),
                    'logIndexes': [[event.transactionHash, event.logIndex]],
                    'count': 32,
                });
            } else {
                let index = storage['rate'].indexOf(storage['rate'].find(x => x.user === event.args.user));
                if(storage['rate'][index]['logIndexes'].map(function(e) { return JSON.stringify(e); }).indexOf(JSON.stringify([event.transactionHash, event.logIndex])) != -1){
                    return;
                }

                if(storage['rate'][index]['bees'][0] != 32){
                    storage['rate'][index]['bees'][0] = 32;
                    storage['rate'][index]['count'] += 32;
                    storage['rate'][index]['logIndexes'].push([[event.transactionHash, event.logIndex]]);
                }
            }

            storage[current_account]['RewardCollected'] = event.blockNumber
            localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));    
            
            if(current_account == event.args.user && !airdropCollected){
                clearAllPlayerVariables();
                run();
            }
        }
    });
}

function subscribeMedalAwarded(){
    let lastMedalAwarded = storage[current_account]['lastMedalAwarded'];
    let fromBlock = (lastMedalAwarded == undefined ? CREATE_CONTRACT_BLOCK : lastMedalAwarded['blockNumber']);

    medalAwardedEvent = web3.eth.contract(ABI).at(CONTRACT_ADDRESS).MedalAwarded({}, {
        fromBlock: fromBlock,
        toBlock: 'latest',
        topics: ['0x000000000000000000000000'+current_account.split('0x')[1]]
    });

    medalAwardedEvent.watch(function(err, event){
        if(err){
            console.log("ERROR", "eth_MedalAwarded", err.toString());
        } else {
            if(current_account != event.args.user){
                return;
            }

            let medal = web3.toDecimal(event.args.medal);
            if(storage[current_account]['lastMedalAwarded'] != undefined && storage[current_account]['lastMedalAwarded']['medal'] >= medal){
                return;
            }

            $('[name="modal-success-action-deposit"]').hide();
            $('[name="modal-success-action-withdraw"]').hide();
            $('[name="modal-success-action-airdrop-collect"]').hide();
            $('[name="modal-success-action-medal"]').show();
            $('[name="modal-success-action-buy-bee"]').hide();
            $('[name="modal-success-quality-upgrade"]').hide();
            $('[name="modal-success-bee-unlock"]').hide();
            $('[name="modal-success-action-medal"] > a').attr('href', 'https://'+NETWORK+'.etherscan.io/tx/'+event.transactionHash);
            $('#modal-success-action > div > div > img').attr('src', 'image/big-medal-'+medal+'.png');

            $('#modal-success-action').flythat("show");

            storage[current_account]['lastMedalAwarded'] = {
                'blockNumber': event.blockNumber,
                'medal': medal,
            }
            localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
            
            clearAllPlayerVariables();
            run();
        }
    });
}

function subscribeBeesBought(){
    let lastBuyBee = storage[current_account]['lastBuyBee'];
    let fromBlock = (lastBuyBee == undefined ? CREATE_CONTRACT_BLOCK : lastBuyBee['blockNumber']);

    beesBoughtEvent = web3.eth.contract(ABI).at(CONTRACT_ADDRESS).BeesBought({}, {
        fromBlock: fromBlock,
        toBlock: 'latest',
        topics: ['0x000000000000000000000000'+current_account.split('0x')[1]]
    });

    beesBoughtEvent.watch(function(err, event){
        if(err){
            console.log("ERROR", "eth_BeesBought", err.toString());
        } else {
            let last_log_index;
            if (current_account == event.args.user && 
                (storage[current_account]['lastBuyBee'] == undefined || storage[current_account]['lastBuyBee']['lastLogIndex'] == undefined || storage[current_account]['lastBuyBee']['lastLogIndex'].map(function(e) { return JSON.stringify(e); }).indexOf(JSON.stringify([event.transactionHash, event.logIndex])) == -1)){

                if(storage[current_account]['lastBuyBee'] != undefined && storage[current_account]['lastBuyBee']['lastLogIndex'] != undefined){
                    last_log_index = storage[current_account]['lastBuyBee']['lastLogIndex'];
                }

                storage[current_account]['lastBuyBee'] = {
                    'blockNumber': event.blockNumber,
                    'user': event.args.user,
                    'bee': web3.toDecimal(event.args.bee),
                    'count': web3.toDecimal(event.args.count),
                    'lastLogIndex': last_log_index ? [...last_log_index, ...[[event.transactionHash, event.logIndex]]] : [[event.transactionHash, event.logIndex]],
                }
                localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

                $('[name="modal-success-action-deposit"]').hide();
                $('[name="modal-success-action-withdraw"]').hide();
                $('[name="modal-success-action-airdrop-collect"]').hide();
                $('[name="modal-success-action-medal"]').hide();
                $('[name="modal-success-action-buy-bee"]').show();
                $('[name="modal-success-quality-upgrade"]').hide();
                $('[name="modal-success-bee-unlock"]').hide();
                $('[name="modal-success-action-buy-bee"] > span').html(storage[current_account]['lastBuyBee']['count']);
                $('[name="modal-success-action-buy-bee"] > a').attr('href', 'https://'+NETWORK+'.etherscan.io/tx/'+event.transactionHash);
                $('#modal-success-action > div > div > img').attr('src', 'image/'+(web3.toDecimal(event.args.bee)+1)+'.png');

                $('#modal-success-action').flythat("show");
            }

            // statistic
            if(storage['rate'].find(x => x.user === event.args.user) == undefined){
                let bees = [0,0,0,0,0,0,0,0];
                bees[web3.toDecimal(event.args.bee)] = web3.toDecimal(event.args.count);
                storage['rate'].push({
                    'user': event.args.user,
                    'bees': bees,
                    'profit': calculateProfitAtHour(bees, bee_monthly_percents, bee_levels_prices),
                    'logIndexes': [[event.transactionHash, event.logIndex]],
                    'count': web3.toDecimal(event.args.count),
                });
            } else {
                let index = storage['rate'].indexOf(storage['rate'].find(x => x.user === event.args.user));
                if(storage['rate'][index]['logIndexes'].map(function(e) { return JSON.stringify(e); }).indexOf(JSON.stringify([event.transactionHash, event.logIndex])) != -1){
                    return;
                }

                storage['rate'][index]['bees'][web3.toDecimal(event.args.bee)] += web3.toDecimal(event.args.count);
                storage['rate'][index]['profit'] = calculateProfitAtHour(storage['rate'][index]['bees'], bee_monthly_percents, bee_levels_prices);
                storage['rate'][index]['logIndexes'].push([event.transactionHash, event.logIndex]);
                storage['rate'][index]['count'] += web3.toDecimal(event.args.count);
            }

            let index = storage['rate'].indexOf(storage['rate'].find(x => x.user === event.args.user));
            let hive_leader = parseInt($('.hive_leader').html());
            if(storage['refs'] == undefined){
                storage['refs'] = {};
            }
            if(storage['refs'][storage['rate'][index]['user']] != undefined && hive_leader < storage['refs'][storage['rate'][index]['user']].length){
                $('.hive_leader').html(storage['rate'][index]['count']);
            }

            localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));

            if(current_account == event.args.user && 
                (storage[current_account]['lastBuyBee'] == undefined || last_log_index == undefined || last_log_index.map(function(e) { return JSON.stringify(e); }).indexOf(JSON.stringify([event.transactionHash, event.logIndex])) == -1)){
                clearAllPlayerVariables();
                run();
            }
        }
    });
}

function subscribeQualityUpdated(){
    let lastQualityUpdated = storage[current_account]['lastQualityUpdated'];
    let fromBlock = (lastQualityUpdated == undefined ? CREATE_CONTRACT_BLOCK : lastQualityUpdated['blockNumber']);

    qualityUpdatedEvent = web3.eth.contract(ABI).at(CONTRACT_ADDRESS).QualityUpdated({}, {
        fromBlock: fromBlock,
        toBlock: 'latest',
        topics: ['0x000000000000000000000000'+current_account.split('0x')[1]]
    });

    qualityUpdatedEvent.watch(function(err, event){
        if(err){
            console.log("ERROR", "eth_qualityUpdatedEvent", err.toString());
        } else {
            if(current_account != event.args.user){
                return;
            }

            let quality = web3.toDecimal(event.args.quality);
            if(storage[current_account]['lastQualityUpdated'] != undefined && storage[current_account]['lastQualityUpdated']['quality'] >= quality){
                return;
            }

            $('[name="modal-success-action-deposit"]').hide();
            $('[name="modal-success-action-withdraw"]').hide();
            $('[name="modal-success-action-airdrop-collect"]').hide();
            $('[name="modal-success-action-medal"]').hide();
            $('[name="modal-success-action-buy-bee"]').hide();
            $('[name="modal-success-quality-upgrade"]').show();
            $('[name="modal-success-bee-unlock"]').hide();
            $('[name="modal-success-quality-upgrade"] > a').attr('href', 'https://'+NETWORK+'.etherscan.io/tx/'+event.transactionHash);
            $('#modal-success-action > div > div > img').attr('src', 'image/ok-medal.png');

            $('#modal-success-action').flythat("show");

            storage[current_account]['lastQualityUpdated'] = {
                'blockNumber': event.blockNumber,
                'quality': quality,
            }
            localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
            
            clearAllPlayerVariables();
            run();
        }
    });
}

function subscribeBeeUnlocked(){
    let lastBeeUnlocked = storage[current_account]['lastBeeUnlocked'];
    let fromBlock = (lastBeeUnlocked == undefined ? CREATE_CONTRACT_BLOCK : lastBeeUnlocked['blockNumber']);

    beeUnlockedEvent = web3.eth.contract(ABI).at(CONTRACT_ADDRESS).BeeUnlocked({}, {
        fromBlock: fromBlock,
        toBlock: 'latest',
        topics: ['0x000000000000000000000000'+current_account.split('0x')[1]]
    });

    beeUnlockedEvent.watch(function(err, event){
        if(err){
            console.log("ERROR", "eth_beeUnlockedEvent", err.toString());
        } else {
            if(storage['rate'].find(x => x.user === event.args.user) == undefined){
                let bees = [0,0,0,0,0,0,0,0];
                bees[web3.toDecimal(event.args.bee)] = 1;
                storage['rate'].push({
                    'user': event.args.user,
                    'bees': bees,
                    'profit': calculateProfitAtHour(bees, bee_monthly_percents, bee_levels_prices),
                    'logIndexes': [[event.transactionHash, event.logIndex]],
                    'count': 1,
                });
            } else {
                let index = storage['rate'].indexOf(storage['rate'].find(x => x.user === event.args.user));
                if(storage['rate'][index]['logIndexes'].map(function(e) { return JSON.stringify(e); }).indexOf(JSON.stringify([event.transactionHash, event.logIndex])) != -1){
                    return;
                }

                storage['rate'][index]['bees'][web3.toDecimal(event.args.bee)] += 1;
                storage['rate'][index]['profit'] = calculateProfitAtHour(storage['rate'][index]['bees'], bee_monthly_percents, bee_levels_prices);
                storage['rate'][index]['logIndexes'].push([event.transactionHash, event.logIndex]);
                storage['rate'][index]['count'] += web3.toDecimal(event.args.count);
            }
        

            if(current_account != event.args.user){
                return;
            }

            if(storage[current_account]['lastBeeUnlocked'] != undefined && storage[current_account]['lastBeeUnlocked']['lastLogIndex'] != undefined && storage[current_account]['lastBeeUnlocked']['lastLogIndex'] >= event.logIndex){
                return;
            }

            storage[current_account]['lastBeeUnlocked'] = {
                'blockNumber': event.blockNumber,
                'user': event.args.user,
                'bee': web3.toDecimal(event.args.bee),
                'lastLogIndex': event.logIndex,
            }

            $('[name="modal-success-action-deposit"]').hide();
            $('[name="modal-success-action-withdraw"]').hide();
            $('[name="modal-success-action-airdrop-collect"]').hide();
            $('[name="modal-success-action-medal"]').hide();
            $('[name="modal-success-action-buy-bee"]').hide();
            $('[name="modal-success-quality-upgrade"]').hide();
            $('[name="modal-success-bee-unlock"]').show();
            $('[name="modal-success-bee-unlock"] > a').attr('href', 'https://'+NETWORK+'.etherscan.io/tx/'+event.transactionHash);
            $('#modal-success-action > div > div > img').attr('src', 'image/'+(web3.toDecimal(event.args.bee)+1)+'.png');

            $('#modal-success-action').flythat("show");

            localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
            
            clearAllPlayerVariables();
            run();
        }
    });
}

function subscribeUserAddedToBonus(){
    let lastUserAddedToBonus = storage['userAddedToBonus'];
    let fromBlock = (lastUserAddedToBonus == undefined ? CREATE_CONTRACT_BLOCK : lastUserAddedToBonus['blockNumber']);

    if(storage['userAddedToBonus'] == undefined){
        storage['userAddedToBonus'] = {};
    }

    userAddedToBonusEvent = web3.eth.contract(ABI).at(CONTRACT_ADDRESS).UserAddedToBonus({}, {
        fromBlock: fromBlock,
        toBlock: 'latest',
    });

    userAddedToBonusEvent.watch(function(err, event){
        if(err){
            console.log("ERROR", "eth_UserAddedToBonus", err.toString());
        } else {
            if(storage['userAddedToBonus']['users'] == undefined){
                storage['userAddedToBonus']['users'] = [];
            }

            if(storage['userAddedToBonus']['users'].indexOf(event.args.user) != -1){
                return;
            }

            storage['userAddedToBonus']['blockNumber'] = event.blockNumber;
            storage['userAddedToBonus']['users'].push(event.args.user);

            localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
        }
    });
}
 


