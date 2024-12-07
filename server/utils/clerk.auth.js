import axios from "axios";

export const getClerkUser = async (userId) => {
  try {
    if (!userId) return false;
    const clerkResponse = await axios.get(
      `${process.env.CLERK_API_URL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    );

    return clerkResponse.data;
  } catch (error) {
    console.error("Error fetching Clerk user:", error.response?.data || error.message);
    return null;
  }
};
