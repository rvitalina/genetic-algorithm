module.exports = {
    dishes: [
      { id: 1, name: "овсянка с фруктами", calories: 300, protein: 10, fats: 5, carbs: 50, type: "breakfast", hasVeggies: false },
      { id: 2, name: "омлет с овощами", calories: 350, protein: 20, fats: 25, carbs: 10, type: "breakfast", hasVeggies: true },
      { id: 3, name: "курица с гречкой", calories: 500, protein: 40, fats: 15, carbs: 60, type: "lunch", hasVeggies: true },
      { id: 4, name: "лосось с рисом", calories: 450, protein: 30, fats: 20, carbs: 45, type: "lunch", hasVeggies: false },
      { id: 5, name: "творог с зеленью", calories: 250, protein: 25, fats: 12, carbs: 10, type: "dinner", hasVeggies: true },
      { id: 6, name: "овощной салат с тофу", calories: 200, protein: 15, fats: 8, carbs: 20, type: "dinner", hasVeggies: true },
      { id: 7, name: "йогурт с орехами", calories: 150, protein: 8, fats: 9, carbs: 12, type: "snack", hasVeggies: false },
      { id: 8, name: "фруктовый смузи", calories: 120, protein: 2, fats: 3, carbs: 25, type: "snack", hasVeggies: true }
    ],
    mealTypes: ["breakfast", "lunch", "dinner", "snack"],
    target: {
      protein: (2000 * 0.20) / 4,
      fats: (2000 * 0.30) / 9,
      carbs: (2000 * 0.50) / 4
    },
    populationSize: 100,
    maxGenerations: 50,
    mutationRate: 0.2
  };