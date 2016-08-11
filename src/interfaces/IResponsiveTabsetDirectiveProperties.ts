/// <reference path="../../typings/index.d.ts" />
namespace bbrt {
    export interface ITabsetDirectiveProperties extends ng.IAttributes {
        breakPoint  : number;
        templateUrl : string;
        justified   : string;
        type        : string;
    }
}
