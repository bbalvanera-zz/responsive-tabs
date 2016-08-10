
namespace bbrt {
    export interface IResponsiveTabsController {
        activeIndex : number;
        displayMode : DisplayMode;

        addTab(tab: ITab): void;
        removeTab(tab: ITab): void;
        selectTab(index: number, event?: JQueryEventObject): void;
    }
}
