import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAppDispatch } from "./reduxHooks";
import { setUser } from "../store/slices/userSlice";

export function useSignIn() {
    const dispatch = useAppDispatch();

    return (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    const userData = {
                        email: user.email,
                        id: user.uid,
                        token: user.refreshToken,
                    };
                    dispatch(setUser(userData));
                    resolve(user);
                    localStorage.setItem('user', JSON.stringify(userData));
                })
                .catch(error => {
                    reject(error); 
                });
        });
    };
}

