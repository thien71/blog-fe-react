import { createContext, useContext, useState, useEffect } from "react";
import TagAPI from "../apis/endpoints/tags";
import useFetchAPI from "../hooks/useFetchAPI";

const TagContext = createContext();

export function TagProvider({ children }) {
  const { data: tags, loading, error } = useFetchAPI(TagAPI.getAll);

  if (loading) return <p></p>;
  if (error) return <p>Error: {error}</p>;

  const value = {
    tags,
    loading,
    error,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
}

export function useTag() {
  return useContext(TagContext);
}
