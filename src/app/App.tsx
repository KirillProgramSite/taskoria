import LoginPage from '@/pages/LoginPage'
import './App.css'
import AuthPage from '@/pages/AuthPage'
import { Route, Routes } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import EmailConfimPage from '@/pages/EmailConfim'
import CreateCharacter from '@/pages/CreateCharacter'
import { SidebarProvider } from '@/components/ui/sidebar'
import MainLayout from '@/layouts/MainLayout'
import TasksPage from '@/pages/TasksPage'
import BossesPage from '@/pages/BossesPage'
import { useEffect } from 'react'
import { useCharacterStore } from '@/store/useCharacterStore'
import { useTasksStore } from '@/store/useTasksStore'

function App() {
  const {fetchCharacter} = useCharacterStore()
  const {fetchTasks} = useTasksStore()

  useEffect(() => {
    fetchCharacter()
    fetchTasks()
  }, [fetchCharacter]);

  return (

    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/email-confim' element={<EmailConfimPage />} />
      <Route path='/create-character' element={<CreateCharacter />} />

      <Route path='/main' element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path='tasks' element={<TasksPage />} />
        <Route path='bosses' element={<BossesPage />} />
      </Route>
    </Routes>

  )
}

export default App
