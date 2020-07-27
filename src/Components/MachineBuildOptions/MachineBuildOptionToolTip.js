import React, {Component} from 'react';
import PropTypes from "prop-types";
import ItemList from "../ItemList/ItemList";
import "./MachineBuildOptions.scss";
import NameAndImageHeader from "../NameAndImageHeader/NameAndImageHeader";
import ResearchItem from "../Research/ResearchItem";
import {playerHasResearch} from "../../helpers/ResearchHelper";
import connect from "react-redux/es/connect/connect";
import {machineIcons} from "../Production/machineIcons";

const mapStateToProps = state => ({
    research: state.research
});

class MachineBuildOptionToolTip extends Component {

    renderProductionSpecs() {
        const {buildOption} = this.props;
        return <div className="machineSpecs">
            <div>Production type: <b>{buildOption.machineData.type}</b> </div>
            <div>Power usage: <b>{buildOption.machineData.powerUsage}</b> kW</div>
            <div>Production speed: <b>{buildOption.machineData.resultMultiplier * 100}</b>% </div>
            {buildOption.machineData.fuelCost.length > 0 ? <div>Fuel cost: <ItemList items={buildOption.machineData.fuelCost} smallIcons={true}/> </div> : ''}
        </div>
    }

    renderMineSpecs() {
        const {buildOption} = this.props;
        return <div className="machineSpecs">
            <div>Power usage: <b>{buildOption.machineData.powerUsage}</b> kW</div>
            {buildOption.machineData.fuelCost.length > 0 ? <div>Fuel cost: <ItemList items={buildOption.machineData.fuelCost} smallIcons={true}/> </div> : ''}
        </div>
    }

    renderPowerPlantSpecs() {
        const {buildOption} = this.props;
        return <div className="machineSpecs">
            <div>Power generation: <b>{buildOption.machineData.powerGeneration}</b> kW</div>
            {buildOption.machineData.fuelCost.length > 0 ? <div>Fuel cost: <ItemList items={buildOption.machineData.fuelCost} smallIcons={true}/> </div> : ''}
        </div>
    }

    renderSpecs(){
        const {machineType} = this.props;
        switch (machineType) {
            case 'production': return this.renderProductionSpecs();
            case 'power': return this.renderPowerPlantSpecs();
            case 'mine': return this.renderMineSpecs();
            default:
                throw Error('Invalid machine type in MachineBuildOptionToolTip: ' + machineType);
        }
    }

    renderRequiredResearch(researchRequired) {
        if (!researchRequired) {
            return null
        }
        const { research} = this.props;

        if (playerHasResearch(research.researchComplete, researchRequired)) {
            return null;
        }

        return <div className="requiredResearchMissing">
            <div>Required Research missing:</div>
            <ResearchItem
                researchId={researchRequired}
                extraClass={'researchItemRed'}
            />
        </div>;
    }

    render() {
        const {buildOption} = this.props;

        return <div className="buildOptionTooltip">
            <NameAndImageHeader name={buildOption.machineData.name} imageSrc={machineIcons[buildOption.machineKey]} />
                <p>{buildOption.machineData.text}</p>
                {this.renderSpecs()}
                <ItemList items={buildOption.machineData.cost} label="Cost to build:" />
            {this.renderRequiredResearch(buildOption.machineData.researchRequired)}
            </div>

    }
}

MachineBuildOptionToolTip.propTypes = {
    buildOption: PropTypes.object.isRequired,
    machineType: PropTypes.string.isRequired,
    research: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    null
)(MachineBuildOptionToolTip)