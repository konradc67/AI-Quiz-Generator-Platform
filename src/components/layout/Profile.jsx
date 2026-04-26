import { useEffect, useState } from "react";


export default function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("accessToken");

            try {
                const response = await fetch("/api/user/profile/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    console.error("Error:", data);
                }
            } catch (err) {
                console.error("Connection error:", err);
            }
        };

        fetchProfile();
    }, []);

    return (<div className="profile-card">
        <h2>Profile</h2>
        {user ? (
            <>
                <p><b>Username:</b> {user.username}</p>
                <p><b>First name:</b> {user.first_name}</p>
                <p><b>Last name:</b> {user.last_name}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Country:</b> {user.country}</p>
                <p><b>Role:</b> {user.role}</p>
            </>):(<p>Loading...</p>)}
    </div>)
}