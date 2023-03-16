import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { firebaseApp } from "../configs/firebase";
import DLayout from "../pages/dashboard/d-layout";
import { selectAuthState } from "../redux-toolkit/auth/auth-slice";
import { getCurrentAccountThunk } from "../redux-toolkit/auth/auth-thunk";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hooks";

type AuthGuardPropType = {
  children: React.ReactNode;
};

const AuthGuard = (props: AuthGuardPropType) => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  // const [account, setAccount] = useState<any>(null);
  const { account, isAuthLoading } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // setAccount(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getCurrentAccountThunk(user.uid));
      } else {
        // ไม่ได้ล็อกอินแล้ว
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  if (isAuthLoading === true) return <CircularProgress />;

  if (account == null) {
    return <Navigate to="/login" />;
  }

  return <>{props.children}</>;

  // <DLayout />;
};

export default AuthGuard;
