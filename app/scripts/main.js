$( document ).ready(() => {

  $('a').click(function(){
    var mylink = $(this).attr('data-link');
    if (mylink && mylink.length) {
      $('html, body').animate({
        scrollTop: $( mylink ).offset().top-30
      }, 500);
      return false;
    }
  });

  $(window).scroll(function(){
    var sticky = $('.header-site'),
        scroll = $(window).scrollTop();

    if (scroll >= 450) {
      sticky.addClass('header-site_fixed');
    } else {
      sticky.removeClass('header-site_fixed');
    }
  });

  let aboutCircle = new Circle($('.circle-box'));

  aboutCircle.initSwiper();

  $('.circle-box').on('click', '.circle-box__circle:not(.about-description_active)', aboutCircle.click);

  $('.header-site').on('click', '.header-site__hamburger', function(e) {
    $(this).toggleClass('header-site__hamburger_active');
    $(this).closest('.header-site').find('.main-nav').toggleClass('main-nav_open');
  });

  var myCircle = $('.circle-box__circle');

  if (myCircle.length > 0) {
      var radiusDiv = function() {    
        let t = $('.circle-box__circle.circle-box__circle_active').attr('data-slide');
        if (t == 1) {
          myCircle[1].click();
        } else if(t == 2) {
          myCircle[2].click();
        } else if (t == 3) {
          myCircle[0].click();
        }
      }
      var timer = setInterval(radiusDiv, 8000);
       $('.circle-box').hover(function(ev){
        clearInterval(timer);
      }, function(ev){
          timer = setInterval( radiusDiv, 5000);
      });
  }

  const teamSwiper = new Swiper('.team .swiper-container', {
    noSwiping: false,
    noSwipingClass: 'noSwipingClass',
    paginationClickable: true,
    breakpoints: {
      767: {
        // loop: true,
        noSwiping: false,
        paginationClickable: true,
        noSwiping: true,
        effect: 'flip',
        grabCursor: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
      }
    }
  });

  const clienSwiper = new Swiper('.clients .swiper-container', {
    loop: true,
    noSwiping: false,
    paginationClickable: true,
    noSwiping: true,
    effect: 'flip',
    grabCursor: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev'
  });

  $('.clients-list__nav_prev').click(function(){
    clienSwiper.slidePrev();
  });

  $('.clients-list__nav_next').click(function(){
    clienSwiper.slideNext();
  });


  const placeSwiper = new Swiper('.place-list .swiper-container', {
      paginationClickable: true,
      speed: 400,
      spaceBetween: 0,
      slidesPerView: 3,
      pagination: '.swiper-pagination-lviv',
      breakpoints: {
        767: {
          slidesPerView: 1
        }
      }
  });

});


$(window).resize(function(){
  var viewportWidth = $(window).width();
  if(viewportWidth == 320 || viewportWidth == 360 || viewportWidth == 412 || viewportWidth == 375 || viewportWidth == 414 || viewportWidth == 1024){  // Use <= or >= based on ur requirements
      location.reload();
  }
});



function Circle(el) {
  let _self = this;
  this.circle = el;
  this.degrees = 0;
  this.current = '';
  this.prev = '';

  this.init = function() {
    _self.setRotatingDegrees();
  };

  this.getRotationDegrees = function(current, prev) {
    switch(true) {
      case current == '1' && prev == '2' :
      case current == '2' && prev == '3' :
      case current == '3' && prev == '1' :
        return 240;
        break;
      case current == '1' && prev == '3' :
      case current == '2' && prev == '1' :
      case current == '3' && prev == '2' :
        return 120;
        break;
    }
  };

  this.setRotatingDegrees = function() {
    $(_self.circle).css({
      '-webkit-transform' : 'rotate('+ _self.degrees +'deg)',
      '-moz-transform': 'rotate('+ _self.degrees +'deg)',
      '-ms-transform': 'rotate('+ _self.degrees +'deg)',
      '-o-transform': 'rotate('+ _self.degrees +'deg)',
      'transform': 'rotate('+ _self.degrees +'deg)'
    });

    $(_self.circle).find('.circle-box__circle_text').css({
      '-webkit-transform' : 'rotate(-'+ _self.degrees +'deg)',
      '-moz-transform': 'rotate(-'+ _self.degrees +'deg)',
      '-ms-transform': 'rotate(-'+ _self.degrees +'deg)',
      '-o-transform': 'rotate(-'+ _self.degrees +'deg)',
      'transform': 'rotate(-'+ _self.degrees +'deg)'
    });
  };

  this.click = function () {
    _self.current = $(this).attr('data-slide');
    _self.prev = $(_self.circle).find('.circle-box__circle_active').attr('data-slide');
    if (_self.current !== _self.prev) {
      $(this).addClass('circle-box__circle_active').siblings('.circle-box__circle').removeClass('circle-box__circle_active');

      _self.degrees += _self.getRotationDegrees(_self.current, _self.prev);

      _self.init();

      _self.showDescriptionCircle(_self.current);
    }

  };

  this.showDescriptionCircle = function (id) {
    let descriptionList = $('.about-description');
    $(descriptionList[id - 1]).addClass('about-description_active').show().siblings('.about-description').removeClass('about-description_active').hide();
  };
  this.initSwiper = function () {
    let swiperArr = $('.about-block .swiper-container');
    $(swiperArr).each(function( index ) {
      let swiper = Swiper('.swiper-container[data-id="' + index + '"]' , {
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 20,
        pagination: '.swiper-pagination-' + index,
        keyboardControl: true,
        roundLengths: true,
        simulateTouch: true,
        breakpoints: {
          767: {
            loop: true,
            noSwiping: false,
            paginationClickable: true,
            slidesPerView: 1,
            spaceBetween: 40,
            simulateTouch: false
          }
        }
      });
    });
    $('.about-description:not(.about-description_active)').hide();
  }
}
