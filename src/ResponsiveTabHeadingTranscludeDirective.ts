/// <reference path="_all.ts" />

namespace bbrt {
    /** The directive that handles the transclusion of the tab heading or title. */
    export class ResponsiveTabHeadingTranscludeDirective implements ng.IDirective {
        public restrict = 'A';

        public link(scope: ng.IScope, element: JQuery, attrs: any) {
            let tab = <IResponsiveTab>scope.$eval(attrs.responsiveTabHeadingTransclude);
            tab.$watch('headingElement', (heading: HTMLElement) => {
                if (heading) {
                    element.html('');
                    element.append(heading.outerHTML);
                }
            });
        }

        public static create(): ng.IDirectiveFactory {
            let returnValue = () => new ResponsiveTabHeadingTranscludeDirective();

            return returnValue;
        }
    }
}
