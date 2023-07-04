import { useState } from "react";
import userService, { User } from "../services/userService";

const useUpdateUser = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = async (user: User) => {
    setIsLoading(true);
    try {
      await userService.update(user);
      setIsLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    }
  };

  return { updateUser, error, isLoading };
};

export default useUpdateUser;
