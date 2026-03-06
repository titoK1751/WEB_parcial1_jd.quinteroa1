import Link from "next/link";

interface Route {
    name: string;
    path: string;
}

const Header = ({ routes }: { routes: Route[]}) => {
    return (
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href = "/actors" className = "flex items-center space-x-3">
            <span className= "text-2xl font-semibold">Parcial 1 - Actors</span>
            </Link>
            <nav>
                {routes.map((route) => (
                    <Link
                     key = {route.path}
                     href = {route.path}
                     className = "px-3 hover:text-gray-300"
                    >
                      {route.name}  
                    </Link>
                ))}
            </nav>
          </div>  
        </header>
    );
};

export default Header;