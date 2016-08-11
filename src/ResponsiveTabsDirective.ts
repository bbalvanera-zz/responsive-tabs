/// <reference path="interfaces/_all.ts" />
namespace bbrt {
    /** The main directive representing a set of tabs. */
    export class TabsetDirective implements ng.IDirective {
        public restrict     = 'AE';
        public transclude   = true;
        public scope        = {};
        public controller   = 'ResponsiveTabsController';
        public controllerAs = 'tabset';

        public templateUrl(element: JQuery, attrs: ITabsetDirectiveProperties): string {
            return attrs.templateUrl || 'bbrt/templates/tabset.html';
        }

        public link(scope: ITabset, element: JQuery, attrs: ITabsetDirectiveProperties) {
          scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
        }

        public static create(): ng.IDirectiveFactory {
            let returnValue = () => new TabsetDirective();
            returnValue.$inject = [];

            return returnValue;
        }
    }
}
