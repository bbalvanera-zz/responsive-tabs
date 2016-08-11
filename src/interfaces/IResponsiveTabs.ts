/// <reference path="../_all.ts" />

namespace bbrt {
    /** Represents a Responsive Tab. */
    export interface IResponsiveTabs extends ng.IScope {
        type : string;
        justified : boolean;
        breakPoint: number;
        displayMode: DisplayMode;
    }
}
