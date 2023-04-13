import React from 'react'

const ShowMessage = ({ avg }) => {
   let message = {
      text : 'Thank You',
      emoji : '🎉'}
   return (
      <>
         <h1 className='emoji' style={{"width":"100%","text-align":"center"}}>{message.emoji}</h1>
         <h1 style={{"width":"100%","text-align":"center"}}>{message.text}</h1>
      </>
   )
}

export default ShowMessage
