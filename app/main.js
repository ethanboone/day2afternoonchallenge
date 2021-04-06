import HousesController from "./Controllers/HousesController.js";
import CarsController from "./Controllers/CarsController.js"

class App {
  housesController = new HousesController()
  carsController = new CarsController()
}

window["app"] = new App();
