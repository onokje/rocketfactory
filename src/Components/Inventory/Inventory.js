import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({

});

class Inventory extends Component {

    renderInventoryItem(item) {
        return (<li key={item.name}>{item.name} : <b>{item.amount}</b></li>);
    }

    render() {
        const {inventory} = this.props;

        return (
            <div className="InventoryContainer">

                <h2>Inventory:</h2>
                <ul className="inventory">
                    {inventory.map(item => this.renderInventoryItem(item))}
                </ul>
                {!inventory.length ? (<div>Your inventory is empty</div>) : ''}
            </div>
        );

    }
}

Inventory.propTypes = {
    inventory: PropTypes.array.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Inventory)
