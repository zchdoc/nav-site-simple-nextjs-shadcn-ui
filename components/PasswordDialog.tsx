// components/PasswordDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input" 
import { Button } from "@/components/ui/button"
import { UnlockIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

// 定义组件的 props 类型
interface PasswordDialogProps {
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
  password: string
  setPassword: (password: string) => void
  handlePasswordSubmit: () => void
}

export default function PasswordDialog({ 
  isDialogOpen, 
  setIsDialogOpen, 
  password, 
  setPassword, 
  handlePasswordSubmit 
}: PasswordDialogProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">验证码</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePasswordSubmit();
          }}
          className="space-y-4"
        >
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="h-10 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10 px-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
            <Button type="submit" className="h-10">
              <span className="text-base mr-2">确认</span>
              <UnlockIcon className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}