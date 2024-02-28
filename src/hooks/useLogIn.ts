import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "./reduxHooks";
import { setUser } from "../store/slices/userSlice";

export function useLogIn() {
    const dispatch = useAppDispatch();

    return (email: string, password: string, rememberMe: boolean) => new Promise((resolve, reject) => {
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
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('rememberMe');
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                reject(error);
            });
    });
}
