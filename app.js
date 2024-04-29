// Объявление объекта пиццы и функций для создания и расчета стоимости
const makePizza = (size, dough, name, toppings, cheeseSides) => ({
  size,
  dough,
  name,
  toppings: [...toppings], // Используем оператор расширения для клонирования массива
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

const countPriceOfToppings = ({ toppings }) => {
  return toppings.length !== 0 ? toppings.reduce((sum, { price }) => sum + price, 0) : 0;
};

const countPriceOfBase = ({ size, dough }) => {
  const priceBySize = {
    'Маленькая': { 'Тонкое': 250, 'Традиционное': 290 },
    'Средняя': { 'Тонкое': 450, 'Традиционное': 550 },
    'Большая': { 'Тонкое': 650, 'Традиционное': 750 }
  };
  return priceBySize[size][dough];
};

// Остальной код здесь...

// Определение функции для создания пиццы на основе данных из формы
const makePizzaFromForm = () => {
  const size = document.getElementById('size').value;
  const dough = document.getElementById('dough').value;
  const name = document.getElementById('name').value;
  const toppings = [];
  document.querySelectorAll('input[name="toppings"]:checked').forEach(input => {
    toppings.push({ name: input.value });
  });
  const cheeseSides = document.getElementById('cheeseSides').checked;
  return makePizza(size, dough, name, toppings, cheeseSides);
};

// Функция для обработки нажатия кнопки "Заказать"
const handleOrderButtonClick = () => {
  const totalPizzas = parseInt(document.getElementById('totalPizzas').value);
  const content = [];
  for (let i = 0; i < totalPizzas; i++) {
    content.push(makePizzaFromForm());
  }
  displayOrder(content);
  displayTotalCost(getTotal(content));
};

// Добавление обработчика события для кнопки "Заказать"
document.getElementById('order-button').addEventListener('click', handleOrderButtonClick);
