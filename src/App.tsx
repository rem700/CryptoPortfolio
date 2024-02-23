import { ConfigProvider } from "antd";
import AppLayout from "./components/layouts/AppLayout";
import { CryptoContextProvider } from "./contex/crypto-contex";
import { useTheme } from "./theme/theme";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { setUser } from "./store/slices/userSlice";



function App() {
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
        const userObject = JSON.parse(userData);
        dispatch(setUser(userObject));
    }
}, [dispatch]);

  return (
    <CryptoContextProvider>
      <ConfigProvider theme={theme} >
        <AppLayout />   
      </ConfigProvider>
          
    </CryptoContextProvider>
  );
}

export default App;
