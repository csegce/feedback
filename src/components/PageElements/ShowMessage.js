import React from 'react'

const ShowMessage = ({ avg }) => {
   let message = {
      text : 'Thank You',
      emoji : '🎉'}
   return (
      <>
         <h1 className='emoji'>{message.emoji}</h1>
         <h1>{message.text}</h1>
      </>
   )
}

export default ShowMessage
