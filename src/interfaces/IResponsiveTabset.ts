/// <reference path="../../typings/index.d.ts" />
namespace bbrt {
    /** Represents a Responsive Tab. */
    export interface ITabset extends ng.IScope {
        type : string;
        justified : boolean;
        breakPoint: number;
    }
}
