import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { deleteUserAccount } from "@/services/supabaseService";
import { Language } from "@/utils/types";

const LANGUAGE_OPTIONS = [
  { value: Language.ENGLISH, label: "English" },
  { value: Language.SPANISH, label: "Español" },
  { value: Language.FRENCH, label: "Français" },
  { value: Language.GERMAN, label: "Deutsch" },
  { value: Language.CHINESE, label: "中文" },
];

export default function SettingsPage() {
  const { currentUser, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    toast({
      title: t("Language Updated"),
      description: t("Your language preference has been updated."),
    });
    // In a real application, we would use i18n library to change the language
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;

    if (confirmEmail !== currentUser.email) {
      toast({
        title: t("Error"),
        description: t("Email confirmation does not match"),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsDeleting(true);
      await deleteUserAccount();

      toast({
        title: t("Account Deleted"),
        description: t("Your account has been successfully deleted."),
      });

      await signOut(navigate);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: t("Error"),
        description: t("Failed to delete account. Please try again later."),
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDialogOpen(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        {t("Please log in to view settings.")}
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">{t("settings")}</h1>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("language")}</CardTitle>
            <CardDescription>
              {t("Change the display language for the application")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">{t("Display Language")}</Label>
                <Select
                  value={language}
                  onValueChange={(value) =>
                    handleLanguageChange(value as Language)
                  }
                >
                  <SelectTrigger className="w-full sm:w-[300px]">
                    <SelectValue placeholder={t("Select language")} />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dangerZone")}</CardTitle>
            <CardDescription>
              {t("Irreversible actions for your account")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border border-destructive rounded-md p-4">
                <h3 className="text-lg font-semibold text-destructive mb-2">
                  {t("deleteAccount")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(
                    "Once you delete your account, there is no going back. This action cannot be undone."
                  )}
                </p>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">{t("deleteAccount")}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("Are you absolutely sure?")}</DialogTitle>
                      <DialogDescription>
                        {t(
                          "This action cannot be undone. This will permanently delete your account and remove of your data from our servers."
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-muted-foreground">
                        {t("To confirm, please type your email address:")}
                      </p>
                      <Input
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        placeholder={currentUser.email || ""}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={
                          confirmEmail !== currentUser.email || isDeleting
                        }
                      >
                        {isDeleting ? t("Deleting...") : t("Delete Account")}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
