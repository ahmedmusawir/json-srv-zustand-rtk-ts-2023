import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Locations {
  locationIds: string[];
}

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: {
    id: number;
    type: string;
    role: string;
    locations: Locations;
  };
}

export interface ContactData {
  id: number;
  attributes: Contact;
}

export interface ContactSingleData {
  data: {
    id: number;
    attributes: Contact;
  };
  meta: object;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface ApiResponse {
  data: ContactData[];
  meta: {
    pagination: Pagination;
  };
}

export interface ContactInsert {
  firstName: string;
  email: string;
}

const makeApiCall = (url: string) => ({
  url,
});

const baseUrl = "http://localhost:1337";

export const contactRTKApi = createApi({
  reducerPath: "contactRTKApi",
  tagTypes: ["contactRTKApi"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllContacts: builder.query<ApiResponse, void>({
      query: () => makeApiCall(`/api/contacts`),
      providesTags: [{ type: "contactRTKApi", id: "LIST" }],
    }),
    getSingleContact: builder.query<ContactSingleData, number>({
      query: (id) => makeApiCall(`/api/contacts/${id}`),
      providesTags: [{ type: "contactRTKApi", id: "LIST" }],
    }),
    createContact: builder.mutation<ContactSingleData, ContactInsert>({
      query: (contact) => ({
        url: "/api/contacts",
        method: "POST",
        // headers: { Authorization: `Bearer ${apiKey}` },
        body: {
          data: {
            ...contact,
          },
        },
      }),
      invalidatesTags: [{ type: "contactRTKApi", id: "LIST" }],
    }),
    deleteContact: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/contacts/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: [{ type: "contactRTKApi", id: "LIST" }],
    }),
    updateContact: builder.mutation<Contact, { contact: Contact; id: number }>({
      query: ({ contact, id }) => ({
        url: `/api/contacts/${id}`,
        method: "PUT",
        body: {
          data: {
            ...contact,
          },
        },
      }),
      invalidatesTags: [{ type: "contactRTKApi", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useGetSingleContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactRTKApi;
