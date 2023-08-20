import BuildingDB from '../db/buildings.json'
import ItemDB from '../db/items.json'

export const resetOwnedBuildings = (playerCharacter, setPlayerCharacter) => {
    console.log('SSSSSSSSSSSSSS')
    const newDB = []
    playerCharacter.buildings.forEach((building) => {
        building.quantity = 0
        newDB.push(building)
    })
    setPlayerCharacter({
        ...playerCharacter,
        buildings: newDB
    })
}

export const resetOwnedItems = (playerCharacter, setPlayerCharacter) => {
    console.log('SSSSSSSSSSSSSS', ItemDB)
    const newDB = []
    playerCharacter.items.forEach((item) => {
        item.quantity = 0
        newDB.push(item)
    })
    setPlayerCharacter({
        ...playerCharacter,
        items: newDB
    })
}