import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_CONTACTS, UpdateContactParams } from "../entities";
import contactService from "../services/contactService";

const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: UpdateContactParams) =>
      contactService.patch(id!, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries([CACHE_KEY_CONTACTS, id]);

      const previousContact = queryClient.getQueryData([
        CACHE_KEY_CONTACTS,
        id,
      ]);

      if (previousContact) {
        queryClient.setQueryData([CACHE_KEY_CONTACTS, id], {
          ...previousContact,
          ...updates,
        });
      }

      return { previousContact };
    },
    onError: (err, variables, context) => {
      if (context?.previousContact) {
        queryClient.setQueryData(
          [CACHE_KEY_CONTACTS, variables.id],
          context.previousContact
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([CACHE_KEY_CONTACTS, "all"]);
    },
  });
};

export default useUpdateContact;
