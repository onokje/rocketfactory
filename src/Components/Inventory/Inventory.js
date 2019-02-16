import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ItemIcon from "../ItemIcon/ItemIcon";
import "./Inventory.scss";

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({

});

class Inventory extends Component {

    renderInventoryItem(item) {
        return <ItemIcon key={item.name} item={item.name} amount={item.amount} />;
    }

    render() {
        const {inventory} = this.props;

        return (
            <div className="InventoryContainer">

                <h2>Inventory:</h2>
                <div className="inventory">
                    {inventory.map(item => this.renderInventoryItem(item))}
                    {!inventory.length ? (<div>Your inventory is empty</div>) : ''}
                </div>

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
