import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import PageLoader from "./pages/PageLoader"
const Header = lazy(() => import("./components/Header"))
const Footer = lazy(() => import("./components/Footer"))

const Home = lazy(() => import("./pages/Home"))
const Contact = lazy(() => import("./pages/Contact"))
const Search = lazy(() => import("./pages/Search"))
const NotFound = lazy(() => import("./pages/NotFound"))

const Login = lazy(() => import("./pages/authPages/Login"))
const Register = lazy(() => import("./pages/authPages/Register"))
const VerifyOTP = lazy(() => import("./pages/authPages/VerifyOTP"))

import Dashboard from "./pages/dashboardPages/Dashboard";
import CreateListing from "./pages/dashboardPages/CreateListing";
import EditListing from "./pages/dashboardPages/EditListing";
import AdvertisePage from "./pages/AdvertisePage";
import Test from "./pages/test";
import ResetPassword from "./pages/authPages/ResetPassword";

import NotForLoggedUserRoute from "./routes/NotForLoggedUserRoute";
// import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import ListingManagement from "./pages/dashboardPages/ListingManagement";
import Account from "./pages/Account";
import ListingView from "./pages/ListingView";


const App = () => {

  const renderWithLayout = (Component) => {
    return (
      <>
        <Header />
        {Component}
        <Footer />
      </>
    );
  };

  return (
    <>

      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* general route */}
          <Route path="/" element={
            renderWithLayout(<Home />)
          } />
          <Route path="/search" element={
            renderWithLayout(<Search />)
          } />
          <Route path="/for-business" element={
            renderWithLayout(<AdvertisePage />)
          } />
          <Route path="/contact" element={
            renderWithLayout(<Contact />)
          } />
          <Route path="/account" element={
            renderWithLayout(<Account />)
          } />
          <Route path="/view/listing/:_id" element={
            renderWithLayout(<ListingView />)
          } />
          {/* <Route path="/test" element={
            renderWithLayout(<Test />)
          } /> */}

          {/* auth route */}
          <Route
            path="/login"
            element={
              <NotForLoggedUserRoute>
                {renderWithLayout(<Login />)}
              </NotForLoggedUserRoute>
            }
          />
          <Route
            path="/register"
            element={
              <NotForLoggedUserRoute>
                {renderWithLayout(<Register />)}
              </NotForLoggedUserRoute>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <NotForLoggedUserRoute>
                {renderWithLayout(<VerifyOTP />)}
              </NotForLoggedUserRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <NotForLoggedUserRoute>
                {renderWithLayout(<ResetPassword />)}
              </NotForLoggedUserRoute>
            }
          />

          {/* admin dashboard route */}
          <Route path="/admin/dashboard" element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              {<Dashboard />}
            </RoleProtectedRoute>
          } />

          {/* owner dashboard route */}
          <Route path="/owner/dashboard" element={
            <RoleProtectedRoute allowedRoles={["owner"]}>
              {<Dashboard />}
            </RoleProtectedRoute>
          } />

          <Route path="/owner/listing-management" element={
            <RoleProtectedRoute allowedRoles={["owner"]}>
              {<ListingManagement />}
            </RoleProtectedRoute>
          } />

          <Route path="/owner/listing/create" element={
            <RoleProtectedRoute allowedRoles={["owner"]}>
              {<CreateListing />}
            </RoleProtectedRoute>
          } />

          <Route path="/owner/listing/edit/:id" element={
            <RoleProtectedRoute allowedRoles={["owner"]}>
              {<EditListing />}
            </RoleProtectedRoute>
          } />

          {/* notfound route */}
          <Route path="*" element={renderWithLayout(<NotFound />)} />


        </Routes>
      </Suspense>
    </>
  );
};

export default App;