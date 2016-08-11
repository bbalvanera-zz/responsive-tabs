(function () {
  function sectionHeight() {
    var total = $(window).height(),
      $section = $('section').css('height', 'auto');

    if ($section.outerHeight(true) < total) {
      var margin = $section.outerHeight(true) - $section.height();
      $section.height(total - margin - 20);
    } else {
      $section.css('height', 'auto');
    }
  }

  $(window).resize(sectionHeight);

  $(document).ready(function () {

    sectionHeight();

    $('img').load(sectionHeight);
  });

  angular.module('app', ['bb.responsive-tabs', 'ngAnimate', 'ui.bootstrap']);
})();