// object index signatures

// 1
let obj: {
    price: number,
    year: number,
    [key: string]: string | number,
} = {
    model : 'k5',
    brand : 'kia',
    price : 6000,
    year : 2030,
    date : '6월',
    percent : '5%',
    dealer : '김차장',
};

// 2
// recursive
interface MyType {
    "font-size": number,
    [key: string]: MyType | number
}

let obj1 : MyType = {
    'font-size' : 10,
    'secondary' : {
      'font-size' : 12,
      'third' : {
        'font-size' : 14
      }
    }
}