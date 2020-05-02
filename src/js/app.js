
$(document).ready(() => {
  const menu_btn = $('.menu-mobile'),
    menu = $('.menu');
  $(menu_btn).on('click', (e) => {
    e.preventDefault();
    $(menu).toggleClass('menu__active');

  });


// Слайды секции team
  let PhotoTeam = new Swiper('.team-slider-container', {
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      type: 'bullets',
      el: '.team-slaid-pagination',
      clickable: true,
    },
    autoHeight: true,
    direction: 'horizontal',

  });


  // прогресс бары секции services
  let circleProp = {
    color: '#19bd9a',
    strokeWidth: 3,
    trailWidth: 1,
    trailColor: '#464646',
    easing: 'easeInOut',
    from: { color: "#464646", width: 1 },
    to: { color: "#19bd9a", width: 3 },
    text: {
      value: '0',
      className: 'progress-text',
      style: {
        color: '#81868e',
        position: 'absolute',
        top: '35%',
        left: '30%',
        padding: 0,
        margin: 0,
        transform: null
      }
    },
    step: (state, shape) => {
      shape.path.setAttribute("stroke", state.color);
      shape.path.setAttribute('stroke-width', state.width);
      shape.setText(Math.round(shape.value() * 100) + ' %');
    }
  };

  let circleBars = [];
  $('.progressbar-wrapper .circle-container')
    .each((index, value) => {
      let newId = 'circle-cont' + index;
      $(value).attr('id', newId);

        circleBars.push(new ProgressBar.Circle('#' + newId, circleProp));

    });

  let animationPercentage = 0.8;

  let $element = $('.services-tabs__content');
  let animated = false;
  let animatedFinished = true;
  $(window).scroll(function() {
    let scroll = $(window).scrollTop() + $(window).height();
    //Если скролл до конца елемента
    //var offset = $element.offset().top + $element.height();
    //Если скролл до начала елемента
    let offset = $element.offset().top;
    let elheigtn = $element.height()/2;

    // console.log(offset,scroll);

    if (!animated && animatedFinished && scroll > offset + elheigtn) {
      animated = true;
      animatedFinished = false;
      let m = $(".procent").each((index, val) => {

          animationPercentage = ($(val)
            .attr('data-procent')) / 100 || animationPercentage;
          // console.log('anim', animationPercentage);
          circleBars[index].animate(animationPercentage, {
            duration: 1500
          });

      });
      setTimeout(() => {
        animatedFinished = true;
      }, 1500);
    }

    if (animated && animatedFinished && scroll < offset) {

      animated = false;
      let m = $(".procent").each(function(index, val) {
        animationPercentage = ($(val).attr('data-procent')) / 100 || animationPercentage;
        circleBars[index].animate(0, {
          duration: 10
        });
      });
    }
  });



// слайды на мониторе, секция team-qutes
  let MonitorSlaid = new Swiper('.slaid-container', {
    spaceBetween: 0,
    centeredSlides: true,

    slidesPerView: 1,
    autoplay: {
      delay: 2500,
      stopOnLastSlide: false,

    },
  });




  let bar =  {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#19bd9a',
    trailColor: '#e1e4e9',
    trailWidth: 4,
    svgStyle: {width: '100%', height: '100%'},
    text: {
      style: {
        // Text color.
        // Default: same as stroke color (options.color)
        color: '#999',
        position: 'absolute',
        right: '0',
        top: '18px',
        padding: 0,
        margin: 0,
        transform: null
      },
      autoStyleContainer: false
    },
    // from: {color: '#FFEA82'},
    // to: {color: '#ED6A5A'},
    step: (state, bar) => {
      bar.setText(Math.round(bar.value() * 100) + ' %');
    }
  };

  let lineBars = [];
  $('.linebar-container')
    .each((index, value) => {
      let newIdB = 'linebar-cont' + index;
      $(value).attr('id', newIdB);

      lineBars.push(new ProgressBar.Line('#' + newIdB, bar));

    });

  let animationPercent = 0.8;

   $(".titlebar").each((index, val) => {

    animationPercent = ($(val).attr('data-procent')) / 100 || animationPercent;
     lineBars[index].animate(animationPercent, {
      duration: 1500
    });

  });

  // Слайды секции testimonials
  let testimonials1 = new Swiper('.testimonials-slaid-container', {
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      type: 'bullets',
      el: '.testimonials-slaid-pagination',
      clickable: true,
    },
    autoHeight: true,

  });

  let vertical1 = new Swiper('.vertical-slider-container', {

    centeredSlides: true,
    pagination: {
      type: 'bullets',
      el: '.vertical-slider-pagination',
      clickable: true,
    },
    autoHeight: true,

  });

  $('.arrow-map').on('click',()=>{
    $('.map-text').css('display','none');
    $('.map-after').css('display','none');
  });

  $('header .arrow-box').on('click', (e) => {
    e.preventDefault();
    $('body,html').animate({scrollTop: 800}, 400);
  });

  $(window).scroll(function () {
    const top = $(window).scrollTop();
    const heightScreen = $(window).height();

    if(top >= heightScreen){
      $('.arrow-up').css('visibility','visible').css('height','2.187em');
    } else {
      $('.arrow-up').css('visibility','hidden').css('height','1px')
    }
  });

  $(".arrow-up").on('click', function(e){
    e.preventDefault();
    $('body,html').animate({scrollTop: 0}, 400);
  });

});


const tab = function (selector_link, selector_content) {
  let tabNav = document.querySelectorAll(selector_link),
    tabContent = document.querySelectorAll(selector_content),
    tabName;

  tabNav.forEach((item) => {
    item.addEventListener('click', selectTabNav)
  });

  function selectTabNav() {
    tabNav.forEach((item) => {
      item.classList.remove('tabs_active');
    });
    this.classList.add('tabs_active');
    tabName = this.getAttribute('data-tab-name');
    selectTabContent(tabName);
  }

  function selectTabContent(tab) {
    tabContent.forEach((item) => {
      let classList = item.classList;
      classList.contains(tab) ? classList.add('tabs-content_active') : classList.remove('tabs-content_active');
    });
  }
};

tab('.tabs-about__item','.tabs-content__item');
tab('.services-tabs__item','.services-tabs__content');
