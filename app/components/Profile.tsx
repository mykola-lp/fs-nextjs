import Image from "next/image"

const Profile = () => {
  return (
    <div>
      <Image
        src="/profile.jpg"
        width={200}
        height={200}
        alt="User profile"
      />
    </div>
  )
}

export default Profile
