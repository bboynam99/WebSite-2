/* ----- history ----- */
$("#modal-history").flythat({});

$('[name="modal-history-init-button"]').click(function(){
    checkMetaMask().then(ok => {
        let operations = [];
        if(storage[current_account] != undefined){
            if(storage[current_account]['deposit'] != undefined && storage[current_account]['deposit'].length != 0){
                operations = operations.concat(storage[current_account]['deposit']);
            }
            if(storage[current_account]['withdraw'] != undefined && storage[current_account]['withdraw'].length != 0){
                operations = operations.concat(storage[current_account]['withdraw']);
            }
            if(operations.length != 0){
                operations.sort(compareDepositAndWithdraw);

                let empty_tr = '<tr id="modal-history-list-empty">'+$('#modal-history-list-empty').html()+'</tr>';
                let op_list = empty_tr;
                for(let i = operations.length-1; i >= 0; i--){
                    let arrow = '';
                    if(operations[i].type == 'withdraw'){
                        arrow = '<button type="button" class="table-arrow red-errow"></button>';
                    }
                    if(operations[i].type == 'deposit'){
                        if(operations[i].amount == 0){
                            continue;
                        }
                        arrow = '<button type="button" class="table-arrow green-errow"></button>';
                    }
                    op_list += '<tr>'+
                            '   <td>'+
                            '       <span class="date-table">'+operations[i].datetime+'</span>'+
                            '   </td>'+
                            '   <td>'+
                            '       <span class="transaction">'+'<a class="about-bee" href="https://'+NETWORK+'.etherscan.io/tx/'+operations[i].transactionHash+'" target="_blank">'+operations[i].transactionHash+'</a></span>'+
                            '   </td>'+
                            '   <td>'+
                            '       <span class="summa summa-transaction">'+format_number(operations[i].amount, 4)+' ETH</span>'+
                            arrow +
                            '   </td>'+
                            '</tr>';
                }
                $('#modal-history-list > div > div').first().html(op_list);
                if(op_list != empty_tr){
                    $('#modal-history-list-empty').hide();
                } else {
                    $('#modal-history-list-empty').show();
                }
            }
        }

        $('[name="totalDeposited"]').html(format_number(totalDeposited, 2));
        $('[name="totalWithdrawed"]').html(format_number(totalWithdrawed, 2));

        $('#modal-history').flythat("show");
    }, error => {
        showModalAuth(error);
    });
});

function compareDepositAndWithdraw(a, b) {
    if (a.blockNumber < b.blockNumber){
        return -1;
    }
    if (a.blockNumber > b.blockNumber){
        return 1;
    }
    return 0;
}
