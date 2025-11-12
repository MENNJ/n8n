"use client"

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
    const trpc = useTRPC();
    const textAI = useMutation(trpc.testAi.mutationOptions({
        onSuccess: () => {
            toast.success('订阅成功');
        },
        onError: ({message}) => {
            toast.error(message);
        }
    }));
    return(
        <Button onClick={() => textAI.mutate()}>
            点击测试订阅
        </Button>
    )
}

export default Page