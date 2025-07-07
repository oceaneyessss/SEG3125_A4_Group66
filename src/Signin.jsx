import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function SignIn() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!account.trim() || !password.trim()) {
      setError(true)
    } else {
      navigate('/appointment-member')
    }
  }

  return (
    <div>
      <h1
        className="text-center"
        style={{
          color: '#800000',
          fontFamily: 'Verdana',
          fontSize: '30px',
          marginTop: '120px',
        }}
      >
        Log in
      </h1>

      <div
        style={{
          height: '80%',
          width: '50%',
          margin: '0 auto 25px',
        }}
      >
        <form autoComplete="off">
          <div style={{ marginTop: '3%' }}>
            <div
              className="mb-3"
              style={{ width: '50%', margin: '0 auto' }}
            >
              <label htmlFor="account" className="form-label">
                Account
              </label>
              <div className="input-group">
                <input
                  id="account"
                  type="text"
                  className="form-control"
                  value={account}
                  onChange={e => setAccount(e.target.value)}
                />
              </div>
            </div>

            <div
              className="mb-3"
              style={{ width: '50%', margin: '0 auto' }}
            >
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div
              className="text-center"
              style={{
                color: 'red',
                fontSize: '0.9rem',
                marginBottom: '12px',
              }}
            >
              The field cannot be empty!
            </div>
          )}

          <div className="text-center" style={{ marginTop: '7%' }}>
            <button
              type="button"
              className="rounded-pill btn btn-primary"
              style={{ width: '55%' }}
              onClick={handleLogin}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}