import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "./reduxHooks";
import { setUser } from "../store/slices/userSlice";

export function useLogIn() {
    const dispatch = useAppDispatch();

    return (email: string, password: string) => new Promise((resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
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
                console.error("Login error:", error);
                reject(error);
            });
    });
}
