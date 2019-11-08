$(document).ready(function () {
    $('.go-to-game').click(function(){
        $(location).attr('href', 'game.html')
    });

    $('.btn-drop-down').click(function () {
        $('.list-db').toggleClass('active-lg-db');
    });


    $('.header-item').on('click', function () {
        $(this).closest('.item-questions').find('.block-questions').slideToggle(500);
        $(this).closest('.item-questions').find('.click-chevron').toggleClass('rotate-chevron');

    });


   /*---------------------scroll-----------------*/

    (function($){
        $(window).on("load",function(){

            $("tbody, .container-questions").mCustomScrollbar({
                theme:"minimal"
            });

        });
    })(jQuery);

    /*------------------list social active-----------------*/
    $(".social-item").on('click', function () {
        $(this).find(".social-sub-list").slideToggle(1, function() {
            if ($(this).is(':visible'))
                $(this).css('display','flex');
        });
    });

    /*--------------------------modal window-------------------*/
    /*
    $("#modal-text").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text2").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text3").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text4").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text5").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text6").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text7").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text8").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text9").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text10").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text11").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text12").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text13").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text14").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text15").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text16").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text17").flythat({
        fadeIn: 'slow'
    });

    $("#modal-text18").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text19").flythat({
        fadeIn: 'slow'
    });

    $("#modal-text20").flythat({
        fadeIn: 'slow'
    });

    $("#modal-text21").flythat({
        fadeIn: 'slow'
    });

    $("#modal-text22").flythat({
        fadeIn: 'slow'
    });
    $("#modal-text23").flythat({
        fadeIn: 'slow'
    });

    $("#modal-text24").flythat({
        fadeIn: 'slow'
    }); 
    */
    $("#modal-text25").flythat({
        fadeIn: 'slow'
    });

    $(".btn-menu").click(function() {

        $(".mobile-menu").toggleClass("active-mobile-menu");
        $(".cripto-transfer").fadeToggle();
    });
    $(".close-btn-mobile").click(function() {
        $(".mobile-menu").removeClass("active-mobile-menu");
        $(".cripto-transfer").fadeIn();
    });
      $(".close-mobile").click(function() {
        $(".mobile-menu").removeClass("active-mobile-menu");
          $(".cripto-transfer").fadeIn();
    });
    $(".close-modal-mobile").click(function() {
        $(".mobile-menu").removeClass("active-mobile-menu");
        $(".cripto-transfer").fadeIn();
    });


	 $('.jcarousel').jcarouselAutoscroll({
	 	autostart: true
	 });

	 $('.btn-menu-landing').on('click', function(){
	 	$(this).closest('.landing-header').find('.mobile-wrapper-menu-landing').slideToggle();

	 });



    $(".list-nav").on("click",".land-scroll", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),

            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });




    /*-------------------custom select----------------------*/

    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);


    /*-------------------trx accordeon other-btn----------------------*/
    $('.more-info').on('click', function (event) {
        event.preventDefault();
       $(this).closest('.other-block').find('.list-other-wrapper').slideToggle();
        $(this).slideToggle(500);
        setTimeout(() => {
            $(this).closest('.other-block').find('.more-info-hide').slideDown();
        }, 500);

    });
    $('.more-info-hide').on('click', function (event) {
        event.preventDefault();
        $(this).closest('.other-block').find('.list-other-wrapper').slideToggle();
        $(this).slideToggle(500)
        setTimeout(() => {
            $(this).closest('.other-block').find('.more-info').slideDown();
        }, 500);
    });

    /*-------------------tabs-------------*/
    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });
/*----------------------scroll-to-link--------------------*/

    $("#wallet").on("click","a", function (event) {
        event.preventDefault(); //опустошим стандартную обработку
        var id  = $(this).attr('href'), //заберем айдишник блока с параметром URL
            top = $(id).offset().top; //определим высоту от начала страницы до якоря
        $('body,html').animate({scrollTop: top}, 1500); //сделаем прокрутку за 1 с
    });
/*----------------------close landing news--------------*/

    $(".close-window").on('click', function () {
       $('.news-window-wrapper').fadeOut();
    });

    $(".close-window").on('click', function () {
        $('.close-window-bottom').fadeOut();
    });
});