import { Fragment, useContext } from "react";
import CryptoContext from "../contex/crypto-contex";
import { useAuth } from "../hooks/useAuth";
import AssetCard from "./AssetCard";
import { HelpCard } from "./HelpCard";

export function AssetsCards() {
    const { assets } = useContext(CryptoContext);
    const { isAuth } = useAuth();

    return (
        <Fragment>
            {assets.length > 0 ? (
                assets.map(asset => (
                    <AssetCard key={asset.firestoreId || asset.id} asset={asset} />
                ))
            ) : (
                !isAuth &&
                <HelpCard />
            )}
        </Fragment>
    )
}