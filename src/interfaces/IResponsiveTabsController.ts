/// <reference path="../_all.ts" />

namespace bbrt {
    export interface IResponsiveTabsController {
        activeIndex : number;
        displayMode : DisplayMode;

        addTab(tab: IResponsiveTab): void;
        removeTab(tab: IResponsiveTab): void;
        selectTab(index: number, event?: JQueryEventObject): void;
    }
}
