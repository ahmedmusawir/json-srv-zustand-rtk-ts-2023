import { useEffect, useState } from "react";
import { CanceledError } from "../services/apiClient";
import userService, { User } from "../services/userService";

const useSingleUser = (id: string = "") => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const { request, cancel } = userService.get<User>(id);
    // console.log({ request });

    request
      .then((res) => {
        setUser(res.data);
        console.log("Single User Data:", res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    // Clean up
    return () => cancel();
  }, [id]);

  return { user, error, isLoading };
};

export default useSingleUser;
