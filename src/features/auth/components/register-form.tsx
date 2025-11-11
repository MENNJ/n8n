"use client";

import {zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
// import { authClient } from "@/lib/auth"


const registerschema = z.object({
  email: z.string().email("请输入正确的邮箱地址"),
  password: z.string().min(6,"密码长度不能小于6位"),
  confirmPassword: z.string().min(6,"密码长度不能小于6位"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword","password"],
  }
)

type RegisterFormValues = z.infer<typeof registerschema>;

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerschema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
      await authClient.signUp.email({
        name: values.email,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
            router.push("/");
        },
        onError: (ctx) => {
            toast.error(ctx.error.message);
        },
      })
  }
 
  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
        <Card>
            <CardHeader className="text-center">
                <CardTitle>注册</CardTitle>
                <CardDescription>请输入您的邮箱和密码</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-6"> 
                            <div className="flex flex-col gap-4">
                                <Button 
                                    variant="outline"
                                    className="w-full"
                                    type="button"
                                    disabled={isPending}
                                >
                                    <Image src="/image/github.svg" alt="github" width={20} height={20}/>
                                    Git Hub登录
                                </Button>
                                <Button 
                                    variant="outline"
                                    className="w-full"
                                    type="button"
                                    disabled={isPending}
                                >
                                    <Image src="/image/google.svg" alt="google" width={20} height={20}/>
                                    Google登录
                                </Button>
                            </div>
                            <div className="grid gap-6">
                                <FormField 
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>邮箱</FormLabel>
                                        <FormControl>
                                            <Input
                                             type="email"
                                             placeholder="请输入邮箱"
                                            {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>密码</FormLabel>
                                        <FormControl>
                                            <Input
                                             type="password"
                                             placeholder="请输入密码"
                                            {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>确认密码</FormLabel>
                                        <FormControl>
                                            <Input
                                             type="password"
                                             placeholder="请再次输入密码"
                                            {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <Button 
                                    type="submit"
                                    className="w-full"
                                    disabled={isPending}
                                >
                                    注册
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                            已经有账号了?<Link className="underline underline-offset-4" href="/login">登录</Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}