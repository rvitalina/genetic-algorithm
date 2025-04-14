class GeneticAlgorithm {
  constructor(config) {
    this.config = config;
    this.population = [];
  }

  // инициализация популяции
  initPopulation() {
    this.population = [];
    for (let i = 0; i < this.config.populationSize; i++) {
      this.population.push(this.generateIndividual());
    }
  }

  // генерация одного меню
  generateIndividual() {
    return this.config.mealTypes.map((type) => {
      const available = this.config.dishes.filter((d) => d.type === type);
      return available[Math.floor(Math.random() * available.length)].id;
    });
  }

  // оценка качества меню
  calculateFitness(individual) {
    const menu = this.decodeIndividual(individual);
    const totals = menu.reduce(
      (acc, dish) => ({
        calories: acc.calories + dish.calories,
        protein: acc.protein + dish.protein,
        fats: acc.fats + dish.fats,
        carbs: acc.carbs + dish.carbs,
        veggies: acc.veggies + (dish.hasVeggies ? 1 : 0),
      }),
      { calories: 0, protein: 0, fats: 0, carbs: 0, veggies: 0 }
    );

    const calorieScore =
      1 - Math.min(1, Math.abs(totals.calories - 2000) / 500);
    const proteinScore =
      1 -
      Math.min(
        1,
        Math.abs(totals.protein - this.config.target.protein) /
          this.config.target.protein
      );
    const fatsScore =
      1 -
      Math.min(
        1,
        Math.abs(totals.fats - this.config.target.fats) /
          this.config.target.fats
      );
    const carbsScore =
      1 -
      Math.min(
        1,
        Math.abs(totals.carbs - this.config.target.carbs) /
          this.config.target.carbs
      );
    const veggieScore = totals.veggies >= 2 ? 1 : totals.veggies * 0.5;

    return (
      calorieScore * 0.4 +
      proteinScore * 0.2 +
      fatsScore * 0.2 +
      carbsScore * 0.1 +
      veggieScore * 0.1
    );
  }

  // преобразование ID в блюда
  decodeIndividual(individual) {
    return individual.map((id) => this.config.dishes.find((d) => d.id === id));
  }

  // турнирный отбор
  selectParent() {
    const tournamentSize = 5;
    let best = null;
    let bestFitness = -Infinity;

    for (let i = 0; i < tournamentSize; i++) {
      const index = Math.floor(Math.random() * this.population.length);
      const fitness = this.calculateFitness(this.population[index]);
      if (fitness > bestFitness) {
        best = this.population[index];
        bestFitness = fitness;
      }
    }
    return best;
  }

  // скрещивание
  crossover(parent1, parent2) {
    const point = Math.floor(Math.random() * parent1.length);
    return [...parent1.slice(0, point), ...parent2.slice(point)];
  }

  // мутация
  mutate(individual) {
    const mutated = [...individual];
    const geneIndex = Math.floor(Math.random() * mutated.length);
    const type = this.config.mealTypes[geneIndex];
    const available = this.config.dishes.filter((d) => d.type === type);
    mutated[geneIndex] =
      available[Math.floor(Math.random() * available.length)].id;
    return mutated;
  }

  // эволюция
  evolve() {
    this.initPopulation();
    let bestFitness = 0;
    let bestIndividual = null;

    for (
      let generation = 0;
      generation < this.config.maxGenerations;
      generation++
    ) {
      const newPopulation = [];

      // сохраняем лучшего
      const currentBest = this.population.reduce(
        (best, ind) => {
          const fitness = this.calculateFitness(ind);
          return fitness > best.fitness ? { individual: ind, fitness } : best;
        },
        { individual: null, fitness: -Infinity }
      );

      if (currentBest.fitness > bestFitness) {
        bestFitness = currentBest.fitness;
        bestIndividual = currentBest.individual;
      }

      newPopulation.push(currentBest.individual);

      // заполняем новую популяцию
      while (newPopulation.length < this.config.populationSize) {
        const parent1 = this.selectParent();
        const parent2 = this.selectParent();
        let child = this.crossover(parent1, parent2);

        if (Math.random() < this.config.mutationRate) {
          child = this.mutate(child);
        }

        newPopulation.push(child);
      }

      this.population = newPopulation;

      // условие остановки
      if (bestFitness >= 0.95) break;
    }

    return {
      individual: bestIndividual,
      fitness: bestFitness,
      menu: this.decodeIndividual(bestIndividual),
    };
  }
}

module.exports = GeneticAlgorithm;
