/// <reference path="_all.ts" />

namespace bbrt {
    /** The main directive representing a set of tabs. */
    export class ResponsiveTabsDirective implements ng.IDirective {
        public restrict     = 'AE';
        public transclude   = true;
        public scope        = {};
        public controller   = 'ResponsiveTabsController';
        public controllerAs = 'tabset';

        constructor (private $parse: ng.IParseService) {

        }

        public templateUrl(element: JQuery, attrs: IResponsiveTabsDirectiveProperties): string {
            return attrs.templateUrl || 'bbrt/templates/tabset.html';
        }

        public link(scope: IResponsiveTabs, element: JQuery, attrs: IResponsiveTabsDirectiveProperties, controller: IResponsiveTabsController) {
            scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;

            if (angular.isDefined(attrs.displayMode)) {
                scope.$parent.$watch(attrs.displayMode, (value: DisplayMode): void => {
                    controller.displayMode = value;
                });
            }
        }

        public static create(): ng.IDirectiveFactory {
            let returnValue = ($parse: ng.IParseService) => new ResponsiveTabsDirective($parse);
            returnValue.$inject = ['$parse'];

            return returnValue;
        }
    }
}
