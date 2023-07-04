import { useParams } from "react-router-dom";
import { Box, Container, Main } from "../components/layouts";
import useSingleContact from "../hooks/useSingleContact";
import useDeleteContact from "../hooks/useDeleteContact";
import Spinner from "./ui-ux/Spinner";
import { useForm } from "react-hook-form";
import { Contact } from "../entities";
import { useEffect, useState } from "react";
import useUpdateContact from "../hooks/useUpdateContact";

const ContactDetails = () => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { data: contact, isLoading, error } = useSingleContact(params.id);
  // const { contact } = data || {};
  // console.log("isEditing", isEditing);

  // EDITING CONTACT
  const { register, handleSubmit, setValue } = useForm<Contact>();
  const handleUpdate = useUpdateContact();

  useEffect(() => {
    if (contact) {
      setValue("firstName", contact.firstName || "");
      setValue("lastName", contact.lastName || "");
      setValue("email", contact.email || "");
      setValue("phone", contact.phone || "");
      setValue("companyName", contact.companyName || "");
    }
  }, [contact, setValue]);

  const onSubmit = (data: Contact) => {
    console.log(data);
    setIsEditing(false);
    // Call your update function here
    handleUpdate.mutate({
      id: params.id,
      updates: data,
    });
  };

  // DELETING CONTACT
  const { mutateAsync } = useDeleteContact();

  if (isLoading) return <Spinner />;

  if (error) return <h1>A Moose error has occured! </h1>;

  const deleteItem = async (id: string = "") => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await mutateAsync(id);
        console.log("Todo deleted successfully");
        // window.location.reload();
      } catch (err) {
        console.log("An error occurred:", err);
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  return (
    <Main>
      <Container FULL={false} pageTitle="Routing" className={""}>
        <Box className="p-7 prose max-w-none">
          <h3>
            <span className="font-extrabold text-primary">User ID:</span>{" "}
            {params.id}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="form-control">
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
                Company:{" "}
                <input
                  className="input input-primary"
                  {...register("companyName")}
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
            onClick={() => deleteItem(contact?.id)}
          >
            Delete
          </button>
        </Box>
      </Container>
    </Main>
  );
};

export default ContactDetails;
