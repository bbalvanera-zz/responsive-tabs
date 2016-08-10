/*!
 * responsive-tabs
 * https://github.com/bernardo-balvanera/responsive-tabs#readme
 * Version: 0.1.0 - 2016-08-10T01:03:08.583Z
 * License: MIT
 */


var bbrt;
(function (bbrt) {
    var ResponsiveTabsController = (function () {
        function ResponsiveTabsController($scope, $window, $attrs) {
            var _this = this;
            this.$scope = $scope;
            this.$window = $window;
            this.tabs = [];
            this.destroyed = false;
            this.onWindowResize = function (event) {
                _this.$scope.$apply(function () {
                    _this.setDisplayMode();
                });
            };
            this.breakPoint = angular.isDefined($attrs.breakPoint) ? $attrs.breakPoint : 768;
            this.setDisplayMode();
            this.$window.addEventListener('resize', this.onWindowResize);
            $scope.$on('$destroy', function () {
                _this.$window.removeEventListener('resize', _this.onWindowResize);
                _this.destroyed = true;
            });
            $scope.$watch('tabset.activeIndex', function (newIndex) {
                if (newIndex && newIndex != _this.activeIndex) {
                    _this.selectTab(newIndex);
                }
            });
        }
        ResponsiveTabsController.prototype.addTab = function (tab) {
            tab.index = this.getNextIndex();
            this.tabs.push(tab);
            this.tabs.sort(function (left, right) {
                var returnValue = 0;
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
        };
        ResponsiveTabsController.prototype.removeTab = function (tab) {
            if (tab && tab.index > -1) {
                if (tab.index == this.activeIndex) {
                    var newActiveIndex = tab.index == this.tabs.length - 1 ? tab.index - 1 : tab.index + 1;
                    this.selectTab(newActiveIndex);
                }
                this.tabs.splice(tab.index, 1);
            }
        };
        ResponsiveTabsController.prototype.selectTab = function (tabIndex, event) {
            if (this.destroyed) {
                return;
            }
            var currentTab = this.getTab(this.activeIndex);
            if (currentTab) {
                currentTab.onDeselect(tabIndex, event);
                if (event && event.isDefaultPrevented()) {
                    return;
                }
                currentTab.active = false;
            }
            var selectedTab = this.getTab(tabIndex);
            if (selectedTab) {
                selectedTab.onSelect(event);
                selectedTab.active = true;
                this.activeIndex = selectedTab.index;
            }
            else {
                this.activeIndex = null;
            }
        };
        ResponsiveTabsController.prototype.getNextIndex = function () {
            var returnValue = 0;
            if (this.tabs.length > 0) {
                returnValue = Math.max.apply(null, this.tabs.map(function (tab) { return tab.index; }));
                returnValue++;
            }
            return returnValue;
        };
        ResponsiveTabsController.prototype.getTab = function (tabIndex) {
            return this.tabs[tabIndex];
        };
        ResponsiveTabsController.prototype.setDisplayMode = function () {
            var viewPortWidth = this.$window.document.documentElement.clientWidth;
            this.displayMode = viewPortWidth < this.breakPoint ? DisplayMode.panels : DisplayMode.tabs;
        };
        return ResponsiveTabsController;
    }());
    bbrt.ResponsiveTabsController = ResponsiveTabsController;
    (function (DisplayMode) {
        DisplayMode[DisplayMode["tabs"] = 0] = "tabs";
        DisplayMode[DisplayMode["panels"] = 1] = "panels";
    })(bbrt.DisplayMode || (bbrt.DisplayMode = {}));
    var DisplayMode = bbrt.DisplayMode;
})(bbrt || (bbrt = {}));
var bbrt;
(function (bbrt) {
    var TabHeadingTranscludeDirective = (function () {
        function TabHeadingTranscludeDirective() {
            this.restrict = 'A';
        }
        TabHeadingTranscludeDirective.prototype.link = function (scope, element, attrs) {
            var tab = scope.$eval(attrs.responsiveTabHeadingTransclude);
            tab.$watch('headingElement', function (heading) {
                if (heading) {
                    element.html('');
                    element.append(heading.outerHTML);
                }
            });
        };
        TabHeadingTranscludeDirective.create = function () {
            var returnValue = function () { return new TabHeadingTranscludeDirective(); };
            return returnValue;
        };
        return TabHeadingTranscludeDirective;
    }());
    bbrt.TabHeadingTranscludeDirective = TabHeadingTranscludeDirective;
})(bbrt || (bbrt = {}));
var bbrt;
(function (bbrt) {
    var TabContentTranscludeDirective = (function () {
        function TabContentTranscludeDirective() {
            this.restrict = 'A';
        }
        TabContentTranscludeDirective.prototype.link = function (scope, element, attrs) {
            var _this = this;
            var tab = scope.$eval(attrs.responsiveTabContentTransclude);
            tab.transclude(tab.$parent, function (contents) {
                angular.forEach(contents, function (node) {
                    if (_this.isTabHeading(node)) {
                        tab.headingElement = node;
                    }
                    else {
                        element.append(node);
                    }
                });
            });
        };
        TabContentTranscludeDirective.prototype.isTabHeading = function (node) {
            return node.tagName && (node.hasAttribute('responsive-tab-heading') ||
                node.hasAttribute('data-responsive-tab-heading') ||
                node.hasAttribute('x-responsive-tab-heading') ||
                node.tagName.toLowerCase() === 'responsive-tab-heading' ||
                node.tagName.toLowerCase() === 'data-responsive-tab-heading' ||
                node.tagName.toLowerCase() === 'x-responsive-tab-heading' ||
                node.tagName.toLowerCase() === 'responsive:tab-heading');
        };
        TabContentTranscludeDirective.create = function () {
            var returnValue = function () { return new TabContentTranscludeDirective(); };
            return returnValue;
        };
        return TabContentTranscludeDirective;
    }());
    bbrt.TabContentTranscludeDirective = TabContentTranscludeDirective;
})(bbrt || (bbrt = {}));
var bbrt;
(function (bbrt) {
    var TabDirective = (function () {
        function TabDirective($parse) {
            this.$parse = $parse;
            this.restrict = 'AE';
            this.require = '^responsiveTabset';
            this.replace = true;
            this.transclude = true;
            this.scope = {
                heading: '@',
                classes: '@?',
                onSelect: '&select',
                onDeselect: '&deselect'
            };
            this.controllerAs = 'tab';
        }
        TabDirective.prototype.controller = function () {
            return;
        };
        TabDirective.prototype.templateUrl = function (element, attrs) {
            return attrs.templateUrl || 'bbrt/templates/tab.html';
        };
        TabDirective.prototype.link = function (scope, element, attrs, controller, transclude) {
            scope.disabled = false;
            if (attrs.disable) {
                scope.$parent.$watch(this.$parse(attrs.disable), function (value) {
                    scope.disabled = Boolean(value);
                });
            }
            if (angular.isUndefined(attrs.classes)) {
                scope.classes = '';
            }
            if (!angular.isUndefined(attrs.active) && attrs.active == 'true') {
                scope.active = true;
            }
            scope.$on('$destroy', function (event) { return controller.removeTab(scope); });
            scope.transclude = transclude;
            scope.onSelecting = function (event) {
                if (!scope.disabled) {
                    controller.selectTab(scope.index, event);
                }
            };
            controller.addTab(scope);
        };
        TabDirective.create = function () {
            var returnValue = function ($parse) { return new TabDirective($parse); };
            returnValue.$inject = ['$parse'];
            return returnValue;
        };
        return TabDirective;
    }());
    bbrt.TabDirective = TabDirective;
})(bbrt || (bbrt = {}));
var bbrt;
(function (bbrt) {
    var TabsetDirective = (function () {
        function TabsetDirective() {
            this.restrict = 'AE';
            this.transclude = true;
            this.scope = {};
            this.controller = 'ResponsiveTabsController';
            this.controllerAs = 'tabset';
        }
        TabsetDirective.prototype.templateUrl = function (element, attrs) {
            return attrs.templateUrl || 'bbrt/templates/tabset.html';
        };
        TabsetDirective.prototype.link = function (scope, element, attrs) {
            scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
        };
        TabsetDirective.create = function () {
            var returnValue = function () { return new TabsetDirective(); };
            returnValue.$inject = [];
            return returnValue;
        };
        return TabsetDirective;
    }());
    bbrt.TabsetDirective = TabsetDirective;
})(bbrt || (bbrt = {}));
angular.module('bb.responsive-tabs', ['bb.responsive-tabs.tpls']);
angular.module('bb.responsive-tabs')
    .controller('ResponsiveTabsController', ['$scope', '$window', '$attrs', bbrt.ResponsiveTabsController])
    .directive('responsiveTabset', bbrt.TabsetDirective.create())
    .directive('responsiveTab', bbrt.TabDirective.create())
    .directive('responsiveTabHeadingTransclude', bbrt.TabHeadingTranscludeDirective.create())
    .directive('responsiveTabContentTransclude', bbrt.TabContentTranscludeDirective.create());

angular.module("bb.responsive-tabs.tpls", []).run(["$templateCache", function($templateCache) {$templateCache.put("bbrt/templates/tab.html","<li ng-class=\"[{active: active, disabled: disabled}, classes]\" class=\"uib-tab nav-item\"><a href=\"\" ng-click=\"onSelecting($event)\" class=\"nav-link\" responsive-tab-heading-transclude=\"this\">{{heading}}</a></li>");
$templateCache.put("bbrt/templates/tabset.html","<div><ul class=\"nav nav-{{tabset.type || \'tabs\'}}\" ng-class=\"{\'nav-justified\': justified}\" ng-transclude=\"\" ng-hide=\"tabset.displayMode == 1\"></ul><div ng-class=\"{\'tab-content\': tabset.displayMode == 0, \'panel-group\': tabset.displayMode == 1}\"><div ng-class=\"{active: tabset.activeIndex == tab.index, \'tab-pane\': tabset.displayMode == 0, \'panel panel-default\': tabset.displayMode == 1}\" ng-repeat=\"tab in tabset.tabs\"><div class=\"panel-heading\" ng-show=\"tabset.displayMode == 1\"><h4 class=\"panel-title\"><a role=\"button\" href=\"\" class=\"accordion-toggle\" ng-click=\"tab.onSelecting($event)\" responsive-tab-heading-transclude=\"tab\">{{tab.heading}}</a></h4></div><div ng-class=\"{\'panel-collapse collapse\': tabset.displayMode == 1}\" uib-collapse=\"!tab.active && tabset.displayMode == 1\"><div ng-class=\"{\'panel-body\': tabset.displayMode == 1}\" responsive-tab-content-transclude=\"tab\"></div></div></div></div></div>");}]);