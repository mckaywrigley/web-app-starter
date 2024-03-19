import { googleSignIn, login, signup } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import Image from "next/image"

export default async function LoginPage({
  searchParams
}: {
  searchParams: { message: string }
}) {
  return (
    <form className="mt-20 w-full max-w-[400px] p-6">
      <div className="flex w-full items-center justify-center space-x-4">
        <Image
          className="size-12 rounded md:size-16"
          src="/logo.png"
          alt="logo"
          width={70}
          height={70}
        />

        <div className="text-center text-4xl font-bold md:text-5xl">
          Starter
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="space-y-1">
          <Label className="text-md font-bold" htmlFor="email">
            Email
          </Label>
          <Input id="email" name="email" type="email" />
        </div>

        <div className="space-y-1">
          <Label className="text-md font-bold" htmlFor="password">
            Password
          </Label>
          <Input id="password" name="password" type="password" />
        </div>
      </div>

      <div className="mt-8 flex flex-col space-y-3">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-500"
          formAction={login}
        >
          Login
        </Button>
        <Button formAction={signup}>Sign Up</Button>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center uppercase">
          <span className="bg-background text-muted-foreground px-2">OR</span>
        </div>
      </div>

      <Button
        formAction={googleSignIn}
        className="bg-foreground text-background w-full"
        variant="outline"
      >
        <IconBrandGoogleFilled className="mr-2 size-5" />
        Continue with Google
      </Button>

      {searchParams?.message && (
        <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  )
}
