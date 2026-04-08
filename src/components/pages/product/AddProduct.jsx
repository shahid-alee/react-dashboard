import Layout from "../../layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    product_name: "",
    base_price: "",
    description: "",
    category: "",
    subcategory: "",
    variants: [],
    image: null,
  });


  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Fetch categories and subcategories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get("http://127.0.0.1:8000/api/categories");
        const subcatRes = await axios.get("http://127.0.0.1:8000/api/subcategories");
        setCategories(catRes.data.data);
        setSubcategories(subcatRes.data.data);
      } catch (err) {
        console.error("Error fetching categories/subcategories:", err);
      }
    };
    fetchData();
  }, []);

  const [variantIndex, setVariantIndex] = useState(0);

  // Handle normal input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  
  const addVariant = (type) => {
    const newVariant = {
      id: variantIndex,
      type: type,
      name: "",
      stock: 0,
      price_adjustment: type === "storage" ? 0 : 0, // only used for storage
    };

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));

    setVariantIndex((prev) => prev + 1);
  };

  // Handle Variant Change
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;

    setFormData({
      ...formData,
      variants: updatedVariants,
    });
  };

  // Remove Variant
  const removeVariant = (index) => {
    const updated = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updated });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("product_name", formData.product_name);
    data.append("base_price", formData.base_price);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
    data.append("image", formData.image);

    // Ensure correct pricing logic
    const cleanVariants = formData.variants.map((v) => ({
      ...v,
      price_adjustment: v.type === "storage" ? v.price_adjustment : 0,
    }));

    data.append("variants", JSON.stringify(cleanVariants));

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/products/store",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product Added Successfully");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error adding product");
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
              <div className="form-group row mb-3">
                <label className="col-md-3 col-form-label">
                  Product Name
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="product_name"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="form-group row mb-3">
                <label className="col-md-3 col-form-label">Price</label>
                <div className="col-md-9">
                  <input
                    type="number"
                    name="base_price"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Category */}
              <label className="col-md-3 col-form-label">Category</label>
              <select
                name="category"
                className="form-control"
                onChange={handleChange}
                value={formData.category}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              {/* Subcategory */}
              <label className="col-md-3 col-form-label">Subcategory</label>
              <select
                name="subcategory"
                className="form-control"
                onChange={handleChange}
                value={formData.subcategory}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>

              {/* Description */}
              <div className="form-group row mb-3">
                <label className="col-md-3 col-form-label">
                  Description
                </label>
                <div className="col-md-9">
                  <textarea
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Image Upload */}
              {/* <div className="form-group row mb-3">
                <label className="col-md-3 col-form-label">
                  Product Image
                </label>
                <div className="col-md-9">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />

                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="preview"
                        width="120"
                      />
                    </div>
                  )}
                </div>
              </div> */}

              <hr />

              <h5>Variants</h5>

              {/* Buttons */}
              <div className="mb-3">
                <button type="button" onClick={() => addVariant("storage")} className="btn btn-primary me-2">
                  Add Storage
                </button>

                <button type="button" onClick={() => addVariant("generation")} className="btn btn-info me-2">
                  Add Generation
                </button>

                <button type="button" onClick={() => addVariant("color")} className="btn btn-warning">
                  Add Color
                </button>
              </div>

              {/* Variants */}
              {formData.variants.map((variant, index) => (
                <div key={variant.id} className="border p-3 mb-3">

                  <h6 className="text-capitalize">{variant.type} Variant</h6>

                  {/* Name */}
                  <div className="form-group row mb-2">
                    <label className="col-md-3 col-form-label">Name</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        value={variant.name}
                        onChange={(e) =>
                          handleVariantChange(index, "name", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Price ONLY for storage */}
                  {variant.type === "storage" && (
                    <div className="form-group row mb-2">
                      <label className="col-md-3 col-form-label">
                        Price Adjustment
                      </label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          className="form-control"
                          value={variant.price_adjustment}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "price_adjustment",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* Stock */}
                  <div className="form-group row mb-2">
                    <label className="col-md-3 col-form-label">Stock</label>
                    <div className="col-md-9">
                      <input
                        type="number"
                        className="form-control"
                        value={variant.stock}
                        onChange={(e) =>
                          handleVariantChange(index, "stock", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeVariant(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button type="submit" className="btn btn-success mt-3">
                Save Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddProduct;