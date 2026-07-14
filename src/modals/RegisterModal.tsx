"use client";

import { useAuthModal } from "@/store/useAuthModalStore";
import Modal from "./Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface RegisterValues {
  name:string,
  email:string,
  password:string
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>

export default function RegisterModal() {
  const { isRegisterOpen, closeRegister, openLogin } = useAuthModal();
  const [values,setValues] = useState<RegisterValues>({
    name:"",
    email:"",
    password:""
  });

  const [errors,setErrors] = useState<RegisterErrors>({});
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;

    setValues((prev) => ({
      ...prev,
      [name]:value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]:undefined
    }))
  }

  const validate = () => {
    const newErrors: RegisterErrors = {};

    if(!values.name.trim()){
      newErrors.name = "Le nom est obligatoire !";
    } else if(values.name.length < 2){
      newErrors.name = "Le nom doit contenir au moins 2 caractères !";
    }

    if(!values.email.trim()){
      newErrors.email = "L'email est obligatoire !";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)){
      newErrors.email = "Saisissez un email valide !";
    }

    if(!values.password.trim()){
      newErrors.password = "Le mot de passe est obligatoire !";
    } else if (values.password.length < 6){
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères !";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const onSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(!validate()) return;

    setLoading(true);

    try {
      const {error} = await authClient.signUp.email({
        email:values.email,
        name:values.name,
        password:values.password
      });
      
      if(error){
        toast(error.message as string,{
           style:{
            background:"#044F9C",
            color:"white"
          }
        });
        return;
      }

      toast("Inscription réussie",{
           style:{
            background:"#044F9C",
            color:"white"
          }
        });
        setValues({name:"",email:"",password:""});
        closeRegister();
        router.refresh();
    } catch (error) {
      toast(
        error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",{
          style:{
            background:"#044F9C",
            color:"white"
          }
        }
      )      
    } finally {
      setLoading(false);
    }
  }

  const signInWithGoogle = async () =>{
      try {
        await authClient.signIn.social({
          provider:"google",
        })      
      } catch {
         toast("Échec de la connexion Google", {
          style: {
            background: "#044F9C",
            color: "white",
          },
        });      
      }
    }
  return (
    <Modal title="Inscription" isOpen={isRegisterOpen} onClose={closeRegister}>
      {/* header */}
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">
          Bienvenue chez Nazir Group
        </h2>
        <p className="text-sm text-gray-500">Créez un compte</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <Input
          name="name"
          label="Nom"
          type="text"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          name="email"
          label="Email"
          type="text"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          name="password"
          label="Mot de passe"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button disabled={loading} loading={loading} type="submit">Continuer</Button>

        {/* divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4  text-gray-500">Ou</span>
          </div>
        </div>

        <Button onClick={signInWithGoogle} type="button" variant="outline" icon={<FcGoogle size={22} />}>
          Continuer avec Google
        </Button>

        {/* footer */}
        <p className="text-gray-500 text-center text-sm mt-6">
          Vous avez déjà un compte ?{" "}
          <span
            onClick={openLogin}
            className="text-primary cursor-pointer font-semibold hover:underline"
          >
            Se connecter
          </span>
        </p>
      </form>
    </Modal>
  );
}
