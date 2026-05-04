import Layout from "../../layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_name: "",
    base_price: "", 
    description: "",
    variants: [],
    images: [], 
  });

  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [variantIndex, setVariantIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    
    console.log("Token exists:", token ? "Yes" : "No");
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.error("No token found");
      return;
    }

    // Fetch categories
    try {
      const categoriesRes = await axios.get("http://127.0.0.1:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      console.log("Categories loaded:", categoriesRes.data);
      const categoriesData = Array.isArray(categoriesRes.data) ? categoriesRes.data : (categoriesRes.data?.data || []);
      setCategories(categoriesData);
    } catch (err) {
      console.error("CATEGORY ERROR:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Failed to load categories");
      }
    }

    // Fetch subcategories
    try {
      const subcategoriesRes = await axios.get("http://127.0.0.1:8000/api/subcategory", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      console.log("Subcategories loaded:", subcategoriesRes.data);
      let subcategoriesData = [];
      if (Array.isArray(subcategoriesRes.data)) {
        subcategoriesData = subcategoriesRes.data;
      } else if (subcategoriesRes.data?.data && Array.isArray(subcategoriesRes.data.data)) {
        subcategoriesData = subcategoriesRes.data.data;
      } else {
        subcategoriesData = [];
      }
      setSubcategories(subcategoriesData);
    } catch (err) {
      console.error("SUBCATEGORY ERROR:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Failed to load subcategories");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });
  };

  const addVariant = (type) => {
    const newVariant = {
      id: variantIndex,
      type: type,
      name: "",
      stock: 0,
      price_adjustment: 0,
    };

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));

    setVariantIndex((prev) => prev + 1);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...formData.variants];
    updated[index][field] = value;
    setFormData({ ...formData, variants: updated });
  };

  const removeVariant = (index) => {
    const updated = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.product_name.trim()) {
      alert("Product name is required");
      return;
    }
    if (!formData.base_price || formData.base_price <= 0) {
      alert("Valid base price is required");
      return;
    }
    if (!categoryId) {
      alert("Please select a category");
      return;
    }
    if (!formData.description.trim()) {
      alert("Description is required");
      return;
    }
    if (formData.images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setLoading(true);

    // Create FormData
    const data = new FormData();
    data.append("product_name", formData.product_name);
    data.append("base_price", formData.base_price);
    data.append("description", formData.description);
    data.append("category_id", categoryId);
    if (subcategoryId) {
      data.append("subcategory_id", subcategoryId);
    }

    // Append multiple images
    formData.images.forEach((image) => {
      data.append("image[]", image);
    });

    // Append variants
    formData.variants.forEach((variant, index) => {
      data.append(`variants[${index}][type]`, variant.type);
      data.append(`variants[${index}][name]`, variant.name);
      data.append(`variants[${index}][stock]`, variant.stock || 0);
      data.append(`variants[${index}][price_adjustment]`, variant.price_adjustment || 0);
    });

    // Get token from localStorage
    const token = localStorage.getItem("token");
    
    console.log("Token being used:", token ? "Token exists" : "No token");
    console.log("Category ID:", categoryId);
    console.log("Subcategory ID:", subcategoryId);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/products/store",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
        }
      );

      console.log("Success response:", res.data);
      alert(res.data.message || "Product Added Successfully");

      // Reset form
      setFormData({
        product_name: "",
        base_price: "",
        description: "",
        variants: [],
        images: [],
      });
      setCategoryId("");
      setSubcategoryId("");
      setVariantIndex(0);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }

    } catch (err) {
      console.error("Submit Error:", err);
      console.error("Full error object:", err);

      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
        console.error("Response data:", err.response.data);

        if (err.response.status === 401) {
          alert("Authentication failed. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          let errorMessage = `Error (${err.response.status}):\n`;

          if (err.response.data.errors) {
            const errors = err.response.data.errors;
            for (let field in errors) {
              errorMessage += `${field}: ${errors[field].join(", ")}\n`;
            }
            alert(errorMessage);
          } else if (err.response.data.message) {
            alert(errorMessage + err.response.data.message);
          } else {
            alert(errorMessage + JSON.stringify(err.response.data, null, 2));
          }
        }
      } else if (err.request) {
        console.error("Request was made but no response received:", err.request);
        alert("Cannot connect to server. Please check if backend is running.");
      } else {
        console.error("Error setting up request:", err.message);
        alert(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };


  const getFilteredSubcategories = () => {
    if (!Array.isArray(subcategories) || subcategories.length === 0) {
      return [];
    }
    
    if (!categoryId) {
      return subcategories;
    }
    
    return subcategories.filter(sub => {
      const subCategoryId = sub.category_id || sub.categoryId || sub.cat_id || sub.parent_id;
      return subCategoryId == categoryId;
    });
  };

  return (
    <Layout>
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-8 grid-margin stretch-card" style={{ margin: "0 auto" }}>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add New Product</h4>

                <form onSubmit={handleSubmit}>
                  {/* Product Name */}
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label>Product Name *</label>
                    <input
                      type="text"
                      name="product_name"
                      className="form-control"
                      placeholder="Enter product name"
                      value={formData.product_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Base Price */}
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label>Base Price *</label>
                    <input
                      type="number"
                      name="base_price"
                      className="form-control"
                      placeholder="Enter base price"
                      value={formData.base_price}
                      onChange={handleChange}
                      required
                      step="0.01"
                    />
                  </div>

                  {/* Category */}
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label>Category *</label>
                    <select
                      className="form-control"
                      value={categoryId}
                      onChange={(e) => {
                        setCategoryId(e.target.value);
                        setSubcategoryId("");
                      }}
                      required
                    >
                      <option value="">Select Category</option>
                      {Array.isArray(categories) && categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.category_name || cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory */}
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label>Subcategory</label>
                    <select
                      className="form-control"
                      value={subcategoryId}
                      onChange={(e) => setSubcategoryId(e.target.value)}
                    >
                      <option value="">Select Subcategory</option>
                      {getFilteredSubcategories().map(sub => (
                        <option key={sub.id} value={sub.id}>
                          {sub.sub_category_name || sub.name || sub.subcategory}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label>Description *</label>
                    <textarea
                      name="description"
                      className="form-control"
                      placeholder="Enter product description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Images - Multiple */}
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label>Product Images * (You can select multiple)</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                      accept="image/*"
                      multiple
                      required
                    />
                    <small className="text-muted">
                      Allowed formats: JPG, JPEG, PNG. Max size: 10MB per image
                    </small>
                    {formData.images.length > 0 && (
                      <div className="mt-2">
                        <strong>Selected files:</strong>
                        <ul>
                          {Array.from(formData.images).map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <hr />

                  <h5>Variants (Optional)</h5>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <button
                      type="button"
                      onClick={() => addVariant("storage")}
                      className="btn btn-primary me-2"
                      style={{ marginRight: "10px" }}
                    >
                      Add Storage Variant
                    </button>
                    <button
                      type="button"
                      onClick={() => addVariant("color")}
                      className="btn btn-warning me-2"
                      style={{ marginRight: "10px" }}
                    >
                      Add Color Variant
                    </button>
                    <button
                      type="button"
                      onClick={() => addVariant("generation")}
                      className="btn btn-info"
                    >
                      Add Generation Variant
                    </button>
                  </div>

                  {formData.variants.map((variant, index) => (
                    <div key={variant.id} className="border p-3 mt-3 rounded">
                      <h6>Variant {index + 1} - {variant.type.toUpperCase()}</h6>

                      <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label>Variant Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g., 128GB, Black, iPhone 12"
                          value={variant.name}
                          onChange={(e) =>
                            handleVariantChange(index, "name", e.target.value)
                          }
                          required
                        />
                      </div>

                      {variant.type === "storage" && (
                        <div className="form-group" style={{ marginBottom: "15px" }}>
                          <label>Price Adjustment</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Additional price (if any)"
                            value={variant.price_adjustment}
                            onChange={(e) =>
                              handleVariantChange(index, "price_adjustment", e.target.value)
                            }
                          />
                        </div>
                      )}

                      <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label>Stock Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Stock quantity"
                          value={variant.stock}
                          onChange={(e) =>
                            handleVariantChange(index, "stock", e.target.value)
                          }
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeVariant(index)}
                      >
                        Remove Variant
                      </button>
                    </div>
                  ))}

                  <div style={{ textAlign: "right", marginTop: "20px" }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddProduct;