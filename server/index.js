const GeneticAlgorithm = require('./classes/GeneticAlgorithm');
const config = require('./config/config');

// создаем и запускаем алгоритм
const ga = new GeneticAlgorithm(config);
const result = ga.evolve();

// вывод результатов
console.log("лучшее меню:");
result.menu.forEach(dish => console.log(`- ${dish.name}`));

const totals = result.menu.reduce((acc, dish) => ({
  calories: acc.calories + dish.calories,
  protein: acc.protein + dish.protein,
  fats: acc.fats + dish.fats,
  carbs: acc.carbs + dish.carbs,
  veggies: acc.veggies + (dish.hasVeggies ? 1 : 0)
}), { calories: 0, protein: 0, fats: 0, carbs: 0, veggies: 0 });

console.log("\nобщие показатели:");
console.log(`- калории: ${totals.calories}`);
console.log(`- бжу: белки ${totals.protein.toFixed(1)}г, жиры ${totals.fats.toFixed(1)}г, углеводы ${totals.carbs.toFixed(1)}г`);
console.log(`- овощных блюд: ${totals.veggies}`);
console.log(`- оценка: ${result.fitness.toFixed(4)}`);