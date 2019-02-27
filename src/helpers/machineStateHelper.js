export function getMachineState (machineData, machine, missingItems, missingFuel) {

    if (machine.on) {
        if (machine.powered) {
            if (machine.running) {
                return 'running';
            }
            if (missingItems) {
                return 'noitems';
            }
            return missingFuel ? 'nofuel' : 'running';
        } else {
            if (machineData.type === 'power'){
                return 'waiting';
            } else {
                return 'nopower';
            }

        }
    } else {
        return 'off';
    }
}
