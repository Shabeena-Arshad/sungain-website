import axios from "axios";
// import "@/plugins/axios";

export default {
  get: async (path, options?) => axios.get(path, { params: options }),
  create: (path, item, config = {}) => axios.post(path, item, config),
  update: (path, item, config?) => axios.put(path, item, config),
  delete: path => axios.delete(path)
};
