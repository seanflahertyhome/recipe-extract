export interface Ingredient {
  amount: string;
  unit: string;
  item: string;
  notes?: string;
}

export interface Instruction {
  step: number;
  text: string;
}

export interface Recipe {
  title: string;
  description?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  sourceUrl: string;
  extractedAt: string;
}
