import connectToDatabase from "@/libs/db"

const Homepage = async () => {
  await connectToDatabase()
  return (
    <div>Hello World!</div>
  )
}
export default Homepage