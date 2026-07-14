"use client";
import Modal from "./Modal";
import { useAuthModal } from "@/store/useAuthModalStore";
import Button from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface LoginValues {
  email: string;
  password: string;
}

type LoginErrors = Partial<Record<keyof LoginValues, string>>;

export default function LoginModal() {
  const { isLoginOpen, closeLogin, openRegister } = useAuthModal();

  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const newErrors: LoginErrors = {};

    if (!values.email.trim()) {
      newErrors.email = "L'email est obligatoire !";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Saisissez un email valide !";
    }

    if (!values.password.trim()) {
      newErrors.password = "Le mot de passe est obligatoire !";
    } else if (values.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères !";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast(error.message as string, {
          style: {
            background: "#044F9C",
            color: "white",
          },
        });
        return;
      }

      toast("Connexion réussie", {
        style: {
          background: "#044F9C",
          color: "white",
        },
      });
      setValues({ email: "", password: "" });
      closeLogin();
      router.refresh();
    } catch (error) {
      toast(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer.",
        {
          style: {
            background: "#044F9C",
            color: "white",
          },
        },
      );
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch {
      toast("Échec de la connexion Google", {
        style: {
          background: "#044F9C",
          color: "white",
        },
      });
    }
  };
  return (
    <Modal onClose={closeLogin} isOpen={isLoginOpen} title="Connexion">
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">
          Bienvenue chez Nazir Group
        </h2>
        <p className="text-sm text-gray-500">Connectez-vous à votre compte</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <Input
          name="email"
          label="Email"
          type="text"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Mot de passe"
          type="password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
        />
        <Button disabled={loading} loading={loading} type="submit">
          Continuer
        </Button>

        {/* divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4  text-gray-500">Ou</span>
          </div>
        </div>

        <Button
          onClick={signInWithGoogle}
          type="button"
          variant="outline"
          icon={<FcGoogle size={22} />}
        >
          Continuer avec Google
        </Button>

        {/* footer */}
        <p className="text-gray-500 text-center text-sm mt-6">
          Pas encore de compte ?{" "}
          <span
            onClick={openRegister}
            className="text-primary cursor-pointer font-semibold hover:underline"
          >
            S&apos;inscrire
          </span>
        </p>
      </form>
    </Modal>
  );
}
