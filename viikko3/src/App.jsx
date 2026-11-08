
import { useState } from 'react'
import './App.css'

// Generate a random codename
function generateCodename() {
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [codename, setCodename] = useState('')

  // Handle user login
  function handleLogin() {
    let cachedName = localStorage.getItem('codename')

    if (!cachedName) {
      cachedName = generateCodename()
      localStorage.setItem('codename', cachedName)
    }

    setCodename(cachedName)
    setIsLoggedIn(true)
  }

  // Handle user logout
  function handleLogout() {
    setIsLoggedIn(false)
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Codename Generator</h1>

        {!isLoggedIn ? (
          <>
            <p>Welcome! Click the button to log in.</p>

            <button onClick={handleLogin}>
              Log in
            </button>
          </>
        ) : (
          <>
            <p>Welcome back!</p>

            <h2>Your codename is:</h2>

            <div className="codename">
              {codename}
            </div>

            <button onClick={handleLogout}>
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App
