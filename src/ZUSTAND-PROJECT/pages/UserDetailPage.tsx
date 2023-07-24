import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Main } from "../components/layouts";
import Spinner from "../components/ui-ux/Spinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { User } from "../services/userService";
import { useUserStore } from "../hooks/useUserStore";

const UserDetailPage = () => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // FETCHING SINGLE USER FROM ZUSTAND STORE HOOK
  // Following is an example of separating the states so that re-rendering is kept separate
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  const error = useUserStore((state) => state.error);
  const isLoading = useUserStore((state) => state.isLoading);

  useEffect(() => {
    fetchUser(params?.id || "");
  }, [fetchUser, params.id]);

  // EDITING CONTACT IN REACT HOOK FORM
  const { register, handleSubmit, setValue } = useForm<User>();
  // UPDATE USER IN ZUSTAND STORE HOOK
  const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("roles.role", user?.roles?.role || "");
    }
  }, [user, setValue]);

  const onSubmit = (user: User) => {
    setIsEditing(false);
    if (params.id) {
      const userWithId = { ...user, id: params.id };
      updateUser(userWithId);
    }
  };

  // DELETING A SINGLE USER FROM ZUSTAND STORE
  const deleteUser = useUserStore((state) => state.removeUser);

  const deleteItem = async (id: string = "") => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteUser(id);
        console.log("Todo deleted successfully");
        navigate("/users");
      } catch (err) {
        console.log("An error occurred:", err);
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  // if (isLoading) return <Spinner />;

  if (error) return <h1>A Moose error has occured! </h1>;

  if (!user) return <div>No user found</div>;

  return (
    <Main>
      <Container FULL={false} pageTitle="Routing" className={""}>
        {isLoading && <Spinner />}
        <Box className="p-7 prose max-w-none">
          <h3>
            <span className="font-extrabold text-primary">User ID:</span>{" "}
            {params.id}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="form-control">
            {/* <form className="form-control"> */}
            <h3>
              <label>
                First Name:{" "}
                <input
                  className="input input-primary"
                  {...register("firstName")}
                  disabled={!isEditing}
                />
              </label>
            </h3>
            <h3>
              <label>
                Last Name:{" "}
                <input
                  className="input input-primary"
                  {...register("lastName")}
                  disabled={!isEditing}
                />
              </label>
            </h3>
            <h3>
              <label>
                Email:{" "}
                <input
                  className="input input-primary"
                  {...register("email")}
                  disabled={!isEditing}
                />
              </label>
            </h3>
            <h3>
              <label>
                Phone:{" "}
                <input
                  className="input input-primary"
                  {...register("phone")}
                  disabled={!isEditing}
                />
              </label>
            </h3>
            <h3>
              <label>
                User Role:{" "}
                <input
                  className="input input-primary"
                  {...register("roles.role")}
                  disabled={!isEditing}
                />
              </label>
            </h3>
            {isEditing && (
              <button className="btn" type="submit">
                Save
              </button>
            )}
          </form>
          {!isEditing && (
            <div className="form-control">
              <button
                className="btn"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          )}
        </Box>
        <Box className="p-7 prose max-w-none">
          <button
            className="btn btn-error"
            onClick={() => deleteItem(user?.id)}
          >
            Delete
          </button>
        </Box>
      </Container>
    </Main>
  );
};

export default UserDetailPage;
