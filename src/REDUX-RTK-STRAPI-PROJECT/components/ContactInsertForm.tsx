import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { Contact } from "../entities";
import {
  useCreateContactMutation,
  ContactInsert,
} from "../services/contactRTKApi";

const ContactInsertForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInsert>();

  const [createContact] = useCreateContactMutation();

  const onSubmit = (contact: ContactInsert) => {
    // const contactWithId = { ...contact, id: uuidv4() };
    // console.log(contactWithId);
    // addContact.mutate(contactWithId);
    createContact(contact);
    console.log("Contact Insert:", contact);
  };

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

export default ContactInsertForm;
