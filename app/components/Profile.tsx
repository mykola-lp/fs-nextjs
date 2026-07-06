import Image from "next/image"

const Profile = () => {
  return (
    <div>
      <Image
        src="/profile.jpg"
        width={200}
        height={200}
        className="w-200 h-200"
        alt="User profile"
        priority
      />
    </div>
  )
}

export default Profile
