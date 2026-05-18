import { ContentContext } from "../context/ContentContext";

const ContentProvider = ({ children }) => {

  // footer Content----------------------------------------------------------------------------------
  // contact info
  const contactInfo = {
    email: "rankeats@gmail.com",
    tel: "+1 (111) 111-1111",
    address: "San Francisco, CA 94102",
  }
  // social Link
  const socialLink = [
    { name: "facebook", href: "#", label: "Facebook" },
    { name: "instagram", href: "#", label: "Instagram" },
    { name: "twitter", href: "#", label: "Twitter / X" },
    { name: "youtube", href: "#", label: "YouTube" },
  ]
  // Form Emails
  const formEmails = {
    newsletter: {
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

  return (
    <ContentContext.Provider
      value={{
        // footer Content
        footerPackage,
        // footer Content

      }}
    >
      {children}
    </ContentContext.Provider>
  );
};



export default ContentProvider;