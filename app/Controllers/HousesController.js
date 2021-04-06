import House from "../Models/House.js"
import { housesService } from "../Services/HousesService.js"
import { ProxyState } from "../AppState.js"

function _draw() {
    let houses = ProxyState.houses
    let template = ''
    houses.forEach(house => {
        template += house.Template
    })
    document.getElementById('houses').innerHTML = template
}

export default class HousesController {
    constructor() {
        ProxyState.on("houses", _draw)

        this.getHouses()
    }

    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            console.log(error)
        }
    }
}