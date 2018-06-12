$(function () {
  $('.input input').on('click', function () {
    $('.input label').animate({
      top: '-100%',
      fontSize: '0.7em'
    }, 0);
  });
  $('.input input').on('blur', function () {
    $('.input label').animate({
      top: 0,
      fontSize: '0.8em'
    }, 0);
  });
});
