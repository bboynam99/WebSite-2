/* ----- rates ----- */
$("#modal-rates").flythat({});

$('[name="modal-rate-init-button"]').click(function(){
    let sort_storage_rate = storage["rate"].sort((a, b) => (a.profit < b.profit) ? 1 : -1);

    let empty_tr = '<tr id="modal-rates-list-empty">'+$('#modal-history-list-empty').html()+'</tr>';
    let rates_list = empty_tr;
    for(let i = 0; i < sort_storage_rate.length; i++){
        rates_list +=   '  <tr>'+
                        '      <td id="modal-rates-list-pos-'+(i+1)+'">'+
                        '          <span class="nuber-position">'+(i+1)+'</span>'+ 
                        '      </td>'+
                        '      <td>'+
                        '          <span class="bee-home"><a class="about-bee" href="https://'+NETWORK+'.etherscan.io/address/'+sort_storage_rate[i].user+'" target="_blank">'+sort_storage_rate[i].user+'</a></span>'+
                        '      </td>'+
                        '      <td>'+
                        '          <span class="doxod"></span>+<span class="summa activ-honey">'+format_number(sort_storage_rate[i].profit)+'</span>'+
                        '      </td>'+
                        '  </tr>';
    }
    $('#modal-rates-list > div > div').first().html(rates_list);
    if(rates_list != empty_tr){
        $('#modal-rates-list-empty').hide();    
    } else {
        $('#modal-rates-list-empty').show();
    }

    for(let i = 0; i < sort_storage_rate.length; i++){
        let url = "";
        if(i < 10){
            url ="../image/medal-"+(i+1)+".png"
        }
        $('#modal-rates-list-pos-'+(i+1)).css("background", "url("+url+")no-repeat");
        $('#modal-rates-list-pos-'+(i+1)).css("background-size", "contain");
        $('#modal-rates-list-pos-'+(i+1)).css("background-position", "right");
    }

    if(current_account != undefined){
        let pos = sort_storage_rate.indexOf(sort_storage_rate.find(x => x.user === current_account)) + 1;
        if(pos <= 10 && pos > 0){
            $('#modal-rates-medal > img').attr('src', 'image/big-medal-'+pos+'.png');
            $('#modal-rates-medal').show();
        } else {
            $('#modal-rates-medal').hide();
        }
        if(pos == 0){
            pos = sort_storage_rate.length + 1;
        }
        $('#modal-rates-position').html(format_number(pos));
    }
    
    $('#modal-rates').flythat("show");
});

