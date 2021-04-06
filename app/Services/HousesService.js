import { ProxyState } from "../AppState.js";
import House from "../Models/House.js";
import { api } from "./AxiosService.js";

class ValuesService {
    async getHouses() {
        let res = await api.get('houses')
        console.log(res.data)
        ProxyState.cars = res.data.map(h => new House(h))
    }

    bid(id) {
        let house = ProxyState.cars.find(h => h.id === id)
        house.price += 100
        // can include specific property you want to modify, or just the house object itself
        await api.put('house/' + id, { price: house.price })
    }

    async addHouses(newHouse) {
        // post creates data in the server, the first arument extends the baseURL the second is the data to send to the API
        let res = await api.post('houses', newHouse)
        console.log(res.data)
        // ProxyState.values = [...ProxyState.values, new Value({ title: Math.random() })]
    }

    deleteHouse(id) {
        await api.delete('cars/' + id)
        ProxyState.houses = ProxyState.houses.filter(house => house.id != id)
    }
}

export const valuesService = new ValuesService();

