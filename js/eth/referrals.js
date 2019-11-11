/* ----- referrals ----- */
$("#modal-referrals").flythat({});

$('[name="modal-referrals-init-button"]').click(function(){
    checkMetaMask().then(ok => {
        web3.eth.contract(ABI).at(CONTRACT_ADDRESS).referrals(current_account, function(err, referrals){
            if(err){
                console.log("ERROR", "Get referrals", err);
                return;
            }

            let bees_count = 0;
            let isCountBees = 0;
            for(let i = 0; i < referrals.length; i++){
                web3.eth.contract(ABI).at(CONTRACT_ADDRESS).playerBees(referrals[i], (function(err, bees){
                    isCountBees++;
                    if(err){
                        console.log("ERROR", "Get referral bees", err);
                        return;
                    }

                    for(let j = 0; j < bees.length; j++){
                        bees_count += web3.toDecimal(bees[j]);
                    }
                }).bind(i));
            }

            let flagIsCount = setInterval(function(){
                if(isCountBees < referrals.length){
                    return;
                }

                clearInterval(flagIsCount);

                let url = window.location.href;
                $('.reffer-link').html(`${window.location.origin}${window.location.pathname}?${current_account}`);
                
                let ref_list_sum = [];
                let profit = 0;
                for(let i = 0; i < storage[current_account]['referrerPaid'].length; i++){
                    profit += parseInt(storage[current_account]['referrerPaid'][i].amount / honeyEqual1eth);
                    let level = '';
                    for(let j = 0; j < storage[current_account]['referrerPaid'][i].level; j++){
                        level += 'I';
                    }

                    if(ref_list_sum[storage[current_account]['referrerPaid'][i].user] == undefined){
                        ref_list_sum[storage[current_account]['referrerPaid'][i].user] = {
                            'datetime': storage[current_account]['referrerPaid'][i].datetime,
                            'level': level,
                            'amount': storage[current_account]['referrerPaid'][i].amount,
                        };
                    } else {
                        if((new Date(storage[current_account]['referrerPaid'][i].datetime)).getTime() < (new Date(ref_list_sum[storage[current_account]['referrerPaid'][i].user].datetime).getTime())){
                            ref_list_sum[storage[current_account]['referrerPaid'][i].user]['datetime'] = storage[current_account]['referrerPaid'][i].datetime;
                        }

                        ref_list_sum[storage[current_account]['referrerPaid'][i].user]['amount'] += storage[current_account]['referrerPaid'][i].amount;
                    }
                }
                
                let empty_tr = '<tr id="modal-referrals-list-empty">'+$('#modal-referrals-list-empty').html()+'</tr>';
                let referrals_list = empty_tr;
                for (let addr in ref_list_sum) {
                    referrals_list += '  <tr>'+
                                     '      <td>'+
                                     '          <span class="date-table">'+ref_list_sum[addr].datetime+'</span>'+
                                     '      </td>'+
                                     '      <td>'+
                                     '          <span class="bee-home"><a class="about-bee" href="https://'+NETWORK+'.etherscan.io/address/'+addr+'" target="_blank">'+addr+'</a></span>'+
                                     '      </td>'+
                                     '      <td>'+
                                     '          <span class="reit-referal">'+ref_list_sum[addr].level+'</span>'+
                                     '      </td>'+
                                     '      <td>'+
                                     '          <span class="summa activ-honey">'+parseInt(ref_list_sum[addr].amount / honeyEqual1eth)+'</span>'+
                                     '      </td>'+
                                     '  </tr>';
                }
                if(referrals_list != empty_tr){
                    $('#modal-referrals-list').html(referrals_list);    
                    $('#modal-referrals-list-empty').hide();
                } else {
                    $('#modal-referrals-list').html(empty_tr);    
                    $('#modal-referrals-list-empty').show();
                }

                bees_count = 0;
                if(storage['refs'][current_account] != undefined){
                    bees_count = storage['refs'][current_account].length;
                }
                $('#modal-referrals-bees-count').html(format_number(bees_count));
                $('#modal-referrals-total-profit').html(format_number(profit));

                $('#modal-referrals').flythat("show");
            }, 200);
        })
    }, error => {
        showModalAuth(error);
    });
});

$('.reffer-btn').click(function(){
    copyToClipboard($('.reffer-link').html());
    console.log('copy');
});

