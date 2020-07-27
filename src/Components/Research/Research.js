import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import "./Research.scss";
import ResearchList from "./ResearchList";
import ResearchSelectionPanel from "./ResearchSelectionPanel";

const mapStateToProps = state => ({
    player: state.player,
});

const mapDispatchToProps = dispatch => ({
});

class Research extends Component {

    render() {
        const {player} = this.props;

        if (player.initialized && player.tab === 'research') {
            return (
                <div className="defaultContainer">
                    <h1>Research</h1>
                    <div className="researchContainer">
                        <ResearchList/>
                        <ResearchSelectionPanel/>
                    </div>
                </div>
            );
        }

        return null;

    }
}

Research.propTypes = {
    player: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Research)
