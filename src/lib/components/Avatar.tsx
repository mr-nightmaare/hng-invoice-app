import avatarImg from "../assets/image-avatar.jpg";

const Avatar = () => {
  return (
    <div className=" shrink-0 border-0 border-l-[1px] border-[#494E6E] px-6 py-5 md:p-8 md:py-6 lg:border-l-0 lg:border-t-[1px]">
      <img
        className="inline-block aspect-square w-8 rounded-full lg:w-10"
        src={avatarImg.src}
        alt=""
      />
    </div>
  );
};

export default Avatar;
