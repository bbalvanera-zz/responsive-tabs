
namespace bbrt {
    /** Represents a Responsive Tab. */
    export interface ITab extends ng.IScope {
        heading        : string;
        headingElement : JQuery;
        index          : number;
        classes        : string;
        active         : boolean;
        disabled       : boolean;
        transclude     : ng.ITranscludeFunction;

        /** Fires when selecting this tab. */
        onSelecting(event: JQueryEventObject): void;
        /** Fires after selecting this tab. */
        onSelect(event: JQueryEventObject): void;
        /** Fires when deselecting this tab. This event is cancellable. */
        onDeselect(newIndex: number, event: JQueryEventObject): void;
    }
}
