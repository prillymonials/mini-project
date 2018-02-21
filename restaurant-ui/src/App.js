import React, { Component } from 'react';
import * as constant from './utils/constant';
import RankList from './containers/RankList';
import Detail from './containers/Detail';

/**
 * App Class
 * This is the main of the application
 * Purpose: Routing
 * @class App
 */
class App extends Component {
    /**
     * The state of application
     * Properties:
     * - route (String): Current route of the application
     * - restaurantId (Number or NULL): Restaurant ID will be thrown to detail restaurant
     */
    state = {
        route: constant.LIST_ROUTE,
        restaurantId: null
    };

    render() {
        return (
            <div className="container">
                {this.state.route === constant.LIST_ROUTE && <RankList onClickList={this.onClickList} />}
                {this.state.route === constant.DETAIL_ROUTE && (<Detail
                    onClickBack={this.onClickBack}
                    restaurantId={this.state.restaurantId}
                />)}
            </div>
        );
    }

    /**
     * On Click List
     * When user click a list, it want to open the detail of restaurant
     * Parameter: restaurantId (Number)
     * Return: Function (Parameter: -, Return: void)
     */
    onClickList = (restaurantId) => {
        return () => {
            this.setState({
                route: constant.DETAIL_ROUTE,
                restaurantId
            });
        }
    }

    /**
     * On Click Back
     * When user click back from the detail, user will be redirect to the List
     * Parameter: -
     * Return: void
     */
    onClickBack = () => {
        this.setState({
            route: constant.LIST_ROUTE,
            restaurantId: null
        });
    }
}

export default App;
