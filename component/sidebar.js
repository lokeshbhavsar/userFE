import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"; // Next.js Link component for routing
import Image from "next/image"; // Next.js Image component for optimized images
import logo from "../public/images/logos/dark-logo.svg"; // Update path to match Next.js
import { useSelector } from "react-redux";

export default function Sidebar() {
  useEffect(() => {
    const $button = document.querySelector("#sidebar-toggle");
    const $wrapper = document.querySelector("#wrapper");

    const handleToggle = (e) => {
      e.preventDefault();
      $wrapper.classList.toggle("toggled");
    };

    if ($button) {
      $button.addEventListener("click", handleToggle);
    }

    // Cleanup event listener on unmount
    return () => {
      if ($button) {
        $button.removeEventListener("click", handleToggle);
      }
    };
  }, []);

  // Assuming you have username available via some state management
  const { username } = useSelector((state) => state?.user);

  return (
    <>
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <Image src={logo} width={180} alt="logo" /> {/* Optimized Image handling in Next.js */}
        </div>
        <ul className="sidebar-nav">
          <li>
            <Link href="/dashboard" className="sidebar-link">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link href={`/profile/${username}`} className="sidebar-link">
              <FontAwesomeIcon icon={faHome} /> Profile
            </Link>
          </li>
          <li>
            <Link href="/login" className="sidebar-link">
              <FontAwesomeIcon icon={faHome} /> Logout
            </Link>
          </li>
        </ul>
      </aside>

      <div id="navbar-wrapper">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link href="#" className="navbar-brand" id="sidebar-toggle">
                <FontAwesomeIcon icon={faBars} />
              </Link>
            </div>
            <h6 className="user_name">{username}</h6>
          </div>
        </nav>
      </div>
    </>
  );
}
