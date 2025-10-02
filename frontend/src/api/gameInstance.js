import axios from "axios";

const userInstance = axios.create({
    baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/v1/games"
      : "/api/v1/games",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default userInstance;