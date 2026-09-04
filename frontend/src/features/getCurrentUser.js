import api from "../utils/axios";

const getCurrentUsers = async () => {
  try {
    const { data } = await api.get("/api/me")
    return data;
  } catch (error) {
    console.log(error)
    return null;
  }
}
export default getCurrentUsers