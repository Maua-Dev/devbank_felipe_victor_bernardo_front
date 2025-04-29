import { createContext, ReactNode, useState } from "react";

type APIEndpointContextType = {
    endpoint: string,
    setEndpoint: React.Dispatch<React.SetStateAction<string>>
}

export const APIEndpointContext = createContext<APIEndpointContextType | undefined>(undefined);

export const APIEndpointProvider = ({ children }: { children: ReactNode }) => {

    const [endpoint, setEndpoint] = useState<string>("")

    return (
        <APIEndpointContext.Provider value={ {endpoint, setEndpoint} }>
            { children }
        </APIEndpointContext.Provider>
    )

}