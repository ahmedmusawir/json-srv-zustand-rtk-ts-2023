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

const makeApiCall = (url: string) => ({
  url,
});

const baseUrl = "http://localhost:1337";

export const contactRTKApi = createApi({
  reducerPath: "contactRTKApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllContacts: builder.query<ApiResponse, void>({
      query: () => makeApiCall(`/api/contacts`),
    }),
    getSingleContact: builder.query<ContactSingleData, number>({
      query: (id) => makeApiCall(`/api/contacts/${id}`),
    }),
    getProductCategories: builder.query<string[], void>({
      query: () => makeApiCall(`/Contacts/categories`),
    }),
    getProductByCategory: builder.query<ApiResponse, string>({
      query: (catName) => {
        // console.log('catName in RTK api', catName);
        return makeApiCall(`/Contacts/category/${catName}`);
      },
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useGetSingleContactQuery,
  useGetProductCategoriesQuery,
  useGetProductByCategoryQuery,
} = contactRTKApi;
