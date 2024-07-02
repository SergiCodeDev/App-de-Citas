import FormLoginAndRegister from "@/components/auth/FormLoginAndRegister"

export const metadata = {
    title: "Login CiteApp",
    description: "App de citas para encontrar el amor",
};

export default function Login() {
    return <FormLoginAndRegister type="login" />
}