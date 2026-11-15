
import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import LoginForm from './LoginForm'
import { auth, logout } from './authService'
import './App.css'

// Generate a random codename
function generateCodename(): string {
  const adjectives = [
    'Sneaky',
    'Happy',
    'Clever',
    'Sleepy',
    'Funny',
    'Mighty',
    'Fluffy',
    'Crazy'
  ]

  const animals = [
    'Panda',
    'Tiger',
    'Fox',
    'Koala',
    'Penguin',
    'Rabbit',
    'Cat',
    'Wolf'
  ]

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]

  const randomAnimal =
    animals[Math.floor(Math.random() * animals.length)]

  const randomNumber = Math.floor(Math.random() * 90) + 10

  return randomAdjective + randomAnimal + randomNumber
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [codename, setCodename] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        const key = firebaseUser.uid
        let cachedName = localStorage.getItem(key)

        if (!cachedName) {
          cachedName = generateCodename()
          localStorage.setItem(key, cachedName)
        }

        setCodename(cachedName)
      } else {
        setCodename('')
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Codename Generator</h1>

        {user ? (
          <>
            <p>Kirjautunut: {user.email}</p>

            <h2>Tervetuloa, {codename}!</h2>

            <div className="codename">
              {codename}
            </div>

            <button onClick={() => void logout()}>
              Kirjaudu ulos
            </button>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
}

export default App
