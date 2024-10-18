import { PacmanLoader } from "react-spinners"

const Loading = () => {
  return (
    <div className='m-10 flex justify-center max-w-9xl'>
        <PacmanLoader size={100} color="#d1e7dd"/>
    </div>
  )
}

export default Loading