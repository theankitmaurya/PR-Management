import { useState } from "react";
import {
  ArrowLeft,
  BarChart2,
  Calendar,
  ChevronDown,
  ClipboardList,
  Clock,
  Copy,
  FileText,
  Filter,
  HelpCircle,
  Info,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  Search,
  Settings,
  SortAsc,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface TableHeaderProps {
  children: React.ReactNode;
}

interface EmployeeRowProps {
  name: string;
  status: string;
  statusColor: "green" | "pink" | "blue";
  id: string;
  email: string;
  role: string;
  avatarSrc: string;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
        active ? "bg-gray-100 font-medium" : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span className={active ? "text-gray-900" : "text-gray-500"}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function TableHeader({ children }: TableHeaderProps) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <div className="flex items-center gap-1">
        <span>{children}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </div>
    </th>
  );
}

function EmployeeRow({
  name,
  status,
  statusColor,
  id,
  email,
  role,
  avatarSrc,
}: EmployeeRowProps) {
  const statusColors = {
    green: "bg-green-100 text-green-800",
    pink: "bg-pink-100 text-pink-800",
    blue: "bg-blue-100 text-blue-800",
  };

  const statusDot = {
    green: "bg-green-500",
    pink: "bg-pink-500",
    blue: "bg-blue-500",
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarSrc} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <div
            className={`h-2 w-2 rounded-full ${statusDot[statusColor]}`}
          ></div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${statusColors[statusColor]}`}
          >
            {status}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <span>{id}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-gray-600"
          >
            <Copy size={14} />
          </Button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{role}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
        </Button>
      </td>
    </tr>
  );
}

export default function TeamPage() {
  const [selectedTeam, setSelectedTeam] = useState("All Team");

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Main Content - Only showing main content in mobile view */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b bg-white dark:bg-gray-800 dark:border-gray-700 flex items-center px-4">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft size={18} />
          </Button>

          <div className="flex-1 ml-4">
            <h1 className="font-semibold text-lg dark:text-white">Your Team</h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>team</span>
              <span className="mx-1">›</span>
              <span>employee</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <HelpCircle size={18} />
            </Button>
            <Button variant="ghost" size="icon">
              <ArrowLeft size={18} className="rotate-180" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Setup Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 dark:text-blue-400 mt-0.5">
                <Info size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  Finish Your Account Setup!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Make the most of your HR dashboard experience by ensuring your
                  account is fully set up
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Team">All Team</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  placeholder="Search here"
                  className="pl-9 w-full md:w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <span className="text-xs font-mono">⌘F</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <SortAsc size={16} />
                <span>Sort</span>
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Employment ID</TableHeader>
                    <TableHeader>Email Address</TableHeader>
                    <TableHeader>Role</TableHeader>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  <EmployeeRow
                    name="Brooklyn Simmons"
                    status="Full Time"
                    statusColor="green"
                    id="A013HP"
                    email="brooklyn@kanz.com"
                    role="Marketing"
                    avatarSrc="/placeholder.svg?height=40&width=40"
                  />
                  <EmployeeRow
                    name="Guy Hawkins"
                    status="Part Time"
                    statusColor="pink"
                    id="A022CK"
                    email="guyhawk@kanz.com"
                    role="Web Designer"
                    avatarSrc="/placeholder.svg?height=40&width=40"
                  />
                  <EmployeeRow
                    name="Robert Fox"
                    status="Full Time"
                    statusColor="green"
                    id="A017TB"
                    email="robertfox@kanz.com"
                    role="Web Designer"
                    avatarSrc="/placeholder.svg?height=40&width=40"
                  />
                  <EmployeeRow
                    name="Bessie Cooper"
                    status="Full Time"
                    statusColor="green"
                    id="A041TL"
                    email="bessie@kanz.com"
                    role="Marketing"
                    avatarSrc="/placeholder.svg?height=40&width=40"
                  />
                  <EmployeeRow
                    name="Devon Lane"
                    status="Part Time"
                    statusColor="pink"
                    id="A066KK"
                    email="devon@kanz.com"
                    role="Graphic Designer"
                    avatarSrc="/placeholder.svg?height=40&width=40"
                  />
                  <EmployeeRow
                    name="Jerome Bell"
                    status="Internship"
                    statusColor="blue"
                    id="A077TK"
                    email="jerome@kanz.com"
                    role="Marketing"
                    avatarSrc="/placeholder.svg?height=40&width=40"
                  />
                  <EmployeeRow
                    name="Arlene McCoy"
                    status="Full Time"
                    statusColor="green"
                    id="A091BA"
                    email="arlene@kanz.com"
                    role="Marketing"
                    avatarSrc="/placeholder.svg?height=40&width=40"
                  />
                  <EmployeeRow
                    name="Marvin McKinney"
                    status="Full Time"
                    statusColor="green"
                    id="A089IT"
                    email="marvin@kanz.com"
                    role="Graphic Designer"
                    avatarSrc="/placeholder.svg?height=40&width=40"
                  />
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="border-t dark:border-gray-700 p-4 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page 1 of 10
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
