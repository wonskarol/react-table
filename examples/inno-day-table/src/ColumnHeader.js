import React from 'react';

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
        </th>
    )
}