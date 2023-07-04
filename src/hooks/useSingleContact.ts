import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_CONTACTS, Contact } from "../entities";
import { singleContactService } from "../services/contactService";

const useSingleContact = (id: string = "") =>
  useQuery<Contact | null, Error>({
    // queryKey: ["contact", id],
    queryKey: [CACHE_KEY_CONTACTS, id],
    queryFn: () => singleContactService.get(id),
    enabled: !!id,
    staleTime: ms("2m"), // 2 minutes
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // retry: false,
  });

export default useSingleContact;
