class Car {
  drive() {
    console.log('driving a Car...');
  }
}

class Truck {
  drive() {
    console.log('driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

// Call
//useVehicle.call(null, v1);
//const useVehicle  = (function (vehicle: Vehicle){
(function (vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}).call(null, v2);


// Apply
//useVehicle.apply(null, [v2]);
(function (vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}).apply(null, [v1]);

// Bind
(function (this: Vehicle, arg: Vehicle) {
  arg.drive();
  if (this instanceof Truck) {
    this.loadCargo(Math.random()*1000);
  }
}).bind(v1).call(this, v2);