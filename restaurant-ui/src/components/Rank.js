import React from 'react';
import FitImage from './FitImage';
import numeral from 'numeral';

/**
 * Rank component
 * The component for each div in Rank List
 * Each has image, title, rating and total likes
 * 
 * The props object:
 * - rootClassName (String) [Optional]: Class Name for child.
 * - onClick (Function (Parameter: -, Return: void)): A callback when user click the list
 * - restaurantId (Number): ID of the Restaurant
 * - restaurantName (String): Name of the Restaurant
 * - restaurantRank (Number): Rank of the Restaurant
 * - rating (Number): Total Rating of the Restaurant
 * - totalLikes (Number): Total Likes of the Restaurant
 * - imageSrc (String): Source of image
 * - maxHeightImage (Number) [Optional]: Image maximum height
 * 
 * All props is required, except maxHeightImage.
 */
const Rank = (props) => {
    return (
        <div className={`row ${props.rootClassName}`}>
            <div className="col rank" onClick={props.onClick}>
                <div className="rank-content">
                    <div className="rank-header">
                        <FitImage
                            src={props.imageSrc}
                            alt={props.restaurantName ? props.restaurantName : ''}
                            maxHeight={props.maxHeightImage ? props.maxHeightImage : 300}
                        />
                        <div className="rank-no-container" />                    
                        <div className="rank-no">
                            <h1>#{props.restaurantRank}</h1>
                        </div>
                        <div className="rank-badge">
                            <h2>
                                <span className="badge badge-success">
                                    <i className="fa fa-star" /> {props.rating}
                                </span>
                                &nbsp;
                                <span className="badge badge-info">
                                    <i className="fa fa-thumbs-up" /> {numeral(props.totalLikes).format('0,0')}
                                </span>
                            </h2>
                        </div>
                        <div className="rank-title-container" />
                        <h3 className="rank-title">{props.restaurantName}</h3>               
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rank;