const readlineSync = require('readline-sync');
const _ = require('lodash');

// объект - пицца
const makePizza = (size, dough, name, toppings, cheeseSides) => ({
  size,
  dough,
  name,
  toppings: _.cloneDeep(toppings),
  cheeseSides
});

const getPrice = (pizza) => {
  let basePrice = countPriceOfBase(pizza) + countPriceOfToppings(pizza);
  basePrice = pizza.cheeseSides ? basePrice + 50 : basePrice;
  return {
    name: pizza.name,
    size: pizza.size,
    price: basePrice
  };
};

const pizzaConstructor = () => {
  const size = chooseSize();
  const dough = chooseDough();
  const name = chooseName();
  const toppings = chooseToppings();
  const cheeseSides = readlineSync.keyInYNStrict('Сырные бортики?');
  return makePizza(size, dough, name, toppings, cheeseSides);
};

const chooseSize = () => {
  const sizes = ['Маленькая', 'Средняя', 'Большая'];
  const index = readlineSync.keyInSelect(sizes, 'Выберите размер пиццы: ');
  return sizes[index];
};

const chooseDough = () => {
  const doughs = ['Тонкое', 'Традиционное'];
  const index = readlineSync.keyInSelect(doughs, 'Выберите тесто: ');
  return doughs[index];
};

const chooseName = () => {
  const names = [
    'Маргарита', 'Гавайская', 'Пепперони', 'Неаполитанская', 
    'Сицилийская', 'Четыре сезона', 'Каприччиоза', 'Дьябола', 
    'Карбонара', 'Четыре сыра'
  ];
  const index = readlineSync.keyInSelect(names, 'Выберите пиццу: ');
  return names[index];
};

const chooseToppings = () => {
  const selectedToppings = [];
  console.log('Выберите топпинги (для завершения выбора введите "done"):');
  toppings.forEach((topping, index) => {
    const choice = readlineSync.keyInYNStrict(`Добавить ${topping.name}?`);
    if (choice) {
      selectedToppings.push(topping);
    }
  });
  return selectedToppings;
};

// вспомогательные:
const countPriceOfToppings = ({toppings}) => toppings.length !== 0 ? toppings.reduce((sum, {price}) => sum + price, 0) : 0;

const countPriceOfBase = ({size, dough}) => {
  if (size === 'Маленькая') {
    return dough === 'Тонкое' ? 250 : 290;
  } else if (size === 'Средняя') {
    return dough === 'Тонкое' ? 450 : 550;
  } else {
    return dough === 'Тонкое' ? 650 : 750;
  }
};

const toppings = [
  {name: 'cheese', g: 200, price: 15},
  {name: 'jalapeno', g: 20, price: 10},
  {name: 'pineapple', g: 50, price: 7},
  {name: 'pepperoni', g: 100, price: 8}
];

const totalPizzas = readlineSync.questionInt('Сколько пицц вы хотите заказать? ');

const content = [];
for (let i = 0; i < totalPizzas; i++) {
  console.log(`Пицца #${i + 1}:`);
  content.push(pizzaConstructor());
}

console.log('Вы заказали следующие пиццы:');
content.forEach((pizza, index) => {
  console.log(`Пицца #${index + 1}: ${pizza.name}, размер ${pizza.size}`);
});

const getTotal = (order) => {
  const totalCost = order.reduce((sum, pizza) => sum + getPrice(pizza).price, 0);
  return {
    total: totalCost
  };
};

const printOrderCard = (order) => {
  console.log('=========================================');
  console.log('            Ваш заказ:');
  console.log('-----------------------------------------');
  order.forEach((pizza, index) => {
    console.log(`Пицца #${index + 1}:`);
    console.log(`  Название: ${pizza.name}`);
    console.log(`  Размер: ${pizza.size}`);
    console.log('  Топпинги:');
    pizza.toppings.forEach((topping) => {
      console.log(`    - ${topping.name}`);
    });
    console.log(`  Сырные бортики: ${pizza.cheeseSides ? 'Да' : 'Нет'}`);
    console.log(`  Цена: ${getPrice(pizza).price} руб.`);
    console.log('-----------------------------------------');
  });
  console.log(`Общая стоимость: ${getTotal(order).total} руб.`);
  console.log('=========================================');
};

// Вывод
console.log('Вы заказали следующие пиццы:');
printOrderCard(content);
