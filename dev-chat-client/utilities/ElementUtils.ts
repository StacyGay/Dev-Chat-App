export class ElementUtils {
    static getCoords(el: Element): { top: number, left: number } {
        var box = el.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    }

    static outerHeight(el: Element): number {
        var style = getComputedStyle(el);
        var height = el.getBoundingClientRect().height || el.clientHeight;
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        height += parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);

        // Cross-browser support for Safari and IE
        if (style.boxSizing && style.boxSizing === "border-box") {
          height -= 2;
        }

        return height;
    }

    static outerWidth(el: Element): number {
        var width = el.clientWidth;
        var style = getComputedStyle(el);
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        width += parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);
        return width;
    }

    static isElementInViewport (el: Element, offset: number = 0): boolean {
        if(!el || !el.getBoundingClientRect) return false;

        var rect = el.getBoundingClientRect();

        return (
            rect.top + rect.height + offset >= 0 &&
            rect.left + rect.height + offset >= 0 &&
            rect.bottom - rect.height - offset <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right - rect.height - offset <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    
}
