import FormLoginAndRegister from "@/components/auth/FormLoginAndRegister"

export const metadata = {
    title: "Login CiteApp",
    description: "App de citas para encontrar el amor",
};

export default function Login() {
    return (
        <main className="w-full min-h-[calc(100lvh-60px)] flex items-center justify-center bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50">
            <div className="w-1/3 max-sm:w-5/6 max-lg:w-2/3 max-xl:w-1/2 max-sm:my-4 my-12">
                <FormLoginAndRegister type="login" />
            </div>
        </main>
    )
}