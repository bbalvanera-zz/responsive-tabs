/// <reference path="../typings/index.d.ts" />
/// <reference path="interfaces/_all.ts" />

namespace bbrt {
    /** The controller for the Responsive Tabs directive. */
    export class ResponsiveTabsController implements IResponsiveTabsController {
        private tabs       : ITab[] = [];
        private destroyed  : boolean = false;
        private breakPoint : number;

        public displayMode : DisplayMode;
        public activeIndex : number;

        private onWindowResize = (event: UIEvent) : void => {
            this.$scope.$apply(() => {
                this.setDisplayMode();
            });
        }

        constructor(private $scope: ng.IScope, private $window: ng.IWindowService, $attrs : ITabsetDirectiveProperties) {
            this.breakPoint = angular.isDefined($attrs.breakPoint) ? $attrs.breakPoint : 768;
            this.setDisplayMode();
            this.$window.addEventListener('resize', this.onWindowResize);

            $scope.$on('$destroy', (): void => {
                this.$window.removeEventListener('resize', this.onWindowResize);
                this.destroyed = true;
            });

            $scope.$watch('tabset.activeIndex', (newIndex?: number): void => {
                if (newIndex && newIndex != this.activeIndex) {
                    this.selectTab(newIndex);
                }
            });
        }

        public addTab(tab: ITab): void {
            tab.index = this.getNextIndex();

            this.tabs.push(tab);
            this.tabs.sort((left: ITab, right: ITab) => {
                let returnValue = 0;

                if (left.index > right.index) {
                    returnValue = 1;
                }

                if (left.index < right.index) {
                    returnValue = -1;
                }

                return returnValue;
            });

            if (tab.active && tab.index != this.activeIndex ||
                tab.index == this.activeIndex ||
                (!angular.isDefined(this.activeIndex) && this.tabs.length == 1)) {

                this.selectTab(tab.index);
            }
        }

        public removeTab(tab: ITab): void {
            if (tab && tab.index > -1) {
                if (tab.index == this.activeIndex) {
                    let newActiveIndex = tab.index == this.tabs.length - 1 ? tab.index - 1 : tab.index + 1;
                    this.selectTab(newActiveIndex);
                }

                this.tabs.splice(tab.index, 1);
            }
        }

        public selectTab(tabIndex: number, event?: JQueryEventObject): void {
            if (this.destroyed) {
                return;
            }

            let currentTab = this.getTab(this.activeIndex);
            if (currentTab) {
                currentTab.onDeselect(tabIndex, event);
                if (event && event.isDefaultPrevented()) {
                    return;
                }

                currentTab.active = false;
            }

            let selectedTab = this.getTab(tabIndex);
            if (selectedTab) {
                selectedTab.onSelect(event);
                selectedTab.active = true;

                this.activeIndex = selectedTab.index;
            }
            else {
                this.activeIndex = null;
            }
        }

        private getNextIndex(): number {
            let returnValue = 0;

            if (this.tabs.length > 0) {
                returnValue = Math.max.apply(null, this.tabs.map((tab) => tab.index));
                returnValue++;
            }

            return returnValue;
        }

        private getTab(tabIndex: number): ITab {
            return this.tabs[tabIndex];
        }

        private setDisplayMode(): void {
            let viewPortWidth = this.$window.document.documentElement.clientWidth;
            this.displayMode = viewPortWidth < this.breakPoint ? DisplayMode.panels : DisplayMode.tabs;
        }
    }

    export enum DisplayMode {
        tabs,
        panels
    }
}
