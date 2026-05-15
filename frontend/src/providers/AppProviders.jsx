import AuthProvider from "./AuthProvider.jsx";
import RestaurantProvider from "./RestaurantProvider.jsx";


const AppProviders = ({ children }) => (
    <AuthProvider>
        <RestaurantProvider>
            {children}
        </RestaurantProvider>
    </AuthProvider>

);

export default AppProviders;
