class Good {
    constructor(id, name, discription, sizes, price, available=true) {
        this.id = id
        this.name = name
        this.discription = discription
        this.sizes = sizes
        this.price = price
        this.available = available
    }

    setAvailable() {
        this.available = false
    }
}


class GoodList {
    #goods = []

    constructor(filter=/^us/, sortPrice=true, sortDir=true) {
        this.filter = filter
        this.sortPrice = sortPrice
        this.sortDir = sortDir
    }

    add(isinstance) {
        let array = []
        for (let number = 0; number < this.#goods.length; number++) {
            array.push(this.#goods[number].id)
        }

        if (array.includes(isinstance.id)) {
        } else {
            this.#goods.push(isinstance)
        }
    }

    remove(id) {
        let result = this.#goods.findIndex(item => item.id == id)
        this.#goods.splice(result, 1)
    }

    get list() {
        let array = []
        let array1 = []

        let result = this.#goods.filter(item => item.available == true)
        for (let number = 0; number < result.length; number++) {
            array.push(result[number].price)
        }

        if (this.sortPrice == true && this.sortDir == false) {
            array.sort((num1, num2) => num2 > num1 ? 1 : -1)

            array.forEach(item => {
                let num = result.find(item1 => item1.price == item);
                array1.push(num)
            })
            
        } else if (this.sortPrice == true && this.sortDir == true) {
            array.sort((num1, num2) => num2 > num1 ? -1 : 1)

            array.forEach(item => {
                let num = result.find(item1 => item1.price == item);
                array1.push(num)
                return array1
            })

        } else {
            array.forEach(item => {
                let num = result.find(item1 => item1.price == item);
                array1.push(num)
                return array1
            })
        }

        let sort = array1.filter(item => this.filter.test(item.name) == true)
        console.log("Массив доступных для продажи товаров в соответствии с установленным фильтром и сортировкой по полю Price")
        console.log(sort)
    }
}


class BasketGood extends Good {
    constructor(good, amount, id, name, discription, sizes, price, available=true) {
        super(id, name, discription, sizes, price, available=true)
        this.good = good
        this.amount = amount
        this.id = good.id
        this.name = good.name
        this.discription = good.discription
        this.sizes = good.sizes
        this.price = good.price
        this.available = good.available
    }
}


class Basket {
    constructor() {
        this.basket = []
    }

    add(good, amount) {
        if (this.basket.includes(good)) {
            good.amount += amount
        } else {
            good.amount += amount
            this.basket.push(good)
        }
    }

    remove(good, amount) {
        if (this.basket.includes(good)) {
            good.amount -= amount
            if (good.amount <= 0) {
                let res = this.basket.findIndex(item => item == good)
                this.basket.splice(res, 1)
            }
        }
    }

    clear() {
        this.basket.length = 0
    }

    removeUnavailable() {
        let res = this.basket.filter(item => item.available === false)
        for (let num = 0; num < res.length; num++) {
            let res1 = this.basket.findIndex(item => res[num] == item)
            this.basket.splice(res1, 1)
        }
    }

    get totalSum() {
        let array = []
        for (let num = 0; num < this.basket.length; num++) {
            array.push(this.basket[num].price) 
        }

        let total = array.reduce((sum, current) => sum + current)
        console.log(`Общая стоимость: ${total}`)
    }
    
    get totalAmount() {
        let array = []
        for (let num = 0; num < this.basket.length; num++) {
            array.push(this.basket[num].amount) 
        }

        let total = array.reduce((sum, current) => sum + current)
        console.log(`Общее количество: ${total}`)
    }
}


let good1 = new Good(1, "user1", "discription1", "sizes1", 123)
let good2 = new Good(2, "user2", "discription2", "sizes2", 321)
let good3 = new Good(3, "user3", "discription3", "sizes3", 741)
let good4 = new Good(4, "user4", "discription4", "sizes4", 852)
let good5 = new Good(5, "user5", "discription5", "sizes5", 963)
let good6 = new Good(6, "user6", "discription6", "sizes6", 654)
let good7 = new Good(7, "user7", "discription7", "sizes7", 246)

good1.setAvailable()
good2.setAvailable()

let goodlist = new GoodList()
goodlist.add(good1)
goodlist.add(good2)
goodlist.add(good3)
goodlist.add(good4)
goodlist.add(good5)
goodlist.add(good5)
goodlist.add(good6)
goodlist.add(good6)
goodlist.add(good6)
goodlist.add(good7)

goodlist.remove(3)
goodlist.remove(2)
goodlist.remove(4)

goodlist.list

let basketgood1 = new BasketGood(good1, 10)
let basketgood2 = new BasketGood(good2, 10)
let basketgood3 = new BasketGood(good3, 10)
let basketgood4 = new BasketGood(good4, 10)
let basketgood5 = new BasketGood(good5, 10)

let basket = new Basket()

basket.add(basketgood1, 2)
basket.add(basketgood1, 3)
basket.add(basketgood2, 1)
basket.add(basketgood2, 7)
basket.add(basketgood3, 5)
basket.add(basketgood3, 4)
basket.add(basketgood4, 1)
basket.add(basketgood4, 3)
basket.add(basketgood5, 3)

basket.remove(basketgood1, 10)
basket.remove(basketgood2, 10)
basket.remove(basketgood4, 14)

basket.removeUnavailable()

console.log("Массив объектов класса BasketGood для хранения данных о товарах в корзине")
console.log(basket.basket)

basket.totalSum
basket.totalAmount