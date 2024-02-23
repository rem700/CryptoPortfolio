import { useCallback, useContext } from 'react';
import { useAppDispatch } from './reduxHooks'; 
import { getAuth, signOut } from "firebase/auth";
import { removeUser } from '../store/slices/userSlice';
import CryptoContext from '../contex/crypto-contex';


const useLogOut = () => {
    const dispatch = useAppDispatch();
    const {clearAssets} = useContext(CryptoContext)

    const logOut = useCallback(() => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch(removeUser()); 
                localStorage.removeItem('user');
                dispatch(clearAssets);
            })
            .catch((error) => {
                console.error("Ошибка при выходе:", error);
            });
    }, [dispatch]);

    return logOut;
};

export default useLogOut;