interface StorageState {
    currOrder?: CoffeeOrder;
    coffeeShops: CoffeeShop[];
}

interface CoffeeOrder {
    id: number;
    date: Date;
    drinks: Map<Member, Drink>;
    coffeeShop: CoffeeShop;
    orderer?: Member;
    status: 'pending' | 'completed';
}

interface CoffeeShop {
    name: string;
    drinks: Drink[];
}

interface Drink {
    name: string;
    size: 'small' | 'medium' | 'large';
}

interface Member {
    name: string;
}

export { StorageState, CoffeeOrder, CoffeeShop, Drink, Member };
