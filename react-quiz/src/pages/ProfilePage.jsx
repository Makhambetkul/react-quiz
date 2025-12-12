import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { saveUserAvatar } from "../services/profileService";
import { setAvatar } from "../store/authSlice";
import "../styles/Profile.css";

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const avatarUrl = useSelector((state) => state.auth.avatarUrl);

  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);

  if (!user) return <p>Loading...</p>;

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result; 

    
      const { avatarUrl: savedUrl, version } =
        await saveUserAvatar(user.uid, base64);

      
      const freshUrl = `${savedUrl}?v=${version}`;
      dispatch(setAvatar(freshUrl));

      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <div className="avatar-section">
        <img
          src={avatarUrl || "/default-avatar.png"}
          alt="avatar"
          className="avatar-img"
        />

        <button
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload New Photo"}
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleAvatarUpload}
        />
      </div>
    </div>
  );
}
