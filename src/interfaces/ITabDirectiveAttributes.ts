/// <reference path="../../typings/index.d.ts" />
namespace bbrt {
    /** Represents the supported attributes of the Responsive Tab Directive. */
    export interface ITabDirectiveAttributes extends ng.IAttributes {
        active      : string;
        disable     : string;
        classes     : string;
        heading     : string;
        templateUrl : string;
        /** An expression resolving to a function that will be invoked when deselecting the tab. */
        deselect    : string;
        /** An expression resolving to a function that will be invoked when selecting the tab. */
        select      : string;
    }
}
