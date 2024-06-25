import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeCardMain from "../components/RecipeCardMain";

const alph = [
  "A",
  "C",
  "D",
  "B",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipesByAlph, setRecipesByAlph] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipesByAlph([]);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`
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

  const fetchRecipesByAlphabate = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchQuery}`
      );
      const data = await res.json();
      console.log(data);
      if(data.meals !== null){
        setRecipesByAlph(data.meals);
      }else{
        fetchRecipesByAlphabate("A");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("chicken_breast");
    fetchRecipesByAlphabate("A");
  }, []);

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form action="">
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What do you want to cook today?"
            />
          </label>
        </form>

        <div className="my-10">
          {alph.map((item) => (
            <div
              key={item}
              role="button"
              className="btn m-1 border hover:border-black"
              onClick={() => fetchRecipesByAlphabate(item)}
            >
              {item}
            </div>
          ))}
        </div>

        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Recommended Recipes
        </h1>

        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          List all meals by first letter
        </p>

        <div className="grid grid-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* <RecipeCard /> */}

          {!loading &&
            recipesByAlph.map((recipe, index) => (
              <RecipeCardMain key={index} recipe={recipe} />
            ))}

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

        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular choices
        </p>

        <div className="grid grid-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* <RecipeCard /> */}

          {!loading &&
            recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}

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
      </div>
    </div>
  );
};

export default HomePage;
