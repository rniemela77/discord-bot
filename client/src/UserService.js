import axios from "axios";

const url = "/api/users";

export const login = async (user) => {
  return await axios.post(url, user).then((res) => {
    return res;
  });
};
