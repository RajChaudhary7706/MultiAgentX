import api from "../../utils/axios";

const getCurrentUsers = async () => {
  try {
    const { data } = await api.get("/api/me")
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
export default getCurrentUsers