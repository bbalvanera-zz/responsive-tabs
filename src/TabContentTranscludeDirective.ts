/// <reference path="interfaces/_all.ts" />
namespace bbrt {
    /** Directive that handles transclusion of the Tab contents. */
    export class TabContentTranscludeDirective implements ng.IDirective {
        public restrict = 'A';

        public link(
            scope   : ng.IScope,
            element : JQuery,
            attrs   : any) {
            let tab = <ITab>scope.$eval(attrs.responsiveTabContentTransclude);

            tab.transclude(tab.$parent, (contents: JQuery) => {
                angular.forEach(contents, (node: any) => {
                    if (this.isTabHeading(node)) {
                        tab.headingElement = node;
                    }
                    else {
                        element.append(node);
                    }
                });
            });
        }

        private isTabHeading(node: any): boolean {
            return node.tagName && (node.hasAttribute('responsive-tab-heading') ||
                node.hasAttribute('data-responsive-tab-heading') ||
                node.hasAttribute('x-responsive-tab-heading') ||
                node.tagName.toLowerCase() === 'responsive-tab-heading' ||
                node.tagName.toLowerCase() === 'data-responsive-tab-heading' ||
                node.tagName.toLowerCase() === 'x-responsive-tab-heading' ||
                node.tagName.toLowerCase() === 'responsive:tab-heading'
            );
        }

        public static create(): ng.IDirectiveFactory {
            let returnValue = () => new TabContentTranscludeDirective();

            return returnValue;
        }
    }
}
