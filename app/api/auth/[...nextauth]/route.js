import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import User from "@models/user";

console.log(
    {
        clieinId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
)
const handeler =  NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID, // Fix the typo here
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session}){
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectDB();
    
                const userExists = await User.findOne({
                    email: profile.email
                });
    
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})
export { handeler as GET, handeler as POST };