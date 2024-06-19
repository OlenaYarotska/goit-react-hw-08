import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.loading;
export const selectIsError = state => state.contacts.error;
export const selectIsModalOpen = state => state.contacts.isModalOpen;
export const selectUpdatedContact = state => state.contacts.updatingContact;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, filteredNames) => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filteredNames.toLowerCase()) ||
            contact.number.includes(filteredNames));
    }
);
