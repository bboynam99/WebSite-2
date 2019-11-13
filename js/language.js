let language = {
    'ru': 1,
    'en': 2,
};

let lang_indexes = {
    1: 'ru',
    2: 'en',
};
let language_list = [];
let isFirstLoad = true;

$('#website').hide();
$('#spinner').show();

$(document).ready(function () {
    if(storage['language'] == undefined){
        storage['language'] = 1;
    }
    $('.drop-down-lg > div > span').html(lang_indexes[storage['language']]);
    
    $.get('https://sheets.googleapis.com/v4/spreadsheets/' + GOOGLE_SPREASHEET_ID_LANG +
          '/values/' + GOOGLE_SHEET_TAB_NAME_LANG + '!A1:L400' + 
          '?key=' + GOOGLE_API_KEY, 
    function(data, result){
        if(result != "success"){
            console.log("ERROR", "get_google", err);
        } else {
            language_list = data.values;
            setLanguage();
        }
    });

   
    $('.drop-down-lg > ul > li > span').click(event => {

        $('.drop-down-lg > ul').removeClass('active-lg-db');
        $('.drop-down-lg > div > span').html($(event.target).html());
        storage['language'] = language[$(event.target).html()];
        localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
        setLanguage();
    }) 
});

function setLanguage(){
    for(let i = 1; i < language_list.length; i++){
        if(language_list[i][0] == "" || language_list[i][0] == undefined){
            continue;
        }
        
        $("."+language_list[i][0]).html(language_list[i][storage['language']]);
    }

    if(isFirstLoad){
        setTimeout(function(){
            $('#website').show();
            $('#spinner').remove();

    }, 500);
    }
}