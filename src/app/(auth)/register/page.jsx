import FormLoginAndRegister from "@/components/auth/FormLoginAndRegister"

export const metadata = {
    title: "Registro CiteApp",
    description: "App de citas para encontrar el amor",
};

export default function Register() {
    return <FormLoginAndRegister type="register" />
}