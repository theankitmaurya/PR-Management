import React, { createContext, useContext, useState } from "react";
import { Language } from "@/utils/types";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Add translations for different languages
const translations: Record<Language, Record<string, string>> = {
  [Language.ENGLISH]: {
    dashboard: "Dashboard",
    projects: "Projects",
    tasks: "Tasks",
    team: "Team",
    settings: "Settings",
    profile: "Profile",
    deleteAccount: "Delete Account",
    language: "Language",
    dangerZone: "Danger Zone",
    confirmDelete: "Are you absolutely sure?",
    deleteWarning:
      "This action cannot be undone. This will permanently delete your account and remove all of your data from our servers.",
    cancel: "Cancel",
    delete: "Delete",
    confirmEmail: "To confirm, please type your email address:",
  },
  [Language.SPANISH]: {
    dashboard: "Panel",
    projects: "Proyectos",
    tasks: "Tareas",
    team: "Equipo",
    settings: "Ajustes",
    profile: "Perfil",
    deleteAccount: "Eliminar Cuenta",
    language: "Idioma",
    dangerZone: "Zona de Peligro",
    confirmDelete: "¿Estás completamente seguro?",
    deleteWarning:
      "Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y todos tus datos de nuestros servidores.",
    cancel: "Cancelar",
    delete: "Eliminar",
    confirmEmail:
      "Para confirmar, por favor escribe tu dirección de correo electrónico:",
  },
  [Language.FRENCH]: {
    dashboard: "Tableau de Bord",
    projects: "Projets",
    tasks: "Tâches",
    team: "Équipe",
    settings: "Paramètres",
    profile: "Profil",
    deleteAccount: "Supprimer le Compte",
    language: "Langue",
    dangerZone: "Zone Dangereuse",
    confirmDelete: "Êtes-vous absolument sûr ?",
    deleteWarning:
      "Cette action ne peut pas être annulée. Cela supprimera définitivement votre compte et toutes vos données de nos serveurs.",
    cancel: "Annuler",
    delete: "Supprimer",
    confirmEmail: "Pour confirmer, veuillez saisir votre adresse e-mail :",
  },
  [Language.GERMAN]: {
    dashboard: "Dashboard",
    projects: "Projekte",
    tasks: "Aufgaben",
    team: "Team",
    settings: "Einstellungen",
    profile: "Profil",
    deleteAccount: "Konto Löschen",
    language: "Sprache",
    dangerZone: "Gefahrenzone",
    confirmDelete: "Sind Sie absolut sicher?",
    deleteWarning:
      "Diese Aktion kann nicht rückgängig gemacht werden. Dies wird Ihr Konto und alle Ihre Daten von unseren Servern permanent löschen.",
    cancel: "Abbrechen",
    delete: "Löschen",
    confirmEmail: "Zur Bestätigung geben Sie bitte Ihre E-Mail-Adresse ein:",
  },
  [Language.CHINESE]: {
    dashboard: "仪表板",
    projects: "项目",
    tasks: "任务",
    team: "团队",
    settings: "设置",
    profile: "个人资料",
    deleteAccount: "删除账户",
    language: "语言",
    dangerZone: "危险区域",
    confirmDelete: "您确定要这样做吗？",
    deleteWarning:
      "此操作无法撤销。这将永久删除您的帐户并从我们的服务器中删除所有数据。",
    cancel: "取消",
    delete: "删除",
    confirmEmail: "要确认，请输入您的电子邮件地址：",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
