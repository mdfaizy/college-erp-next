"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  ChevronDown,
  LayoutGrid,
  List,
  FileText,
  PieChart,

  UserCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  roles?: string[];
  permissions?: string[]; 
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean ,roles?: string[],permissions?: string[]}[];
};

const navItems: NavItem[] = [
 {
  icon: <LayoutGrid />,
  name: "My Account",
  roles: ["STUDENT"],
  subItems: [
    { name: "Complete Profile", path: "/students/complete-profile" },
    { name: "Results", path: "/result/my-results" },
    { name: "Attendance", path: "/attendance/my-attendance" },
    {name:"Fees",path:"/students/fees"}
  ],
},

{
    name: "Attendace",
    icon: <UserCircle />,
     subItems: [
      { name: "Attenace", path: "/attendance/mark", pro: false },
      { name: "Report", path: "/attendance/reports", pro: false },
       { name: "Attenace List", path: "/attendance/history", pro: false },
      

      // 
     ],
  },

  {
    name: "College Manage",
    icon: <UserCircle />,
     subItems: [
      { name: "College List", path: "/college/college-list", pro: false },
      { name: "Add New College", path: "/college/create-new-college", pro: false }

      // 
     ],
  },
{
  name: "Students",
  icon: <UserCircle />,
  // permissions: ["VIEW_STUDENT"], // 👈 main menu ke liye
  subItems: [
    {
      name: "Student List",
      path: "/students/list",
      permissions: ["VIEW_STUDENT"],
    },
    {
      name: "Add Student",
      path: "/students/create",
      permissions: ["CREATE_STUDENT"],
    },
  ],
},
  {
    name: "Teachers",
    icon: <UserCircle />,
    subItems: [{ name: "Add Teacher", path: "/teachers/create" },
      { name: "Teacher List", path: "/teachers/list" }
    ],
  },
   {
    name: "User",
    icon: <UserCircle />,
    subItems: [
      { name: "User List", path: "/users/user-list" },
      { name: "Add New User", path: "/users/create-new-user" },
      { name: "Roles & Permissions", path: "/roles/create" },
    ],
  },

   {
    name: "Role",
    icon: <UserCircle />,
    subItems: [
      { name: "Create Role", path: "/roles/create" },
      { name: "Role List", path: "/roles/list" },
      // { name: "Roles & Permissions", path: "/roles/create" },
    ],
  },

  {
    name: "Fees",
    icon: <UserCircle />,
    subItems: [
      { name: "Create Fees", path: "/fees/create" },
      { name: "Fees List", path: "/fees/list" },
      { name: "Fees Assign", path: "/fees/assign" },
      { name: "Report", path: "/fees/report" },
    ],
  },

    {
    name: "Result",
    icon: <UserCircle />,
    subItems: [
      { name: "Create Exame", path: "/result/create-eame" },
      { name: "List", path: "/result/list" },
      { name: "Semister Result", path: "/result/semester-result" },
      { name: "Submit Result", path: "/result/submit-result" },
    ],
  },
  {
    name: "Staff",
    icon: <UserCircle />,
    subItems: [
      { name: "Staff List", path: "/staff/list" },
      { name: "Add Staff", path: "/staff/add" },
      { name: "Payroll", path: "/staff/payroll" },
    ],
  },
  {
    name: "Tables",
    icon: <UserCircle />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
 {
    name: "Semester",
    icon: <List />,
    subItems: [
      { name: "Create Semester", path: "/semester/create" },
      { name: "Semester List", path: "/semester/list" },
    ],
  },

  {
    name: "Hostel",
    icon: <List />,
    subItems: [
      { name: "Create Hostel", path: "/hostel/create-hostel" },
      { name: "Hostel List", path: "/hostel/list" },
      // { name: "Create Floor", path: "/hostel/floors/create-floor" },
      // { name: "Floor List", path: "/hostel/floors/list" },
      // { name: "Create Room", path: "/hostel/rooms/create-room" },
      // { name: "Room List", path: "/hostel/rooms/list" },
      { name: "Transfer Hostel", path: "/hostel/transfer" },
      { name: "Assign Hostel", path: "/hostel/assign" },
      { name: "Acclocates Hostel", path: "/hostel/allocations" },
      // { name: "Acclocates Hostel", path: "/hostel/allocations/list" },
    ],
  },
  {
    name: "Academic",
    icon: <FileText />,
    subItems: [
      { name: "Create Course", path: "/courses/create" },
      { name: "Course List", path: "/courses/list" },
      { name: "Add Semister", path: "/semister/create" },
      { name: "Semister List", path: "/semister/list" },
      { name: "Add Department", path: "/department/create"},
      { name: "Department List", path: "/department/list"},
      { name: "Create Session", path: "/session/create"},
      { name: "Session List", path: "/session/list"},

      { name: "Timetable", path: "/timetable" },
    ],
  },
  {
    name: "Examination",
    icon: <FileText />,
    subItems: [
      { name: "Exam Schedule", path: "/exams" },
      { name: "Marks Entry", path: "/marks" },
      { name: "Results", path: "/results" },
    ],
  },
   {
    name: "Fees",
    icon: <PieChart />,
    subItems: [
      { name: "Collect Fees", path: "/fees/collect" },
      { name: "Fee Structure", path: "/fees/structure" },
      { name: "Fee Reports", path: "/fees/reports" },
    ],
  },
];


const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  
  const user = useSelector((state: any) => state.auth.user);
  console.log(user);
const role = user?.roles?.[0]?.role?.name;
  const isStudent = role === "STUDENT";
  console.log("ROLE =>", role);
console.log("IS STUDENT =>", isStudent);
// const permissions: string[] = user?.permissions || [];
const permissions: string[] =
  user?.roles?.flatMap((r: any) =>
    r.role?.privileges?.map((p: any) => p.permission?.key)
  ).filter(Boolean) || [];
  console.log("RAW ROLES =>", user?.roles); 
console.log("PERMISSIONS =>", permissions);

const hasPermissionAccess = (requiredPermissions?: string[]) => {
  if (!requiredPermissions) return true;
  return requiredPermissions.some((p) => permissions.includes(p));
};
const hasRoleAccess = (roles?: string[]) => {
  if (!roles) return true; // agar role define nahi hai → sabko dikhega
  return roles.includes(role);
};
const filteredNavItems = navItems
  .map((nav) => {

    // ✅ STUDENT → sirf student wala menu dikhe
    if (isStudent) {
      if (!nav.roles?.includes("STUDENT")) return null;

      return nav; // 👈 no permission check
    }

    // ✅ OTHER USERS → role + permission
    if (!hasRoleAccess(nav.roles)) return null;
    if (!hasPermissionAccess(nav.permissions)) return null;

    const filteredSubItems = nav.subItems?.filter((sub) =>
      hasRoleAccess(sub.roles) &&
      hasPermissionAccess(sub.permissions)
    );

    return {
      ...nav,
      subItems: filteredSubItems,
    };
  })
  .filter(Boolean);

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDown
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" ;
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
   const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
  let submenuMatched = false;

  navItems.forEach((nav, index) => {
    if (nav.subItems) {
      nav.subItems.forEach((subItem) => {
        if (isActive(subItem.path)) {
          setOpenSubmenu({
            type: "main",
            index,
          });

          submenuMatched = true;
        }
      });
    }
  });

  if (!submenuMatched) {
    setOpenSubmenu(null);
  }
}, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/tailadmin-nextjs/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/tailadmin-nextjs/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/tailadmin-nextjs/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <UserCircle />
                )}
              </h2>
              {renderMenuItems(filteredNavItems, "main")}
            </div>

            {/* <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <UserCircle />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div> */}
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
