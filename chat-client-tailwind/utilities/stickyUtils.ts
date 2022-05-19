export class StickyUtils {
    static scrollListener(stickyEl: HTMLElement, parentEl: HTMLElement, stopWidth: number = 991): any {

        let nodeOffs = 0, // distance relative to its parent
            parent = stickyEl,
            parentPaddedHeight = 50; // 50 = overall padding for parent

        // loop through parents to determine the distance relative to the document top
        while (parent = <HTMLElement>parent.offsetParent) {
            if (parent.offsetTop)
                nodeOffs += parent.offsetTop;
        }

        nodeOffs += parentEl.offsetTop;

        return (event) => {
            if (window.innerWidth <= stopWidth) {
                stickyEl.style.top = '0px';
                return;
            }

            // current scroll position relative to the body
            let scrollPos = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

            if (scrollPos > nodeOffs) {

                // set to bottom if the elements height is larger than the remaining scroll content height (distance including)
                if ((scrollPos - nodeOffs) < (parentEl.getBoundingClientRect().height - stickyEl.clientHeight - parentPaddedHeight)) {
                    stickyEl.style.top = (scrollPos - nodeOffs) + 'px';
                } else {
                    stickyEl.style.top = (parentEl.getBoundingClientRect().height - stickyEl.clientHeight - parentPaddedHeight) + 'px';
                }

            } else {
                stickyEl.style.top = '0px';
            }

        };
    }
}
