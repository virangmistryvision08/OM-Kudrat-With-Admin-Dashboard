import axios from "axios";
import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { format } from "date-fns";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/auth/get-all-users`)
      .then((res) => {
        const formattedData: User[] = res.data.data.map((item: any) => ({
          id: item._id,
          name: item.name || "Uncategorized",
          email: item.email,
          createdAt: item.createdAt,
          role: item.role,
        }));
        setUsers(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const getRoleBadgeColor = (role: string): string => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-green-100 text-green-600 border border-green-300";
      case "user":
        return "bg-blue-100 text-blue-600 border border-blue-300";
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    }
  };

  return (
    <div>
      <PageMeta
        title="Users List | TailAdmin - Next.js Admin Dashboard Template"
        description="Manage all Users in the TailAdmin dashboard."
      />

      <PageBreadcrumb pageTitle="Users List"/>

      <div className="space-y-3 rounded-2xl border border-gray-200 bg-white !px-7 !py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="min-w-[700px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    User Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    Created At
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    Role
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 text-left truncate max-w-[220px]">
                      {user.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 text-left truncate max-w-[220px]">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-500 dark:text-gray-400 text-left whitespace-nowrap">
                      {format(new Date(user.createdAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-left">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
