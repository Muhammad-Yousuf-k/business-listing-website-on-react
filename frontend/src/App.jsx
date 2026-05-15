import { Routes, Route } from "react-router-dom";

import Header from "./components/Header"

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

import Login from "./pages/authPages/Login";
import Register from "./pages/authPages/Register";
import VerifyOTP from "./pages/authPages/VerifyOTP";

import Dashboard from "./pages/dashboardPages/Dashboard";
import CreateListing from "./pages/dashboardPages/CreateListing";
import EditListing from "./pages/dashboardPages/EditListing";

import NotForLoggedUserRoute from "./routes/NotForLoggedUserRoute";
// import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import ListingManagement from "./pages/dashboardPages/ListingManagement";


const App = () => {

  const renderWithHeader = (Component) => {
    return (
      <>
        <Header />
        {Component}
      </>
    );
  };

  return (
    <>
      <Routes>

        {/* general route */}
        <Route path="/" element={
          renderWithHeader(<Home />)
        } />
        <Route path="/contact" element={
          renderWithHeader(<Contact />)
        } />
        <Route path="/search/" element={
          renderWithHeader(<Search />)
        } />

        {/* auth route */}
        <Route
          path="/login"
          element={
            <NotForLoggedUserRoute>
              {renderWithHeader(<Login />)}
            </NotForLoggedUserRoute>
          }
        />
        <Route
          path="/register"
          element={
            <NotForLoggedUserRoute>
              {renderWithHeader(<Register />)}
            </NotForLoggedUserRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <NotForLoggedUserRoute>
              {renderWithHeader(<VerifyOTP />)}
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
        <Route path="*" element={renderWithHeader(<NotFound />)} />


      </Routes>
    </>
  );
};

export default App;