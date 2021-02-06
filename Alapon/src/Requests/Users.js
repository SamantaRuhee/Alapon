import { JPClient } from "./../Clients/JPClient";
const user_endpoint = "/users";

const getUsers = () => {
  return JPClient.get(user_endpoint);
};

export { getUsers };