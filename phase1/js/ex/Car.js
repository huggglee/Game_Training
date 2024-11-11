class Car{
    constructor(year,make,model,miles){
        this.year = year;
        this.make=make;
        this.model=model;
        this.miles=miles;
    }

    drive (distance) {
        return this.miles += distance;
    }
}

const car= new Car(2024,'Mercedes','model',100);
car.drive(200);
console.log(car);