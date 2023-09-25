import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full relative px-10'>
      <h1 className=' pt-10 font-extrabold text-4xl text-left z-10'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left z-10'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;