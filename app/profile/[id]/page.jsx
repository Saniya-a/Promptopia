"use client";

import { useEffect, useState } from "react";
import {  useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    debugger
    const promptId = params.id;
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${promptId}/posts`);
        const data = await response.json();

        setMyPosts(data);
    };

    if (promptId) fetchPosts();
    }, []);


    return (
    <Profile
        name={userName + "'s"} 
        desc={"Welcome to " + userName + "'s personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination."}
        data={myPosts}
    />
    );
};

export default UserProfile;