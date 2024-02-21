'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import {
    type OrderStore,
    createOrderStore,
    initOrderStore,
} from '../store/order-store'

export const OrderStoreContext = createContext<StoreApi<OrderStore> | null>(
    null,
)

export interface OrderStoreProviderProps {
    children: ReactNode
}

export const OrderStoreProvider = ({
    children,
}: OrderStoreProviderProps) => {
    const storeRef = useRef<StoreApi<OrderStore>>()
    if (!storeRef.current) {
        storeRef.current = createOrderStore(initOrderStore())
    }

    return (
        <OrderStoreContext.Provider value={storeRef.current}>
            {children}
        </OrderStoreContext.Provider>
    )
}

export const useOrderStore = <T,>(
    selector: (store: OrderStore) => T,
): T => {
    const orderStoreContext: any = useContext(OrderStoreContext)

    if (!OrderStoreContext) {
        throw new Error(`useOrderStore must be use within OrderStoreProvider`)
    }

    const storeApi: StoreApi<OrderStore> = orderStoreContext as StoreApi<OrderStore>;
    return useStore(storeApi, selector)
}