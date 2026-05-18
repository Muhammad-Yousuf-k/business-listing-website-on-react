import AuthProvider from "./AuthProvider.jsx";
import RestaurantProvider from "./RestaurantProvider.jsx";
import ContentProvider from "./ContentProvider.jsx";


const AppProviders = ({ children }) => (
    <AuthProvider>
        <RestaurantProvider>
            <ContentProvider>
                {children}
            </ContentProvider>
        </RestaurantProvider>
    </AuthProvider>

);

export default AppProviders;
