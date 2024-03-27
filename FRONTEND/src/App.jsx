import { Button } from "flowbite-react";
import { BiHappyBeaming } from "react-icons/bi";

function App() {

  return (
    <>
      <h1 className=' text-blue-700'>SOMOS RIGOPLANT</h1>
      <Button onClick={console.log('funcionoooo')}><BiHappyBeaming className="text-xl"/></Button>
    </>
  )
}

export default App
