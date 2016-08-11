/// <reference path="interfaces/_all.ts" />
namespace bbrt {
    /** The directive that handles the transclusion of the tab heading or title. */
    export class TabHeadingTranscludeDirective implements ng.IDirective {
        public restrict = 'A';

        public link(scope: ng.IScope, element: JQuery, attrs: any) {
            let tab = <ITab>scope.$eval(attrs.responsiveTabHeadingTransclude);
            tab.$watch('headingElement', (heading: HTMLElement) => {
                if (heading) {
                    element.html('');
                    element.append(heading.outerHTML);
                }
            });
        }

        public static create(): ng.IDirectiveFactory {
            let returnValue = () => new TabHeadingTranscludeDirective();

            return returnValue;
        }
    }
}
