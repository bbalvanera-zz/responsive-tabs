/// <reference path="_all.ts" />

namespace bbrt {
    /** The main directive representing a set of tabs. */
    export class ResponsiveTabsetDirective implements ng.IDirective {
        public restrict     = 'AE';
        public transclude   = true;
        public scope        = {};
        public controller   = 'ResponsiveTabsController';
        public controllerAs = 'tabset';

        public templateUrl(element: JQuery, attrs: IResponsiveTabsDirectiveProperties): string {
            return attrs.templateUrl || 'bbrt/templates/tabset.html';
        }

        public link(scope: IResponsiveTabs, element: JQuery, attrs: IResponsiveTabsDirectiveProperties) {
          scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
        }

        public static create(): ng.IDirectiveFactory {
            let returnValue = () => new ResponsiveTabsetDirective();
            returnValue.$inject = [];

            return returnValue;
        }
    }
}
