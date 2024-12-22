import React, { useState } from 'react';
import {  X } from 'lucide-react';
import { getRecipeInstructions } from '../services/api';

export default function RecipeCard({ recipe }) {
    const [instructions, setInstructions] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const fetchInstructions = async () => {
        if (!instructions) {
            const data = await getRecipeInstructions(recipe.id);
            setInstructions(data);
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="w-full max-w-2xl overflow-hidden bg-white rounded-lg shadow-md flex flex-col">
            <div className="relative">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="object-cover w-full h-48"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-0 left-0 p-4 text-xl font-semibold text-white">
                    {recipe.title}
                </h3>
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between bg-white">
                <div>
                <div className="mb-4">
                    <h4 className="mb-2 font-semibold text-lg">Used Ingredients:</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {recipe.usedIngredients.map((ingredient) => (
                            <div
                                key={ingredient.id}
                                className="flex items-center gap-2 px-2 py-1 bg-green-50 border border-green-200 rounded-lg"
                            >
                                <span className="text-green-700 text-sm line-clamp-2">{ingredient.original}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="mb-2 font-semibold text-lg">Missing Ingredients:</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {recipe.missedIngredients.map((ingredient) => (
                            <div
                                key={ingredient.id}
                                className="flex items-center gap-2 px-2 py-1 bg-red-50 border border-red-200 rounded-lg"
                            >
                                <span className="text-red-700 text-sm">{ingredient.original}</span>
                            </div>
                        ))}
                    </div>
                </div>
                </div>

                <button
                    onClick={fetchInstructions}
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                    Show Instructions
                </button>

                {isExpanded && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                            {instructions && instructions.steps.length > 0 ? (
                                <div className="space-y-4">
                                    {instructions.steps.map((step) => (
                                        <div key={step.number} className="p-4 bg-gray-50 rounded-lg">
                                            <p className="font-semibold">Step {step.number}</p>
                                            <p className="mt-2 text-gray-700">{step.step}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No instructions available.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
