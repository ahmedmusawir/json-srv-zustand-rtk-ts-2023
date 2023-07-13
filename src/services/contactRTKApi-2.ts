import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Locations {
  locationIds: string[];
}

export interface Role {
  id: number;
  type: string;
  role: string;
  locations: Locations;
}

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: Role;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination?: Pagination;
  [key: string]: any;
}

interface DataWrapper<T> {
  data: T;
  meta: Meta;
}

export type ContactData = {
  id: number;
  attributes: Contact;
};

export type ApiResponse = DataWrapper<{
  data: ContactData[];
}>;

const baseUrl = "http://localhost:1337";

const createApiPath = (path: string) => `/api/${path}`;

const makeApiCall = (url: string) => ({
  url,
  headers: { Bearer: process.env.Token },
});

export const contactRTKApi = createApi({
  reducerPath: "contactRTKApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllContacts: builder.query<ApiResponse, void>({
      query: () => makeApiCall(createApiPath("contacts")),
    }),
    getSingleContact: builder.query<ContactData, number>({
      query: (id) => makeApiCall(createApiPath(`contacts/${id}`)),
    }),
    // ...
  }),
});

export const { useGetAllContactsQuery, useGetSingleContactQuery } =
  contactRTKApi;
