import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { User } from "../services/userService";
import { useUserStore } from "../hooks/useUserStore";

const UserInsertForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  // const { addUser, error, isLoading } = useAddUser();

  // FETCHING SINGLE USER FROM ZUSTAND STORE HOOK
  // Following is an example of separating the states so that re-rendering is kept separate
  const addUser = useUserStore((state) => state.addUser);
  const user = useUserStore((state) => state.user);
  const error = useUserStore((state) => state.error);
  const isLoading = useUserStore((state) => state.isLoading);

  const onSubmit = (user: User) => {
    const contactWithId = { ...user, id: uuidv4() };
    // console.log(contactWithId);
    addUser(contactWithId);
  };

  if (error) return <h1>A Moose error has occured! </h1>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label>First Name</label>
        <input
          className="input input-primary"
          {...register("firstName", { required: "This field is required" })}
        />
        {errors.firstName && (
          <p className="text-error">{errors.firstName.message}</p>
        )}
      </div>

      {/* <div className="form-control">
        <label>Last Name</label>
        <input
          className="input input-primary"
          {...register("lastName", { required: "This field is required" })}
        />
        {errors.lastName && (
          <p className="text-error">{errors.lastName.message}</p>
        )}
      </div> */}

      <div className="form-control">
        <label>Email</label>
        <input
          className="input input-primary"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "The email address is not valid",
            },
          })}
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
      </div>

      {/* <div className="form-control">
        <label>Phone</label>
        <input
          className="input input-primary"
          {...register("phone", { required: "This field is required" })}
        />
        {errors.phone && <p className="text-error">{errors.phone.message}</p>}
      </div> */}

      {/* <div className="form-control">
        <label>Company</label>
        <input
          className="input input-primary"
          {...register("companyName", { required: "This field is required" })}
        />
        {errors.companyName && (
          <p className="text-error">{errors.companyName.message}</p>
        )}
      </div> */}

      <button className="btn btn-primary my-5 btn-wide btn-lg" type="submit">
        Submit
      </button>
    </form>
  );
};

export default UserInsertForm;
