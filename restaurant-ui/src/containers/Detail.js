import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from '../utils/constant';
import DetailList from '../components/DetailList';
import FitImage from '../components/FitImage';
import Reservation from '../components/Reservation';

import $ from 'jquery';

/**
 * Detail Class
 * Render the detail of the restaurant when user click the detail
 * Properties:
 * - onClickBack (Function)
 *   Parameter: -
 *   Return: void
 *   When user click back button, it will back to the home
 * - restaurantId (Number)
 *   The ID Restaurant what the User will see of the detail of restaurant
 */
class Detail extends Component {
    static propTypes = {
        restaurantId: PropTypes.number.isRequired,
        onClickBack: PropTypes.func.isRequired
    }

    /**
     * restaurant (Object)
     *   Restaurant detail. The object has property:
     *   # id (Number): Restaurant's ID
     *   # rank (Number): Restaurant's rank
     *   # name (String): Restaurant's name
     *   # image (String): Restaurant's image link
     *   # rating (Number): Restaurant's computed rating, value 0 to 5.
     *   # total_like (Number): Restaurant's computed total likes
     *   # cuisine (String): Restaurant's cuisine type
     *   # phone_number (String): Restaurant's phone number to call
     *   # address (String): Restaurant's address place
     *   # average_cost (String): Average cost when a user want to go to the restaurant
     *   # open_hour (String): Restaurant's open hour, [From] to [To]
     *   # description (String): Restaurant's description
     */
    state = {
        restaurant: {}
    }

    render() {
        const restaurant = this.state.restaurant;
        
        return (
            <div className="row restaurant-detail">
                <div className="col-12 restaurant-detail-header">
                    <button className="btn restaurant-detail-back" onClick={this.props.onClickBack}>
                        <i className="fa fa-chevron-left" />
                    </button>
                    <button className="btn btn-info pull-right" type="button" onClick={this.onClickReserve}>
                        Reserve
                    </button>
                </div>
                <div className="col-12 restaurant-detail-image">
                    <FitImage
                        src={`${BASE_URL}${restaurant.image}`}
                        alt={restaurant.name || ''}
                        maxHeight={300}
                    />
                    <div className="row p-3">
                        <div className="col-6">
                            <h2>{restaurant.name}</h2>
                        </div>
                        <div className="col-6">
                            <h2 className="pull-right">
                                <span className="badge badge-success">{restaurant.rating} / 5</span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <Reservation onSubmit={this.onClickSubmit} />
                    <div className="row restaurant-detail-overview">
                        <div className="col-md-6">
                            <div className="row">
                                <DetailList title="Phone number" content={restaurant.phone_number} colWidth={6} />
                                <DetailList title="Opening hours" content={restaurant.open_hour} colWidth={6} />
                                <DetailList title="Cuisine" content={restaurant.cuisine} colWidth={6} />
                                <DetailList title="Average cost" content={restaurant.average_cost} colWidth={6} />
                                <DetailList title="Address" content={restaurant.address} colWidth={12} />
                            </div>
                        </div>
                        <DetailList title="Description" content={restaurant.description} colWidth={6} />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.fetchRestaurant();
    }

    /**
     * Fetch Restaurant by ID
     * Get restaurant by ID from API.
     * Call the HTTP Request and retrieve the response { status: String, data: Object }.
     * The 'status' property is "ok" or "error" string.
     * The 'data' property is explained above.
     * When 'status' error, property 'message' will be appeared instead of 'data'.
     */
    async fetchRestaurant() {
        try {
            const response = await fetch(`${BASE_URL}/restaurants/${this.props.restaurantId}`, {
                method: 'GET'
            });
            const responseJson = await response.json();            

            if ( !response.ok ) {
                throw new Error(`Response is not OK. ${responseJson.message}`);
            }

            this.setState({
                restaurant: responseJson.data,
            });
        } catch (e) {
            alert('Failed to fetch the list!\n' + e);
        }
    }

    /**
     * onClickReserve function
     * Reset the form of Reservation and make the modal show.
     * 
     * Parameter: -
     * Return: void
     */
    onClickReserve = () => {
        $('#reservationModal input').val('');

        $('#reservationModal').modal('show');
    }

    /** 
     * onClickSubmit function
     * When user submit the reservation form
     */
    onClickSubmit = async () => {
        const formData = $('#reservationModal form').serializeArray().reduce(
            (result, value) => ({ ...result, [value.name]: value.value }), {}
        );

        try {
            const response = await fetch(`${BASE_URL}/restaurants/${this.props.restaurantId}/reserve`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });
            const responseJson = await response.json();            

            if ( !response.ok ) {
                throw new Error(`${responseJson.message}`);
            }
            
            alert('Your reservation has been placed successfully.');
            $('#reservationModal').modal('hide');
        } catch (e) {
            alert('Failed to submit!\n' + e);
        }
    }
}

export default Detail;