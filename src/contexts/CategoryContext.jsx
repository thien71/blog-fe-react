import { createContext, useContext, useState, useEffect } from "react";
import CategoryAPI from "../apis/endpoints/categories";
import useFetchAPI from "../hooks/useFetchAPI";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const { data: categories, loading, error } = useFetchAPI(CategoryAPI.getAll);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const value = {
    categories,
    loading,
    error,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
