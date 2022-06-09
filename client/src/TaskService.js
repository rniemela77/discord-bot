import axios from "axios";

const url = "/api/tasks";

export const getTasks = async () => {
  return await axios.get(url).then((response) => {
    return response.data;
  });
};

export const addTask = async (task) => {
  return await axios.post(url, task).then((res) => {
    return res;
  });
};

export const deleteTask = async (id) => {
  return await axios.delete(`${url}/${id}`).then((res) => {
    return res;
  });
};
