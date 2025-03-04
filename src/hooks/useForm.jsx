import { useState, useEffect } from "react";

const useForm = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const resetForm = () => setFormData(initialValues);
  const resetForm = (newValues = initialValues) => {
    setFormData(newValues);
  };

  return {
    formData,
    handleChange,
    resetForm,
    loading,
    setLoading,
  };
};

export default useForm;
