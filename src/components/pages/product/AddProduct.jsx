import Layout from "../../layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    product_name: "",
    base_price: "", // Changed back to base_price
    description: "",
    variants: [],
    images: [], // Changed from image to images (array)
  });

  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [variantIndex, setVariantIndex] = useState(0);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const catRes = await axios.get("http://127.0.0.1:8000/api/categories");
      const subcatRes = await axios.get("http://127.0.0.1:8000/api/subcategories");

      console.log("CATEGORIES:", catRes.data);
      console.log("SUBCATEGORIES:", subcatRes.data);

      const categoriesData = Array.isArray(catRes.data)
        ? catRes.data
        : catRes.data.data || [];

      const subcategoriesData = Array.isArray(subcatRes.data)
        ? subcatRes.data
        : subcatRes.data.data || [];

      setCategories(categoriesData);
      setSubcategories(subcategoriesData);

    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
    }
  };

  fetchData();
}, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    // Convert FileList to array for multiple images
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
    // Append variants as array (not JSON string)
    formData.variants.forEach((variant, index) => {
      data.append(`variants[${index}][type]`, variant.type);
      data.append(`variants[${index}][name]`, variant.name);
      data.append(`variants[${index}][stock]`, variant.stock || 0);
      data.append(`variants[${index}][price_adjustment]`, variant.price_adjustment || 0);
    });

    // Log FormData contents for debugging
    console.log("Sending FormData:");
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/product/store",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success response:", res.data);
      alert("Product Added Successfully");

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

      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);

        // Show detailed error message
        let errorMessage = `Error (${err.response.status}):\n`;

        if (err.response.data.errors) {
          // Validation errors from Laravel
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
      } else if (err.request) {
        alert("Cannot connect to server. Please check if backend is running.");
      } else {
        alert(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <h4>Add Product</h4>

            <form onSubmit={handleSubmit}>
              {/* Product Name */}
              <div className="mb-3">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="product_name"
                  placeholder="Enter product name"
                  className="form-control"
                  value={formData.product_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Base Price */}
              <div className="mb-3">
                <label className="form-label">Base Price *</label>
                <input
                  type="number"
                  name="base_price"
                  placeholder="Enter base price"
                  className="form-control"
                  value={formData.base_price}
                  onChange={handleChange}
                  required
                  step="0.01"
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category *</label>
                <select
                  className="form-control"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {Array.isArray(categories) &&
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category_name || cat.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Subcategory */}
              <div className="mb-3">
                <label className="form-label">Subcategory</label>
                <select
                  className="form-control"
                  value={subcategoryId}
                  onChange={(e) => setSubcategoryId(e.target.value)}
                >
                  <option value="">Select Subcategory</option>
                  {Array.isArray(subcategories) &&
                    subcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.sub_category_name || sub.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  placeholder="Enter product description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Images - Multiple */}
              <div className="mb-3">
                <label className="form-label">Product Images * (You can select multiple)</label>
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
                      {formData.images.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <hr />

              <h5>Variants (Optional)</h5>
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => addVariant("storage")}
                  className="btn btn-primary me-2"
                >
                  Add Storage Variant
                </button>
                <button
                  type="button"
                  onClick={() => addVariant("color")}
                  className="btn btn-warning me-2"
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

                  <div className="mb-2">
                    <label className="form-label">Variant Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., 128GB, Red, iPhone 12"
                      className="form-control"
                      value={variant.name}
                      onChange={(e) =>
                        handleVariantChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </div>

                  {variant.type === "storage" && (
                    <div className="mb-2">
                      <label className="form-label">Price Adjustment</label>
                      <input
                        type="number"
                        placeholder="Additional price (if any)"
                        className="form-control"
                        value={variant.price_adjustment}
                        onChange={(e) =>
                          handleVariantChange(index, "price_adjustment", e.target.value)
                        }
                      />
                    </div>
                  )}

                  <div className="mb-2">
                    <label className="form-label">Stock Quantity</label>
                    <input
                      type="number"
                      placeholder="Stock quantity"
                      className="form-control"
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

              <button
                type="submit"
                className="btn btn-success mt-3"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddProduct;