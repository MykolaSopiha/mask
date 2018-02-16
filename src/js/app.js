import $ from 'jquery';


$(document).ready(() => {

  //SMOOTH SCROLL begin
  // Select all links with hashes
  $('a[href*="#"]')

    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')

    .click(function(event) {

      // On-page links
      if ((location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname)) {

        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        // Does a scroll target exist?
        if (target.length) {

          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({

            scrollTop: target.offset().top

          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();

            if ($target.is(':focus')) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
            ;

          });
        }
      }
    });
  //SMOOTH SCROLL end


  // api.js is useless :)
  for (let i = 0; i < document.forms.length; i++) {
    document.forms[i].action = 'api.php' + window.location.search;
  }

  //TIMER SETTINGS begin
  let currentTime = new Date();

  // Set the date we're counting down to
  let countDownDate = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24).getTime();

  // Display the result in the element with id="demo"
  let timers = document.getElementsByClassName('js-timer');

  const interval = 1000; // ms
  let expected = Date.now() + interval;
  let dt;

  // Update the count down every 1 second
  const step = () => {

    dt = Date.now() - expected; // the drift (positive for overshooting)
    if (dt > interval) {
      // something really bad happened. Maybe the browser (tab) was inactive?
      // possibly special handling to avoid futile "catch up" run
    }

    // Get todays date and time
    let now = new Date().getTime();

    // Find the distance between now an the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // XX format for countdown digits
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);
    seconds = ('0' + seconds).slice(-2);

    for (let item of timers) {
      // If the count down is finished, write some text
      if (distance > 0) {
        item.innerHTML = hours + ' : ' + minutes + ' : ' + seconds;
      } else {
        clearInterval(step);
        item.innerHTML = 'EXPIRED';
      }
    }

    expected += interval;
    setTimeout(step, Math.max(0, interval - dt)); // take into account drift
  };

  setTimeout(step, interval);
  //TIMER SETTINGS end


  // RESPONSIVE MENU begin
  $('.nav__mobile').html($('.nav__main').html());
  $('.nav__trigger span').click(function() {
    if ($('nav.nav__mobile ul').hasClass('expanded')) {
      $('nav.nav__mobile ul.expanded').removeClass('expanded').slideUp(250);
      $(this).removeClass('open');
    } else {
      $('nav.nav__mobile ul').addClass('expanded').slideDown(250);
      $(this).addClass('open');
    }
  });
  $('.nav__mobile a').click(function() {
    $('nav.nav__mobile ul.expanded').removeClass('expanded').slideUp(250);
    $(this).removeClass('open');
  });
  // RESPONSIVE MENU end

});
