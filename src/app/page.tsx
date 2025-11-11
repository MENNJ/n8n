import {LogoutButton} from "@/app/logout";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";


const Page = async () =>{
  await requireAuth();
  const user = await caller.getUsers();
  return (
   <div className="min-h-svh min-w-svw flex flex-col justify-center items-center">
    {JSON.stringify(user)}
    <div><LogoutButton/></div>
   </div>
  );
}
export default Page