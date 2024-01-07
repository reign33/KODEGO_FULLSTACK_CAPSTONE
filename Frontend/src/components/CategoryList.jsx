import { useEffect } from "react";
import categoryService from "../services/categoryService";
import { FaRegTrashCan } from "react-icons/fa6";
import LoadingSpinner from "./LoadingSpinner";

function CategoryList({ category, setCategory, isLoading, setIsLoading }) {
  useEffect(() => {
    categoryService.getCategories().then((res) => {
      setCategory(res);
    });
  }, []);

  const handleDelete = (id) => {
    setIsLoading(true);

    categoryService
      .deleteCategory(id)
      .then((_) => {
        setCategory(category.filter((cat) => cat.id !== id));
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  if (isLoading === true) {
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
    <ul className="my-4 flex flex-col gap-2">
      {Array.isArray(category) && category.map((cat) => (
        <li className="flex items-center justify-between p-[7px] bg-[#E6E6E6] rounded-lg" key={cat.id}>
          <div className="flex items-center gap-4 font-bold">
            <img className="w-12 border border-[green] border-[2px]" src={cat.photoInfo.url} />
            <div>{cat.content}</div>
          </div>
          <button
            onClick={() => handleDelete(cat.id)}
            className="text-red-400 font-medium"
          >
            <FaRegTrashCan />
          </button>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default CategoryList;
