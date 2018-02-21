import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from '../utils/constant';
import Rank from '../components/Rank';

/**
 * First Page of App
 * Show the 1st Rank Restaurant and list of top 10 rank restaurant
 * Props:
 * - onClickRestaurant (Function)
 *   Parameter: restaurantId (Number)
 *   Return: Function (Parameter: -, Return: void)
 *   When user click the list or restaurant, it will change the state from App class and show the detail
 */
class RankList extends Component {
    static propTypes = {
        onClickList: PropTypes.func.isRequired
    };

    /**
     * - restaurantList (Array of Object)
     *   List of top 10 restaurant, start from Ranking 1 to 10. Each object has property:
     *   # id (Number): Restaurant's ID
     *   # rank (Number): Restaurant's rank
     *   # name (String): Restaurant's name
     *   # image (String): Restaurant's image link
     *   # rating (Number): Restaurant's computed rating, value 0 to 5.
     *   # total_like (Number): Restaurant's computed total likes
     * 
     * - firstRankRestaurant
     *   The 1st rank in restaurant. Get from restaurantList[0]. The object has property in above.
     */
    state = {
        restaurantList: [],
        firstRankRestaurant: {}
    };

    render() {
        const firstRankRestaurant = this.state.firstRankRestaurant;

        return (
            <React.Fragment>
                <Rank
                    onClick={this.props.onClickList(firstRankRestaurant.id)}
                    restaurantId={firstRankRestaurant.id}
                    restaurantRank={firstRankRestaurant.rank}
                    restaurantName={firstRankRestaurant.name}
                    imageSrc={`${BASE_URL}${firstRankRestaurant.image}`}
                    rating={firstRankRestaurant.rating}
                    totalLikes={firstRankRestaurant.total_like}
                />
                <h2 className="top-ten-title">Top Ten</h2>
                {
                    this.state.restaurantList.map((restaurant, index) => (
                        <Rank
                            key={`restaurant-rank-${index + 1}`}
                            rootClassName="top-ten-list"
                            onClick={this.props.onClickList(restaurant.id)}
                            restaurantId={restaurant.id}
                            restaurantRank={restaurant.rank}
                            restaurantName={restaurant.name}
                            imageSrc={`${BASE_URL}${restaurant.image}`}
                            rating={restaurant.rating}
                            totalLikes={restaurant.total_like}
                            maxHeightImage={150}
                        />
                    ))
                }
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.fetchRestaurantList();
    }

    /**
     * Fetch Restaurant List
     * Get restaurant list from API.
     * Call the HTTP Request and retrieve the response { status: String, data: Array of Object }.
     * The 'status' property is "ok" string.
     * The 'data' property is explained above.
     * The data will be ordered by Rank, so data[0] is rank on 1st, and so on.
     */
    async fetchRestaurantList() {
        try {
            const response = await fetch(`${BASE_URL}/restaurants`, {
                method: 'GET'
            });

            if ( !response.ok ) {
                throw new Error('Response is not OK.');
            }

            const restaurantList = await response.json();
            this.setState({
                restaurantList: restaurantList.data,
                firstRankRestaurant: restaurantList.data[0],
            });
        } catch (e) {
            alert('Failed to fetch the list!\n' + e);
        }
    }
}

export default RankList;