import { IAssetData, ICryptoCurrency, IMetaData } from "../interfaces/IData";

export function fetchCryptoData(): Promise<ICryptoCurrency[]> {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': 'nbosZcjlCNI1R1eNcgXVyfxZDjRZpiau8INply1HFjA='
        }
    };

    return fetch('https://openapiv1.coinstats.app/coins', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: { result: ICryptoCurrency[], meta: IMetaData }) => {
            return data.result; 
        })
        .catch(error => {
            console.error('Error fetching crypto data:', error);
            return [];
        });
}

export function AssetData() {
    const assetData: IAssetData[] = []
    return (
        assetData
    )
}