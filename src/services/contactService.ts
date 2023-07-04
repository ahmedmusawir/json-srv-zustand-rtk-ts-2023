import { Contact, ContactSingle } from "../entities";
import APIClient from "../services/apiClientJsonSrv";

export const singleContactService = new APIClient<Contact>("/contacts");

export default new APIClient<Contact>("/contacts");
