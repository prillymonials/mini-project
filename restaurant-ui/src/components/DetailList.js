import React from 'react';

/**
 * Detail List component
 * The div for detail data in description
 * 
 * The props object:
 * - title (String): A title of the detail list
 * - content (any): Content the detail list
 * - colWidth (Number): Number column width
 * 
 * All props is required.
 */
const DetailList = (props) => {
    return (
        <div className={`col-md-${props.colWidth} restaurant-detail-list`}>
            <p>{props.title}</p>
            <small>{props.content}</small>
        </div>
    );
}

export default DetailList;