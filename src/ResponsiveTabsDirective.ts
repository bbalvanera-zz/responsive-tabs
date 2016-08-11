/// <reference path="_all.ts" />

namespace bbrt {
    /** The main directive representing a set of tabs. */
    export class ResponsiveTabsDirective implements ng.IDirective {
        public restrict     = 'AE';
        public transclude   = true;
        public scope        = {
            displayMode: 1
        };
        public controller   = 'ResponsiveTabsController';
        public controllerAs = 'tabset';

        public templateUrl(element: JQuery, attrs: IResponsiveTabsDirectiveProperties): string {
            return attrs.templateUrl || 'bbrt/templates/tabset.html';
        }

        public link(scope: IResponsiveTabs, element: JQuery, attrs: IResponsiveTabsDirectiveProperties, controller: ResponsiveTabsController) {
          scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
          scope.$watch('displayMode', (value: DisplayMode) => {
              controller.displayMode = value;
          });
        }

        public static create(): ng.IDirectiveFactory {
            let returnValue = () => new ResponsiveTabsDirective();
            returnValue.$inject = [];

            return returnValue;
        }
    }
}
