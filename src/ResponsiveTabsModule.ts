/// <reference path="_all.ts" />

// bb.rt -> (b)ernardo (b)alvanera (r)esponsive (t)abs
namespace bbrt {
    angular.module('bb.responsive-tabs', ['bb.responsive-tabs.tpls']);
    angular.module('bb.responsive-tabs')
        .controller('ResponsiveTabsController', ['$scope', '$window', '$attrs', bbrt.ResponsiveTabsController])
        .directive('responsiveTabs', bbrt.ResponsiveTabsetDirective.create())
        .directive('responsiveTab', bbrt.ResponsiveTabDirective.create())
        .directive('responsiveTabHeadingTransclude', bbrt.ResponsiveTabHeadingTranscludeDirective.create())
        .directive('responsiveTabContentTransclude', bbrt.ResponsiveTabContentTranscludeDirective.create());
}
