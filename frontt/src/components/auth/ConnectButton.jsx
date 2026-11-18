import React from 'react'

const ConnectButton = ({ disabled }) => {
    return (
        <button type="submit" disabled={disabled} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
        >
        Se connecter
      </button>
    )
}

export default ConnectButton
