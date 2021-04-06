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

    async createHouse() {
        try {
            window.event.preventDefault()
            let form = window.event.target
            let house = {
                bedrooms: form.bedrooms.value,
                bathrooms: form.bathrooms.value,
                levels: form.levels.value,
                imgUrl: form.imgUrl.value,
                year: form.year.value,
                price: form.price.value,
                description: form.description.value
            }
            await housesService.createHouse(house)
            // @ts-ignore
            form.reset()

            $('#new-house-form').modal('hide')

        } catch (error) {
            console.log(error)
        }
    }

    deleteHouse(id) {
        try {
            housesService.deleteHouse(id)
        } catch (error) {
            console.log(error)
        }
    }
}