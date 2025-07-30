import axios, { AxiosInstance } from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "http://localhost:3001/api"; // adjust if deployed

export default function useApi(): AxiosInstance {
  const { token } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: API_BASE,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return instance;
}
