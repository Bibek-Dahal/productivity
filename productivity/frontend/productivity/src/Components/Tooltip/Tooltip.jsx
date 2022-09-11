import React,{
    useRef
} from 'react';
import './Tooltip.css';

const Tooltip = ({className,text,children}) =>{
    const tooltipRef = useRef(null);
    const tooltipContainerRef = useRef(null);

    const hoverHandler = (e) => {
        const dimensionParent = tooltipContainerRef.current.getBoundingClientRect();
        const x = dimensionParent.left + dimensionParent.width / 2;
        const y = dimensionParent.top;
        tooltipRef.current.style.left = x + "px";
        tooltipRef.current.style.top = y + "px";
        tooltipRef.current.style.transform = "translate(-50%,-130%)"
        tooltipRef.current.classList.add('visible');
    }

    const hoverEndHandler = (e) => {
        tooltipRef.current.classList.remove('visible');
    }

    return(
        <div 
            className = {`tooltip-container ${className}`}
            onMouseOver = {hoverHandler}
            onMouseOut = {hoverEndHandler}
            ref = {tooltipContainerRef}
        >
            {children}
            <div 
                className="tooltip__content"
                ref = {tooltipRef}
            >
                {text}
            </div>
        </div>

 );
}

export default Tooltip;

