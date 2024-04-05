import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customer, order, item, order_item, isCustomer, isOrder, isItem, isOrderItem } from "../components/types";
import { fetchData, POST } from "../server/functions";
import { getTableName } from "./functions";
import { RootState } from "./store";

export type pageName = 'customer' | 'item' | 'order' | 'order_item' | 'home'
export type dataState = {
    entries: {
        customers: customer[],
        orders: order[],
        items: item[],
        orders_items: order_item[],
    },
    isLoading: boolean,
    error: string | null,
    isEditMode: boolean,
    selections: number[]
    currentPage: pageName,
    isModal: boolean,
}

const initialState: dataState = {
    entries: {
        customers: [],
        orders: [],
        items: [],
        orders_items: []
    },
    isLoading: true,
    error: null,
    isEditMode: false,
    selections: [],
    currentPage: 'home',
    isModal: false
};

export const fetchDataThunk = createAsyncThunk('fetch-data', async () => {
    try {
        return await fetchData();
    } catch (error) {
        throw error;
    }
});

export const deleteDataThunk = createAsyncThunk('delete-data',
    async (_, ThunkAPI) => {
        try {
            const currentState = ThunkAPI.getState() as RootState;
            const data: dataState = currentState.data;

            console.log(data);

            await fetch(`http://localhost:8888/${getTableName(data.currentPage)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: data.selections })
            });
            return await fetchData();

        } catch (error) {
            throw error;
        }
    });

export const editAddThunk = createAsyncThunk('add-edit-customer',
    async (obj: any, ThunkAPI) => {
        try {
            const currentState = ThunkAPI.getState() as RootState;
            const { entries } = currentState.data;

            if (isCustomer(obj)) {

                const index = entries.customers
                    .findIndex((el) => el.id === obj.id);
                const isCustomerFound = index !== -1;

                if (isCustomerFound) {
                    await POST(`http://localhost:8888/customers-edit`, obj);
                } else {
                    await POST(`http://localhost:8888/customers-add`, obj);
                }

            } else if (isOrder(obj)) {

                const orderIndex = entries.orders
                    .findIndex((el) => el.id === obj.id);
                const isOrderFound = orderIndex !== -1;

                // const customerIndex = entries.customers
                //     .findIndex((el) => el.id === obj.customer_id);
                // const isCustomerFound = customerIndex !== -1;


                if (isOrderFound) {
                    await POST(`http://localhost:8888/orders-edit`, obj);
                } else {
                    await POST(`http://localhost:8888/orders-add`, obj);
                }
            } else if (isItem(obj)) {

                const itemIndex = entries.items
                    .findIndex((el) => el.id === obj.id);
                const isItemFound = itemIndex !== -1;

                if (isItemFound) {
                    await POST(`http://localhost:8888/items-edit`, obj);
                } else {
                    await POST(`http://localhost:8888/items-add`, obj);
                }
            } else if (isOrderItem(obj)) {

                const oiIndex = entries.items
                    .findIndex((el) => el.id === obj.id);
                const isOiFound = oiIndex !== -1;

                if (isOiFound) {
                    await POST(`http://localhost:8888/oi-edit`, obj);
                } else {
                    await POST(`http://localhost:8888/oi-add`, obj);
                }
            }

            return await fetchData();

        } catch (err) {
            throw err;
        }
    }
);

const dataSlice = createSlice({
    name: 'data-state',
    initialState,
    reducers: {
        toggleEditMode(state) {
            state.isEditMode = !state.isEditMode;
        },
        setSelections(state, action: PayloadAction<number[]>) {
            console.log(action.payload);
            state.selections = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<pageName>) {
            state.currentPage = action.payload;
        },
        setIsModal(state, action: PayloadAction<boolean>) {
            state.isModal = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataThunk.pending, (state) => {
                state.entries = initialState.entries;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDataThunk.fulfilled, (state, action) => {
                state.entries = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchDataThunk.rejected, (state, action) => {
                const error = action.error;
                state.isLoading = false;
                state.entries = initialState.entries;
                if (typeof error?.message === 'string') state.error = error.message;
                else state.error = 'FETCH_THUNK_ERROR!';
            })

            .addCase(deleteDataThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteDataThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.entries = action.payload;
            })
            .addCase(deleteDataThunk.rejected, (state, action) => {
                const error = action.error;
                state.isLoading = false;
                if (typeof error?.message === 'string') state.error = error.message;
                else state.error = 'DELETE_THUNK_ERROR!';
            })

            .addCase(editAddThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editAddThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.entries = action.payload;
                state.isEditMode = false;
            })
            .addCase(editAddThunk.rejected, (state, action) => {
                const error = action.error;
                state.isLoading = false;
                if (typeof error?.message === 'string') state.error = error.message;
                else state.error = 'CUSTOMER_THUNK_ERROR!';
            });

    }
});

export const {
    toggleEditMode,
    setSelections,
    setCurrentPage,
    setIsModal } = dataSlice.actions;

export default dataSlice.reducer;