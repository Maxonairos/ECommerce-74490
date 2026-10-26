import { PacmanLoader } from "react-spinners"

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center py-10">
      <PacmanLoader size={100} color="#00916E" />
    </div>
  )
}

export default Loading
