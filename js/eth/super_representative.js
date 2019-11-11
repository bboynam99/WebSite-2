/* ----- super_representative ----- */
$("#modal-super-representative").flythat({});

$('[name="modal-super-representative-init-button"]').click(function(){
    checkMetaMask().then(ok => {
        web3.eth.getBalance(CONTRACT_ADDRESS, function(err, data){
            if(err){
                console.log("ERROR", "web3_getBalance", err);
            } else {
                let bonus = web3.toDecimal(data)/Math.pow(10,18) * 0.01;
                $('#modal-super-representative-to-charge').html(format_number(bonus, 2));

                let getUserBonusCount = 0;
                let userBonusCount = 0;
                let empty_tr = '<tr id="modal-super-representative-list-empty">'+$('#modal-super-representative-list-empty').html()+'</tr>';
                let super_representative_arr = [];
                super_representative_arr[0] = empty_tr;
                if(storage['userAddedToBonus'] != undefined && storage['userAddedToBonus']['users'] != undefined){
                    userBonusCount = storage['userAddedToBonus']['users'].length;
                    for (let i = 0; i < storage['userAddedToBonus']['users'].length; i++) {
                        let user = storage['userAddedToBonus']['users'][i];

                        web3.eth.contract(ABI).at(CONTRACT_ADDRESS).userBonus(user, (function(err, user_bonus){
                            if(err){
                                console.log("ERROR", "web3_userBonus", err);
                                return;
                            }

                            user_bonus = Math.ceil(web3.toDecimal(user_bonus) / Math.pow(10,18));
                            super_representative_arr[i] = '  <tr>' +
                                                    '       <td>' +
                                                    '           <span class="nuber-position-super">'+(i+1)+'</span>' +
                                                    '       </td>' +
                                                    '       <td>' +
                                                    '           <span class="bee-home bee-home-super"><a class="about-bee" href="https://'+NETWORK+'.etherscan.io/address/'+user+'" target="_blank">'+user+'</a></span>'+
                                                    '       </td>' +
                                                    '       <td class="super-row">' +
                                                    '           <span class="summa-super">'+format_number(bonus / storage['userAddedToBonus']['users'].length, 2)+'</span><span class="monet-style">ETH</span>' +
                                                    '       </td>' +
                                                    '       <td class="super-row">' +
                                                    '           <span class="summa-super">'+format_number(user_bonus, 2)+'</span><span class="monet-style">ETH</span>' +
                                                    '       </td>' +
                                                    '   </tr>';
                            getUserBonusCount++;
                        }).bind(i));
                    }
                }

                let flagGetUserBonus = setInterval(function(){
                    if(getUserBonusCount < userBonusCount){
                        return;
                    }

                    clearInterval(flagGetUserBonus);
                    let super_representative_list = '';
                    for(let i = 0; i < super_representative_arr.length; i++){
                        super_representative_list += super_representative_arr[i];
                    }

                    if(super_representative_list != empty_tr){
                        $('#modal-super-representative-list').html(super_representative_list);    
                        $('#modal-super-representative-list-empty').hide();
                    } else {
                        $('#modal-super-representative-list').html(empty_tr);    
                        $('#modal-super-representative-list-empty').show();
                    }

                    $('#modal-super-representative').flythat("show");
                }, 200);
            }
        });
    }, error => {
        showModalAuth(error);
    });
});


