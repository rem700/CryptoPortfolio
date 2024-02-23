import { createContext, useEffect, useState } from "react";
import { IAssetData, ICryptoCurrency } from "../interfaces/IData";
import { fetchCryptoData } from "../api/cryptoApi";
import { calculatePercentageDifference } from "../utils/utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, collection, addDoc, deleteDoc, getDocs, query, updateDoc } from "firebase/firestore";

interface CryptoContextType {
    assets: IAssetData[];
    crypto: ICryptoCurrency[];
    loading: boolean;
    addNewAsset: (newAsset: IAssetData) => void;
    addNewAssetToFirebase: (newAsset: IAssetData) => void;
    removeAssetFromFirebase: (assetId: string) => void,
    clearAssets: () => void;
    removeAsset: (firestoreId: string) => void,
    updateAssetInFirebase: (firestoreId: string, updatedFields: Pick<IAssetData, 'price' | 'amount'>) => void
}

const CryptoContext = createContext<CryptoContextType>({
    assets: [],
    crypto: [],
    loading: false,
    addNewAsset: () => { },
    addNewAssetToFirebase: () => { },
    removeAssetFromFirebase: () => { },
    clearAssets: () => { },
    removeAsset: () => { },
    updateAssetInFirebase: () => { },
});

export function CryptoContextProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState<ICryptoCurrency[]>([]);
    const [assets, setAssets] = useState<IAssetData[]>([]);
    const [enrichedAssets, setEnrichedAssets] = useState<IAssetData[]>([]);


    const addNewAssetToFirebase = async (newAsset: Omit<IAssetData, 'firestoreId'>) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
        
        const db = getFirestore();
        const assetsRef = collection(db, "userAssets", user.uid, "assets");
        
        try {
            const docRef = await addDoc(assetsRef, newAsset);
            const assetWithFirestoreId = { ...newAsset, firestoreId: docRef.id };
            addNewAsset(assetWithFirestoreId);
        } catch (error) {
            console.error("Error adding asset to Firebase:", error);
        }
    };

    const removeAssetFromFirebase = async (firestoreId: string) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const db = getFirestore();
        const assetRef = doc(db, "userAssets", user.uid, "assets", firestoreId);

        try {
            await deleteDoc(assetRef);
            removeAsset(firestoreId);
        } catch (error) {
            console.error("Error removing asset from Firebase: ", error);
        }
    };

    const updateAssetInFirebase = async (firestoreId: string, updatedFields: Pick<IAssetData, 'price' | 'amount'>) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
    
        const db = getFirestore();
        const assetRef = doc(db, "userAssets", user.uid, "assets", firestoreId);
    
        try {
            await updateDoc(assetRef, updatedFields);
            updateLocalAsset(firestoreId, updatedFields);
        } catch (error) {
            console.error("Error updating asset in Firebase:", error);
        }
    };
    
    const updateLocalAsset = (firestoreId: string, updatedFields: Pick<IAssetData, 'price' | 'amount'>) => {
        setAssets(currentAssets => currentAssets.map(asset => {
            if (asset.firestoreId === firestoreId) {
                const newTotalAmount = updatedFields.amount * (asset.price || 0);
                return { ...asset, ...updatedFields, totalAmount: newTotalAmount };
            }
            return asset;
        }));
    };

    const loadUserAssets = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            return;
        }
    
        const db = getFirestore();
        const assetsCollectionRef = collection(db, "userAssets", user.uid, "assets");
    
        try {
            const querySnapshot = await getDocs(query(assetsCollectionRef));
            const assetsArray: IAssetData[] = [];
            querySnapshot.forEach((doc) => {
                assetsArray.push({ firestoreId: doc.id, ...doc.data() as Omit<IAssetData, 'firestoreId'> });
            });
            setAssets(assetsArray);
        } catch (error) {
            console.error("Ошибка при загрузке ассетов:", error);
        }
    };

    const addNewAsset = (newAsset: IAssetData) => {
        setAssets((prevAssets) => [...prevAssets, newAsset]);
    };

    function MapAssets(assets: IAssetData[], result: ICryptoCurrency[]) {
        return assets.map((asset) => {
            const coin = result.find((c) => c.id === asset.id);
            if (coin) {
                return {
                    name: coin.name,
                    grow: asset.price < coin.price,
                    growPercent: +calculatePercentageDifference(asset.price, coin.price).toFixed(2),
                    totalAmount: +asset.amount * coin.price,
                    totalProfit: +asset.amount * coin.price - asset.amount * asset.price,
                    ...asset,
                };
            } else {
                return {
                    ...asset
                };
            }
        });
    }

    useEffect(() => {

        async function preload() {
            setLoading(true);
            try {
                const cryptoData = await fetchCryptoData();
                setCrypto(cryptoData);
            } catch (error) {
                console.error("Ошибка при предварительной загрузке данных:", error);
            } finally {
                setLoading(false);
            }
        }
        preload();

        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                loadUserAssets();
            } else {
                setAssets([]);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const updatedEnrichedAssets = MapAssets(assets, crypto);
        setEnrichedAssets(updatedEnrichedAssets);
    }, [assets, crypto]);


    const removeAsset = (firestoreId: string) => {
            setAssets(currentAssets => currentAssets.filter(asset => asset.firestoreId !== firestoreId));
    };

    const clearAssets = () => {
        setAssets([]);
    };
    
    return <CryptoContext.Provider value={{ loading, crypto, assets: enrichedAssets, addNewAssetToFirebase, addNewAsset, clearAssets, removeAssetFromFirebase, removeAsset, updateAssetInFirebase }}>{children}</CryptoContext.Provider>
}

export default CryptoContext;
