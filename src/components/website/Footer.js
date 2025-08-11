"use client";
import { useI18n } from "@/lib/i18n";

function Footer() {
  const { t } = useI18n();
  return (
    <footer className=" bg-gray-800 text-white py-12 px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Logo / Brand Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">{t("brand")}</h3>
          <p className="text-sm text-gray-600">{t("footer.tagline")}</p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold mb-3">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="https://wa.me/201278953422" className="hover:text-white">
                {t("footer.whatsapp")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                {t("footer.facebook")}
              </a>
            </li>
            <li>
              <a href="#">+201278953422</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-300 pt-6 text-sm text-gray-600 text-center">
        {t("footer.rights")}
      </div>
    </footer>
  );
}

export default Footer;
