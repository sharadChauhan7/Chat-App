import React,{useState} from 'react'

function Input() {
  // Handle the message input
  let [message, setMessage] = useState('');

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  // Send the message
  function sendMessage(e) {
    e.preventDefault();
    console.log(message);
    setMessage('');
    
  }

  return (
    <div className='w-full p-2 g-20 bg-slate-800'>
      <form className='rounded-3xl bg-white'>
        <input type='text' className=' w-10/12 h-10 border outline-none px-3 rounded-3xl' value={message} onChange={handleMessage} />
        <button type='submit' className='w-2/12 h-10 rounded-3xl bg-[#00ADB5]' onClick={sendMessage}>Send</button>
    </form>
    </div>
  )
}

export default Input