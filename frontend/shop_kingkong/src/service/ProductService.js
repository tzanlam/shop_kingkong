import axios from "axios";

const ProductService = {
  getAll() {
    return axios.get("product");
  },
  getProdcutById(productId) {
    return axios.get(`product/${productId}`);
  },
  createProduct(productRequest) {
    return axios.get(`product/create/${productRequest}`);
  },
  updateProduct(productId, productRequest) {
    return axios.get(`product/update/${productId}/${productRequest}`);
  },
  deleteProduct(productId) {
    return axios.get(`product/delete/${productId}`);
  },
};
