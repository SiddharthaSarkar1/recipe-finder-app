import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";

const FavoritesPage = () => {
  const fav = true;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    setCategories([]);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      const data = await res.json();
      console.log(data);
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchQuery}`
      );
      const data = await res.json();
      console.log(data);
      setRecipes(data.meals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("Seafood");
    fetchCategories();
  }, []);

  return (
    <div className="bg-[#faf9fb] flex-1 p-10 min-h-screen">
      <div className="my-10">
        {categories.map((item) => (
          <div
            key={item.idCategory}
            role="button"
            className="btn m-1 border hover:border-black"
            onClick={() => fetchRecipes(item.strCategory)}
          >
            {item.strCategory}
          </div>
        ))}
      </div>

      <div className="max-w-screen-lg mx-a">
        <div className="font-bold text-3xl md:text-5xml my-4">
          Popular Recipes by Category
        </div>

        {!fav && (
          <div className="h-[80vh] flex flex-col items-center gap-4">
            <img src="/404.svg" className="h-3/4" alt="404 svg" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fav &&
            !loading &&
            recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
