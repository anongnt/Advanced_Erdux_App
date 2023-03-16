import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthState } from "../redux-toolkit/auth/auth-slice";
import { logout } from "../services/auth.service";

export const useAccount = () => {
  const navigate = useNavigate();
  const { account } = useSelector(selectAuthState);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return { account, handleLogout };
};
