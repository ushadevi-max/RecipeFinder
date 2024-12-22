import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CookingPot, UtensilsCrossed } from 'lucide-react';
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';
import { searchRecipesByIngredients } from '../services/api';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleIngredientsSubmit = async (ingredients) => {
    setLoading(true);
    setIsSearching(true);
    const results = await searchRecipesByIngredients(ingredients);
    setRecipes(results);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Background pattern */}
      <div 
        className="fixed inset-0 z-0 opacity-5"
      />

      {/* Hero Background with overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url("/api/placeholder/1920/1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10">
        <div className="container px-4 mx-auto">
          <motion.div
            className="flex flex-col items-center"
            animate={{
              paddingTop: isSearching ? '2rem' : '15vh',
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <AnimatePresence>
              {!isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center mb-12 space-y-6 text-center"
                >
                  <div className="relative">
                    <CookingPot size={64} className="text-blue-500" />
                    <motion.div
                      className="absolute -right-4 -top-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <UtensilsCrossed size={24} className="text-blue-400" />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-5xl font-bold text-gray-800">
                      Recipe Finder
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl">
                      Transform your ingredients into delicious meals
                    </p>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <span className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                      Quick & Easy
                    </span>
                    <span className="px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                      Personalized Results
                    </span>
                    <span className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
                        380,000+ Recipes
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div 
              layout
              className="w-full flex justify-center mb-8"
            >
              <IngredientInput onIngredientsSubmit={handleIngredientsSubmit} />
            </motion.div>

            <AnimatePresence>
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center w-full"
                >
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </motion.div>
              ) : (
                 recipes.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {recipes.map((recipe) => (
                      <motion.div
                        key={recipe.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-center"
                      >
                        <RecipeCard recipe={recipe} />
                      </motion.div>
                    ))}
                  </motion.div>
                ):(
                <div className='mt-8 text-gray-500 text-lg font-semibold'>{isSearching && "No Recipe Found For Given Ingredients"}</div>
                )
              )}
              
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;