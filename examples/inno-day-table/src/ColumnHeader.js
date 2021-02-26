import React from 'react';
import styled from 'styled-components'

const Resizer = styled.span`
    background-color: ${(props) => props.isResizing ? "lightBlue" : "lightGrey"};    
    display: inline-block;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    touch-action: none;
    transform: translateX(50%);
    width: 10px;
    z-index: 1;
`;

export const ColumnHeader = (props) => {
    const [isFiltering, setIsFiltering] = React.useState(false);

    console.log(props);
    return (
        <th {...props.getHeaderProps()}>
            { !isFiltering && (
                <>
                    {props.render('Header')}
                    <div>{props.canFilter ? <button onClick={() => setIsFiltering(true)}>🔍</button> : null}</div>
                </>
            )}
            { isFiltering && (
                <>
                    {props.render("Filter")}
                    <button onClick={() => setIsFiltering(false)}>❌</button>
                </>
            )}
            <Resizer {...props.getResizerProps()} isResizing={props.isResizing} />
        </th>
    )
}