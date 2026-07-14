import Link from "next/link";
import { MdOutlineHomeWork } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto w-[95%] md:w-[90%] max-w-7xl py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* marque */}
          <div className="max-w-sm space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <MdOutlineHomeWork className="text-primary" size={28} />
              <span className="text-lg font-bold text-primary tracking-tight">
                Sidy&nbsp;Immobilier
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Locations de vacances et résidences partout au Sénégal — de Dakar
              à la Casamance, trouvez le logement qui vous ressemble.
            </p>
          </div>

          {/* liens */}
          <div className="grid grid-cols-2 gap-10 text-sm">
            <div className="space-y-3">
              <p className="font-semibold text-gray-900">Découvrir</p>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <Link href="/?locationValue=dakar-plateau" className="hover:text-primary">
                    Dakar
                  </Link>
                </li>
                <li>
                  <Link href="/?locationValue=saly" className="hover:text-primary">
                    Saly
                  </Link>
                </li>
                <li>
                  <Link href="/?locationValue=saint-louis" className="hover:text-primary">
                    Saint-Louis
                  </Link>
                </li>
                <li>
                  <Link href="/?locationValue=cap-skirring" className="hover:text-primary">
                    Cap Skirring
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-semibold text-gray-900">Sidy Immobilier</p>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Toutes les annonces
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" className="hover:text-primary">
                    Mes favoris
                  </Link>
                </li>
                <li>
                  <Link href="/trips" className="hover:text-primary">
                    Mes voyages
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Sidy Immobilier — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
