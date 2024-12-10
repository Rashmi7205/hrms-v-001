import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="w-screen h-screen fixed top-0 flex items-center justify-center">
      <SignIn />
    </div>
  );
}
