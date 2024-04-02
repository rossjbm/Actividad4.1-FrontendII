import { useState, useEffect } from 'react';

//iconos
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";


export function ModoOscuro() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (<>
    <button onClick={() => setDarkMode(!darkMode)}  className='hover:bg-[#9C8C6D66] p-2 rounded-xl hidden lg:flex'>
      Modo {darkMode ? 'Claro' : 'Oscuro'}
    </button>
    <button onClick={() => setDarkMode(!darkMode)}  className='flex lg:hidden w-auto hover:bg-Verde-oscuro-800 dark:hover:bg-Verde-oscuro-400 active:bg-Verde-oscuro-800 dark:active:bg-Verde-claro-800 p-2 rounded-full'>
      {darkMode ? <FaSun className="text-4xl"/> : <BsFillMoonStarsFill className="text-4xl"/>}
    </button>
  </>);
}
