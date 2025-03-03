import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Settings: "Settings",
      "Language Settings": "Language Settings",
      "Change the display language for the application":
        "Change the display language for the application",
      "Display Language": "Display Language",
      "Danger Zone": "Danger Zone",
      "Delete Account": "Delete Account",
      "Irreversible actions for your account":
        "Irreversible actions for your account",
      "Once you delete your account, there is no going back.":
        "Once you delete your account, there is no going back.",
      "Please log in to view settings.": "Please log in to view settings.",
    },
  },
  es: {
    translation: {
      Settings: "Configuración",
      "Language Settings": "Configuración de idioma",
      "Change the display language for the application":
        "Cambie el idioma de visualización de la aplicación",
      "Display Language": "Idioma de visualización",
      "Danger Zone": "Zona de peligro",
      "Delete Account": "Eliminar cuenta",
      "Irreversible actions for your account":
        "Acciones irreversibles para su cuenta",
      "Once you delete your account, there is no going back.":
        "Una vez que elimine su cuenta, no hay vuelta atrás.",
      "Please log in to view settings.":
        "Inicie sesión para ver la configuración.",
    },
  },
  fr: {
    translation: {
      Settings: "Paramètres",
      "Language Settings": "Paramètres de langue",
      "Change the display language for the application":
        "Changer la langue d'affichage de l'application",
      "Display Language": "Langue d'affichage",
      "Danger Zone": "Zone dangereuse",
      "Delete Account": "Supprimer le compte",
      "Irreversible actions for your account":
        "Actions irréversibles pour votre compte",
      "Once you delete your account, there is no going back.":
        "Une fois votre compte supprimé, il n'y a pas de retour en arrière.",
      "Please log in to view settings.":
        "Veuillez vous connecter pour voir les paramètres.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already protects from XSS
  },
});

export default i18n;
