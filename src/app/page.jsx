import FormLoginAndRegister from "@/components/auth/FormLoginAndRegister";


export default function Home() {
  return (
    <main className="w-full min-h-[calc(100lvh-60px)] flex items-center justify-center bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50">
      <div className="flex flex-row items-center gap-14">
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold">CiteAPP conoce tu pareja perfecta</h1>
        </div>
        <div className="flex-1">
          <FormLoginAndRegister type="login" />
        </div>
      </div>

    </main>
  );
}
