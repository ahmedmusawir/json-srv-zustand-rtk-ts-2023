onMutate: async ({ id, updates }) => {
  // 1. Cancel any outgoing queries for the contact data, so they don't override our optimistic update
  await queryClient.cancelQueries([CACHE_KEY_CONTACTS, id]);

  // 2. Get the current value (i.e., state before the update) of the contact data from the cache
  const previousContact =
    queryClient.getQueryData < Contact > [CACHE_KEY_CONTACTS, id];

  // 3. If the contact data is in the cache, optimistically update the cache to the new state
  if (previousContact) {
    queryClient.setQueryData([CACHE_KEY_CONTACTS, id], {
      ...previousContact, // Here we spread the previous state (i.e., keep all the old properties)
      ...updates, // And then we override with the new state (i.e., the updated properties)
    });
  }

  // 4. Return the previous contact state. This will be used as context in the `onError` and `onSuccess`
  // callbacks in case the mutation is not successful, to rollback to the previous state.
  return { previousContact };
};

/**
 * The onError function gets triggered if the mutation function (mutationFn) throws an error. It receives three arguments:

    err: This is the error that was thrown in the mutationFn. You can use it to handle the error or show some error message to the user.

    variables: This is the object of variables that you passed to the mutationFn. In your case, it would be the { id, updates } object that you pass when you call mutate({ id, updates }).

    context: This is the value that was returned from the onMutate function. In your case, it's the { previousContact } object. If onMutate doesn't return anything, context will be undefined.
 * 
    The onError function is used for handling errors and potentially rolling back optimistic updates. In your case, it's used to restore the original state of the contact data if the update fails.
 */

onError: (err, variables, context) => {
  // If the update failed and we have the previous contact state, roll back to it
  if (context?.previousContact) {
    queryClient.setQueryData(
      [CACHE_KEY_CONTACTS, variables.id],
      context.previousContact
    );
  }
};

/**
 * When an error is encountered during the mutation, the onError function is triggered. If there was a previous state for the contact data (i.e., context.previousContact is defined), it sets the query data for this contact back to its previous state, effectively rolling back the optimistic update. This ensures that the client state stays consistent with the server state even when mutations fail.

Remember that for onError to have a context, onMutate must return something. That's why we have return { previousContact }; at the end of onMutate. This previousContact can then be accessed in onError (and onSettled, if provided) as context.previousContact.
 */
