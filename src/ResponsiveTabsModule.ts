
// bb.rt -> (b)ernardo (b)alvanera (r)esponsive (t)abs
angular.module('bb.responsive-tabs', ['bb.responsive-tabs.tpls']);
angular.module('bb.responsive-tabs')
    .controller('ResponsiveTabsController', ['$scope', '$window', '$attrs', bbrt.ResponsiveTabsController])
    .directive('responsiveTabset', bbrt.TabsetDirective.create())
    .directive('responsiveTab', bbrt.TabDirective.create())
    .directive('responsiveTabHeadingTransclude', bbrt.TabHeadingTranscludeDirective.create())
    .directive('responsiveTabContentTransclude', bbrt.TabContentTranscludeDirective.create());
