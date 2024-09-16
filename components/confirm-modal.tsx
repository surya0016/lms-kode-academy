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


interface ConfirmModalProps {
  children: React.ReactNode
  onConfirm: ()=>void
}

const ConfirmModal = ({
  children,
  onConfirm
}:ConfirmModalProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-red-500">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-800" onClick={onConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ConfirmModal