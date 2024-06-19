import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, editContact } from "./operations";
import { logOut } from "../auth/operations";

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
        updatingContact: null,
        isModalOpen: false,
    },
    reducers: {
        contactToUpdate(state, action) {
            state.updatingContact = action.payload;
            state.isModalOpen = true;
        },
        updatedContact(state) {
            state.updatingContact = null;
            state.isModalOpen = false;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(fetchContacts.pending, state => {
            state.error = false;
            state.loading = true;
            })
        .addCase(fetchContacts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        })
        .addCase(fetchContacts.rejected, state => {
            state.loading = false;
            state.error = true;
        })
        .addCase(addContact.pending, state => {
            state.error = false;
            state.loading = true;
            })
        .addCase(addContact.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.loading = false;
        })
        .addCase(addContact.rejected, state => {
            state.loading = false;
            state.error = true;
        })
        .addCase(deleteContact.pending, state => {
            state.error = false;
            state.loading = true;
            })
        .addCase(deleteContact.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            state.loading = false;
        })
        .addCase(deleteContact.rejected, state => {
            state.loading = false;
            state.error = true;
        }) 
         .addCase(editContact.pending, state => {
            state.loading = true;
            })
         .addCase(editContact.fulfilled, (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
            state.loading = false;
        })
            .addCase(editContact.rejected, state => {
            state.isLoading = false;
            state.error = null;
        })    
        .addCase(logOut.fulfilled, state => {
            state.items = [];
            state.loading = false;
            state.error = null;
        })
    }
});
export const { updatedContact, contactToUpdate } = contactsSlice.actions;
export default contactsSlice.reducer;