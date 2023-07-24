import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Main } from "../components/layouts";
import Spinner from "./ui-ux/Spinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Contact,
  useDeleteContactMutation,
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from "../services/contactRTKApi";

const ContactDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: singleContactData,
    isLoading,
    error,
  } = useGetSingleContactQuery(Number(params.id));
  // const { contact } = data || {};

  const contact = singleContactData?.data.attributes;
  const contactId = Number(params.id);
  // console.log("Single Contact", contact);

  // EDITING CONTACT
  const { register, handleSubmit, setValue } = useForm<Contact>();
  const [updateContact] = useUpdateContactMutation();

  useEffect(() => {
    if (contact) {
      setValue("firstName", contact.firstName || "");
      setValue("lastName", contact.lastName || "");
      setValue("email", contact.email || "");
      setValue("phone", contact.phone || "");
    }
  }, [contact, setValue]);

  const onSubmit = (data: Contact) => {
    console.log(data);
    setIsEditing(false);
    // Call your update function here
    updateContact({ contact: data, id: contactId });
  };

  // DELETING CONTACT
  // const contactId = Number(params.id);
  const [deleteContact] = useDeleteContactMutation();

  if (isLoading) return <Spinner />;

  if (error) return <h1>A Moose error has occured! </h1>;

  const deleteItem = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        deleteContact(contactId);
        console.log("Todo deleted successfully");
        navigate("/contacts");
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
            {/* <h3>
              <label>
                Company:{" "}
                <input
                  className="input input-primary"
                  {...register("companyName")}
                  disabled={!isEditing}
                />
              </label>
            </h3> */}
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
          <button className="btn btn-error" onClick={() => deleteItem()}>
            Delete
          </button>
        </Box>
      </Container>
    </Main>
  );
};

export default ContactDetails;
