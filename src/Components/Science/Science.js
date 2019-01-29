import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import "./Science.scss";
import ScienceList from "./ScienceList";
import ScienceSelectionPanel from "./ScienceSelectionPanel";

const mapStateToProps = state => ({
    player: state.player,
});

const mapDispatchToProps = dispatch => ({
});

class Science extends Component {

    render() {
        const {player} = this.props;

        if (player.initialized && player.tab === 'science') {
            return (
                <div className="defaultContainer">
                    <h1>Research</h1>
                    <div className="scienceContainer">
                        <ScienceList/>
                        <ScienceSelectionPanel/>
                    </div>
                </div>
            );
        }

        return null;

    }
}

Science.propTypes = {
    player: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Science)
