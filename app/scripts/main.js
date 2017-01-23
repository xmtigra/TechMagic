$( document ).ready(() => {
  console.log('TechMagic Ready!');

  let aboutCircle = new Circle($('.circle-box'));

  aboutCircle.initSwiper();

  $('.circle-box').on('click', '.circle-box__circle:not(.about-description_active)', aboutCircle.click);

});

function Circle(el) {
  var _self = this;
  this.circle = el;
  this.degrees = 0;
  this.current = '';
  this.prev = '';

  this.init = function() {
    _self.setRotatingDegrees();
  }

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
  }

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
  }

  this.click = function () {
    _self.current = $(this).attr('data-slide');
    _self.prev = $(_self.circle).find('.circle-box__circle_active').attr('data-slide');
    if (_self.current !== _self.prev) {
      $(this).addClass('circle-box__circle_active').siblings('.circle-box__circle').removeClass('circle-box__circle_active');

      _self.degrees += _self.getRotationDegrees(_self.current, _self.prev);

      _self.init();

      _self.showDescriptionCircle(_self.current);
    }

  }

  this.showDescriptionCircle = function (id) {
    let descriptionList = $('.about-description');
    $(descriptionList[id - 1]).addClass('about-description_active').show().siblings('.about-description').removeClass('about-description_active').hide();
  }
  this.initSwiper = function () {
    let swiperArr = $('.swiper-container');
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
          768: {
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




