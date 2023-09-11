import Contact from "../pages/Contact";
import Fleet from "../pages/Fleet";
import Home from "../pages/Home";

export const publicRoutes = [
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/fleet",
        element:<Fleet/>
    },
    {
        path:"/contact",
        element:<Contact/>
    },

]