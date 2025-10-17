import React from 'react';
import { HorizontalScroll } from '@vkontakte/vkui';
import '../widget.css';

const ScrollBox = ({ children, className }) => {
	return (<div className={["SAKWidget__scrollBox", className].join(" ")}>
        <HorizontalScroll showArrows arrowSize="l" getScrollToLeft={(i) => i - 120} getScrollToRight={(i) => i + 120}>
            {children}
        </HorizontalScroll>
    </div>)
};

export default ScrollBox;