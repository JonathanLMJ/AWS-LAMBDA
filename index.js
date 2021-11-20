// Funcion que obtiene el numero máximo de asientos que puede tener el bus
function getMaxBusSizes(groups){
    const reducer = (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue);
    return groups.reduce(reducer);
}

// Funcion que elimina un valor determinado de un array
function deleteArrayValue(array, value){
    const index = array.indexOf(value); // indice
    array.splice(index, 1);
}

// Funcion que itera las diferentes posibilidades de asientos, viajes del bus y grupos
function iteratorBusSizes(event) {
    const initialGroups = event.groups.split(',');
    let modifiedGroups = event.groups.split(',');
    let responseArray = [];
    const maxBusSize = getMaxBusSizes(initialGroups) ;


    for(let busSize = 1; busSize <= maxBusSize; busSize++){

        if (( maxBusSize % busSize ) == 0){ // verificar múltiplos del límite máximo

        responseArray.push(busSize); // adicionar al array respuesta los múltiplos del límite máximo

            for (let idGroup = 0; idGroup < modifiedGroups.length; idGroup++) {

                if (busSize < modifiedGroups[idGroup]){
                    deleteArrayValue(responseArray,busSize); // eliminación de múltiplos que no cumplen las condiciones
                    modifiedGroups = initialGroups.slice(); // devolver array a su estado original
                    break;
                } else if(busSize == modifiedGroups[idGroup]){
                    modifiedGroups = initialGroups.slice(); // devolver array a su estado original
                } else if(busSize > modifiedGroups[idGroup]){
                    modifiedGroups[idGroup + 1] = parseInt(modifiedGroups[idGroup + 1]) + parseInt(modifiedGroups[idGroup]);
                }
            }
        }

    }
    return responseArray.toString();
}

exports.handler = async (event) => {

    const arrayResponse = iteratorBusSizes(event);

    const response = {
        "sizes" : arrayResponse
    };
    return response;
};
