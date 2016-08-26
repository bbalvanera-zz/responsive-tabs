/// <reference path="../_all.ts" />

namespace bbrt {
    export interface IResponsiveTabsDirectiveProperties extends ng.IAttributes {
        breakPoint  : number;
        templateUrl : string;
        justified   : string;
        type        : string;
        displayMode : string;
    }
}
