import { ProxyState } from "../AppState.js";
import House from "../Models/House.js";
import { api } from "./AxiosService.js";

class HousesService {
    async getHouses() {
        let res = await api.get('houses')
        console.log(res.data)
        ProxyState.houses = res.data.map(h => new House(h))
    }

    async bid(id) {
        let house = ProxyState.houses.find(h => h.id === id)
        house.price += 100
        // can include specific property you want to modify, or just the house object itself
        await api.put('houses/' + id, { price: house.price })
        ProxyState.houses = ProxyState.houses
    }

    async addHouses(newHouse) {
        // post creates data in the server, the first arument extends the baseURL the second is the data to send to the API
        let res = await api.post('houses', newHouse)
        console.log(res.data)
        // ProxyState.values = [...ProxyState.values, new Value({ title: Math.random() })]
        res.data.id = res.data._id
        let car = new House(res.data)
        ProxyState.houses = [...ProxyState.houses, house]
    }

    async deleteHouse(id) {
        await api.delete('houses/' + id)
        ProxyState.houses = ProxyState.houses.filter(house => house.id != id)
    }
}

export const housesService = new HousesService();

