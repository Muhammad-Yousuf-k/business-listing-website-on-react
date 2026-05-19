import { ContentContext } from "../context/ContentContext";

const ContentProvider = ({ children }) => {

  // footer Content----------------------------------------------------------------------------------
  // contact info
  const contactInfo = {
    email: "rankeats@gmail.com",
    tel: "+1 (111) 111-1111",
    telLink: "+11111111111",
    address: "San Francisco, CA 94102",
    googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019565!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus",
  }
  // social Link
  const socialLink = [
    { name: "facebook", to: "#", label: "Facebook" },
    { name: "instagram", to: "#", label: "Instagram" },
    { name: "twitter", to: "#", label: "Twitter / X" },
    { name: "youtube", to: "#", label: "YouTube" },
  ]
  // Form Emails
  const formEmails = {
    newsletter: {
      to: "rankeats@gmail.com",
      from: "rankeats@gmail.com"
    },
    contactForm: {
      to: "rankeats@gmail.com",
      from: "rankeats@gmail.com"
    },
  }

  const navColLink = [
    {
      heading: "Quick Link",
      links: [
        { label: "Home", to: "/" },
        { label: "Browse by State", to: "/search?source=state" },
        { label: "For Business", to: "/for-business" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      heading: "Business",
      links: [
        { label: "Advertise", to: "/for-business" },
        { label: "Add a Listing", to: "/owner/listing/create" },
        { label: "Owner Dashboard", to: "/owner/dashboard" },
        { label: "Pricing", to: "/for-business#pricing" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Contact", to: "/contact" },
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms of Use", to: "/terms" },
        { label: "Cookie Policy", to: "/cookies" },
      ],
    },
  ]

  const TopStates = [
    "New York", "California", "Texas", "Florida", "Illinois",
    "Georgia", "Pennsylvania", "Ohio", "Arizona", "Michigan",
  ]
  // ---------------------------------------------------------------------------------------


  // CreatePackage-----------------------------------------------------------------------------
  const footerPackage = {
    contactInfo: contactInfo,
    socialLink: socialLink,
    formEmails: formEmails,
    navColLink: navColLink,
    TopStates: TopStates,

  }
  const ContactPagePackage = {
    contactInfo: contactInfo,
    socialLink: socialLink,
    formEmails: formEmails,

  }

  return (
    <ContentContext.Provider
      value={{
        footerPackage,
        ContactPagePackage,

      }}
    >
      {children}
    </ContentContext.Provider>
  );
};



export default ContentProvider;