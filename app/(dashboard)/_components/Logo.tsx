import Image from "next/image"
import img from "@/public/logo.svg"

const Logo = () => {
  return (
    <Image 
      height={130}
      width={130}
      alt="logo"
      src={img}
    />
  )
}

export default Logo