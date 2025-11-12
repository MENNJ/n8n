"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  import { authClient } from "@/lib/auth-client"

  interface UpgradeModalProps {
      open: boolean
      onOpenChange: (open: boolean) => void
  }

  export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
    return(
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>升级到专业版</AlertDialogTitle>
               <AlertDialogDescription>
                 升级到专业解锁所有功能
               </AlertDialogDescription>

            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={()=>authClient.checkout({slug:"Pro"})}>
                    去升级
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }