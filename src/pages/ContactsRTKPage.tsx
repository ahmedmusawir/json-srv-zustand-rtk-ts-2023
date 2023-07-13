import { Outlet } from "react-router-dom";
import ContactsList from "../components/ContactsList";
import { Container, Row, Box } from "../components/layouts";
import Spinner from "../components/ui-ux/Spinner";
import { animated, useSpring } from "react-spring";
import { useState } from "react";
import { useGetAllContactsQuery } from "../services/contactRTKApi";
import ContactInsertForm from "../components/ContactInsertForm";

const ContactsRTKPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: apiResponse, isLoading, error } = useGetAllContactsQuery();

  console.log("API Response Data:", apiResponse);

  const contacts = apiResponse?.data;
  console.log("Contacts:", contacts);

  const styles = useSpring({
    to: async (next, cancel) => {
      if (isOpen) {
        await next({ display: "block" });
        await next({ opacity: 1, maxHeight: 1000 });
      } else {
        await next({ opacity: 0, maxHeight: 0 });
        await next({ display: "none" });
      }
    },
    from: { opacity: 0, maxHeight: 0, display: "none" },
  });

  if (isLoading) return <Spinner />;

  if (error) return <h1>A Moose error has occured! </h1>;

  const openInsertContact = () => {
    // console.log("Open Insert");
    setIsOpen((prev) => prev !== true);
  };

  return (
    <Container className={""} FULL={false} pageTitle={"Contacts"}>
      <Row className={"prose flex justify-between"}>
        <div className="header-text">
          <h1 className="h1">Strapi Contacts + RTK Query (Redux)</h1>
          <h4 className="h2">Strapi v4 & Redux 8.1.1 & RTK 1.9.5</h4>
        </div>
        <button
          className="btn btn-primary my-5 btn-wide btn-lg"
          type="button"
          onClick={openInsertContact}
        >
          {isOpen ? "Close Form" : "Add Contact"}
        </button>
      </Row>
      {/* <Row className={isOpen ? "prose max-w-none" : "prose max-w-none hidden"}> */}
      <animated.div style={styles}>
        {/* <Row className={`prose max-w-none ${isOpen ? "" : "hidden"}`}> */}
        <Row className={`prose max-w-none`}>
          <h2 className="h1">Insert Contacts</h2>
          <hr />
          <Box className="card-normal bg-base-100 shadow-xl px-10">
            <ContactInsertForm />
          </Box>
        </Row>
      </animated.div>
      <Row className={"grid gap-3 grid-auto-fit p-1"}>
        <Box className={""}>
          <ContactsList contacts={contacts} />
        </Box>
        <Box className={"border bg-gray-100"}>
          <Outlet />
        </Box>
      </Row>
    </Container>
  );
};

export default ContactsRTKPage;
