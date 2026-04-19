import { Button } from "@/components/ui/button"
import { fetch_user_character } from "@/modules/character/services/characterApi"
import supabase from "@/utils/superbase"
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Home, Menu, Settings, SidebarClose, SidebarOpen, Sword, Target, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { handleLogout } from "@/modules/profile"
import { ProgressUser, type ICharacter } from "@/modules/character"
import { Skeleton } from "@/components/ui/skeleton"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { getExpNeededForLevel } from "@/utils/expNeedForLevel"
import { useCharacterStore } from "@/store/useCharacterStore"


const items = [
  { title: "Dashboard", url: "/main", icon: Home },
  { title: "Bosses", url: "/main/bosses/", icon: Sword },
  { title: "Tasks", url: "/main/tasks/", icon: Target },
]


export function AppSidebar({ currentPath, character, handleLogout }: { currentPath: string, character: ICharacter, handleLogout: void }) {
  const { open, setOpen } = useSidebar()
  const navigate = useNavigate()

  return (
    <>
      {/* Trigger для мобильных */}
      <div className="sm:hidden p-2 bg-zinc-900 flex justify-between items-center text-white">
        <SidebarTrigger onClick={() => setOpen(!open)}>
          <Menu size={24} />
        </SidebarTrigger>
      </div>

      <Sidebar
        // drawer для мобилки
        open={open}
        onOpenChange={setOpen}
        className="sm:w-64 sm:flex sm:flex-col [&>div]:bg-zinc-900 [&>div]:text-white border-r border-zinc-800"
      >
        {/* Header */}
        <SidebarHeader>
          <div className="flex items-center">
            <img src="../../public/img/favicon.png" className="w-15" alt="" />
            <div className="px-2 py-1 text-3xl font-jersey">Taskoria</div>
          </div>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-amber-50">Game</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-2 p-2 rounded text-lg font-tilt`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              {character ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <SidebarMenuButton>
                      <Avatar>
                        <AvatarImage src={character?.avatar} />
                      </Avatar>
                      {character?.username}
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                    <DropdownMenuItem onClick={() => handleLogout(navigate)}>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[50px]" />
                  </div>
                </div>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>

  )
}


const MainLayout = () => {
  const { fetchCharacter, character } = useCharacterStore()


  useEffect(() => {
    fetchCharacter()
  }, []);



  // const isLoggedIn = !!supabase.auth.getSession()
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        navigate('/auth')
      }
    }

    checkUser()
  }, [navigate])




  return (
    <SidebarProvider>
      <AppSidebar currentPath="/main" character={character} handleLogout={handleLogout} />


      <SidebarInset className="bg-transparent">
      <main className="text-amber-50 mt-10 pr-10">
        <Outlet />
      </main>
      </SidebarInset>

    </SidebarProvider>


  )
}

export default MainLayout

