// "use client";

// import Footer from "@/components/footer/Footer";
// import { useSidebar } from "@/context/SidebarContext";
// import AppHeader from "@/layout/AppHeader";
// import AppSidebar from "@/layout/AppSidebar";
// import Backdrop from "@/layout/Backdrop";
// import React from "react";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isExpanded, isHovered, isMobileOpen } = useSidebar();

//   // Dynamic class for main content margin based on sidebar state
//   const mainContentMargin = isMobileOpen
//     ? "ml-0"
//     : isExpanded || isHovered
//     ? "lg:ml-[290px]"
//     : "lg:ml-[90px]";

//   return (
//     <div className="min-h-screen xl:flex">
//       {/* Sidebar and Backdrop */}
//       <AppSidebar />
//       <Backdrop />
//       {/* Main Content Area */}
//       <div
//         className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
//       >
//         {/* Header */}
//         <AppHeader />
//         {/* Page Content */}
//         <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}

//         <Footer/>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import Footer from "@/components/footer/Footer";
// import { useSidebar } from "@/context/SidebarContext";
// import AppHeader from "@/layout/AppHeader";
// import AppSidebar from "@/layout/AppSidebar";
// import Backdrop from "@/layout/Backdrop";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isExpanded, isHovered, isMobileOpen } = useSidebar();
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     // ❌ Not logged in → go to signin
//     if (!token) {
//       router.replace("/login"); // 🔥 IMPORTANT FIX
//     } else {
//       setLoading(false);
//     }
//   }, [router]);

//   // 🔥 Prevent UI flash
//   if (loading) return null;

//   const mainContentMargin = isMobileOpen
//     ? "ml-0"
//     : isExpanded || isHovered
//     ? "lg:ml-[290px]"
//     : "lg:ml-[90px]";

//   return (
//     <div className="min-h-screen xl:flex">
//       {/* Sidebar */}
//       <AppSidebar />
//       <Backdrop />

//       {/* Main Content */}
//       <div
//         className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
//       >
//         {/* Header */}
//         <AppHeader />

//         {/* Page */}
//         <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
//           {children}
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }


  // "use client";

  // import Footer from "@/components/footer/Footer";
  // import { useSidebar } from "@/context/SidebarContext";
  // import AppHeader from "@/layout/AppHeader";
  // import AppSidebar from "@/layout/AppSidebar";
  // import Backdrop from "@/layout/Backdrop";

  // import React, { useEffect, useState } from "react";
  // import { useRouter } from "next/navigation";
  // import { useDispatch } from "react-redux";

  // import {
  //   setToken,
  //   setUser,
  //   logout,
  // } from "@/components/redux/slices/authSlice";

  // import axios from "axios";

  // export default function AdminLayout({
  //   children,
  // }: {
  //   children: React.ReactNode;
  // }) {
  //   const { isExpanded, isHovered, isMobileOpen } =
  //     useSidebar();

  //   const router = useRouter();
  //   const dispatch = useDispatch();

  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     verifyAuth();
  //   }, []);

  //   const verifyAuth = async () => {
  //     try {
  //       /**
  //        * Try refresh first to get fresh access token
  //        */
  //       const refreshRes = await axios.post(
  //         "http://localhost:5000/api/auth/refresh-token",
  //         {},
  //         {
  //           withCredentials: true,
  //         }
  //       );

  //       dispatch(
  //         setToken(refreshRes.data.accessToken)
  //       );

  //       /**
  //        * Fetch current user
  //        */
  //       const meRes = await axios.get(
  //         "http://localhost:5000/api/auth/me",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${refreshRes.data.accessToken}`,
  //           },
  //           withCredentials: true,
  //         }
  //       );

  //       dispatch(setUser(meRes.data.user));

  //       setLoading(false);

  //     } catch (err) {
  //       dispatch(logout());

  //       router.replace("/login");
  //     }
  //   };

  //   if (loading) return null;

  //   const mainContentMargin = isMobileOpen
  //     ? "ml-0"
  //     : isExpanded || isHovered
  //     ? "lg:ml-[290px]"
  //     : "lg:ml-[90px]";

  //   return (
  //     <div className="min-h-screen xl:flex">
  //       <AppSidebar />
  //       <Backdrop />

  //       <div
  //         className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
  //       >
  //         <AppHeader />

  //         <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
  //           {children}
  //           <Footer />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }













  "use client";

import Footer from "@/components/footer/Footer";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  setToken,
  setUser,
  logout,
} from "@/components/redux/slices/authSlice";

import axios from "axios";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } =
    useSidebar();

  const router = useRouter();
  const dispatch = useDispatch();

  const accessToken = useSelector(
    (state: any) => state.auth.accessToken
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    try {
      /**
       * If token already exists in redux
       * no need to refresh immediately
       */
      if (accessToken) {
        setLoading(false);
        return;
      }

      /**
       * Only refresh if token missing
       */
      const refreshRes = await axios.post(
        "http://localhost:5000/api/auth/refresh-token",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(
        setToken(refreshRes.data.accessToken)
      );

      const meRes = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${refreshRes.data.accessToken}`,
          },
          withCredentials: true,
        }
      );

      dispatch(setUser(meRes.data.user));

      setLoading(false);

    } catch (err) {
      dispatch(logout());
      router.replace("/login");
    }
  };

  if (loading) return null;

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />

        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}