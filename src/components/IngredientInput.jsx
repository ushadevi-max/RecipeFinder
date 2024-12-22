import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
export default function IngredientInput({ onIngredientsSubmit }) {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [showError, setShowError] = useState(false);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
      setShowError(false);
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length > 0) {
      onIngredientsSubmit(ingredients);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 justify-center">
          <input
            type="text"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            placeholder="Enter an ingredient"
            className={`flex-1 px-4 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-2xl ${
              showError ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          <button
            type="button"
            onClick={addIngredient}
            className="p-2 text-white bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {ingredients.map((ingredient, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-green-100 border border-green-300 text-green-700 font-semibold rounded-full"
            >
              {ingredient}
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </span>
          ))}
        </div>

        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-red-500 text-sm"
          >
            Please add at least one ingredient before searching
          </motion.div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full max-w-md px-4 py-2 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold hover:cursor-pointer transition-colors duration-200 ${
              ingredients.length === 0
                ? 'bg-gray-400 hover:bg-gray-500'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            Find Recipes
          </button>
        </div>
      </form>
    </div>
  );
}