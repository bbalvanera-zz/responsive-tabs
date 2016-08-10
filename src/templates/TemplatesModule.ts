angular.module('bb.responsivetabs.tpls', ['bb/rt/templates/tab.html', 'bb/rt/templates/tabset.html']);

angular.module('bb/rt/templates/tab.html', []).run(['$templateCache', ($templateCache: ng.ITemplateCacheService): void => {
    $templateCache.put('bb/rt/templates/tab.html',
        `<li ng-class="[{active: active, disabled: disabled}, classes]" class="uib-tab nav-item">
            <a href ng-click="onSelecting($event)" class="nav-link" responsive-tab-heading-transclude="this">{{heading}}</a>
        </li>`);
}]);
angular.module('bb/rt/templates/tabset.html', []).run(['$templateCache', ($templateCache: ng.ITemplateCacheService): void => {
    $templateCache.put('bb/rt/templates/tabset.html',
        `<div>
            <ul class="nav nav-{{tabset.type || 'tabs'}}" ng-class="{'nav-justified': justified}" ng-transclude ng-hide="tabset.displayMode == 1"></ul>
            <div ng-class="{'tab-content': tabset.displayMode == 0, 'panel-group': tabset.displayMode == 1}">
                <div ng-class="{active: tabset.activeIndex == tab.index, 'tab-pane': tabset.displayMode == 0, 'panel panel-default': tabset.displayMode == 1}"
                    ng-repeat="tab in tabset.tabs">
                    <div class="panel-heading" ng-show="tabset.displayMode == 1">
                        <h4 class="panel-title">
                            <a role="button" href class="accordion-toggle" ng-click="tab.onSelecting($event)" responsive-tab-heading-transclude="tab">
                                {{tab.heading}}
                            </a>
                        </h4>
                    </div>
                    <div ng-class="{'panel-collapse collapse': tabset.displayMode == 1}" uib-collapse="!tab.active && tabset.displayMode == 1">
                        <div ng-class="{'panel-body': tabset.displayMode == 1}" responsive-tab-content-transclude="tab">
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
}]);
