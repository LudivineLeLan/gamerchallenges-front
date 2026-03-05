import { Icon } from "@iconify/react";
import manette from "../../assets/images/manetteGC.png";

function Header() {
    return (
        <header className="w-auto mt-4 mx-4 bg-linear-to-t from-green-dark to-green-medium px-4 py-2 flex items-center justify-between rounded-full">

            {/* Logo + login */}
            <div className="flex items-center gap-4">
                <img
                    src={manette}
                    alt="manette"
                    className="w-18 h-18 object-contain -mt-4"
                />

                <a
                    href="/login"
                    className="text-white font-semibold hover:text-green-light transition"
                >
                    INSCRIPTION / CONNEXION
                </a>
            </div>

            {/* Links */}
            <nav className="flex gap-7 text-white font-semibold text-center">
                <a href="/games" className="hover:green-light">
                    JEUX
                </a>

                <a href="/challenges" className="hover:green-light">
                    CHALLENGES
                </a>

                <a href="/ranking" className="hover:green-light">
                    CLASSEMENT
                </a>
            </nav>

            {/* Searchbar */}
            <div className="flex items-center gap-3">

                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="px-4 py-2 rounded-full bg-gray-900 text-white placeholder-gray-400 outline-none"
                />

                <select className="px-3 py-2 rounded-full bg-gray-900 text-white">
                    <option>Jeux</option>
                    <option>Challenges</option>
                    <option>Joueurs</option>
                </select>

                <button className="bg-green-light w-10 h-10 flex items-center justify-center rounded-full">
                    <Icon icon="mdi:magnify" width="30" color="black" />
                </button>

            </div>
        </header>
    );
}

export default Header;