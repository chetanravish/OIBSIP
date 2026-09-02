import axiosInstance from "../utils/axios.instance";

export const registerUser = async(username,email,password)=>{
    const {data} = await axiosInstance.post("/api/auth/register",{username,email,password})
    return data;
}


export const loginUser = async(email,password)=>{
    const{data} = await axiosInstance.post("/api/auth/login",{email,password})
    return data;
}


export const getDashboard = async (token) => {
  const { data } = await axiosInstance.get("/api/auth/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const logOut = async ()=>{
    await axiosInstance.get("/api/auth/logout")
}