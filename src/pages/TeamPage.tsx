import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  Copy,
  Filter,
  Info,
  MoreHorizontal,
  Plus,
  Search,
  SortAsc,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { TeamMember } from "@/utils/types";
import { getTeamMembers, deleteTeamMember, getUserProfile } from "@/services/supabaseService";
import TeamMemberModal from "@/components/TeamMemberModal";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { useAuth } from "@/context/AuthContext";

interface TableHeaderProps {
  children: React.ReactNode;
  sortable?: boolean;
  onSort?: () => void;
  sortDirection?: "asc" | "desc" | null;
}

function TableHeader({ children, sortable, onSort, sortDirection }: TableHeaderProps) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <div className="flex items-center gap-1 cursor-pointer" onClick={sortable ? onSort : undefined}>
        <span>{children}</span>
        {sortable ? (
          sortDirection === "asc" ? (
            <ArrowUp size={14} className="text-gray-600" />
          ) : sortDirection === "desc" ? (
            <ArrowDown size={14} className="text-gray-600" />
          ) : (
            <ChevronDown size={14} className="text-gray-400" />
          )
        ) : (
          <ChevronDown size={14} className="text-gray-400" />
        )}
      </div>
    </th>
  );
}

export default function TeamPage() {
  const [selectedTeam, setSelectedTeam] = useState("All Team");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editMember, setEditMember] = useState<TeamMember | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [activeFilters, setActiveFilters] = useState<{
    status: string[];
    role: string[];
  }>({
    status: [],
    role: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;

  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchTeamMembers();
    checkProfileCompleteness();
  }, []);

  const checkProfileCompleteness = async () => {
    try {
      const profile = await getUserProfile();
      const isComplete = Boolean(
        profile?.full_name && 
        profile?.avatar_url && 
        (profile?.bio || profile?.occupation)
      );
      setIsProfileComplete(isComplete);
    } catch (error) {
      console.error("Error checking profile completeness:", error);
    }
  };

  useEffect(() => {
    const filtered = filterAndSortMembers();
    setFilteredMembers(filtered);
  }, [teamMembers, selectedTeam, searchQuery, sortField, sortDirection, activeFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilters, selectedTeam]);

  const fetchTeamMembers = async () => {
    setIsLoading(true);
    try {
      const members = await getTeamMembers();
      setTeamMembers(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const availableRoles = useMemo(() => {
    const roles = new Set<string>();
    teamMembers.forEach(member => roles.add(member.role));
    return Array.from(roles);
  }, [teamMembers]);

  const availableStatuses = useMemo(() => {
    const statuses = new Set<string>();
    teamMembers.forEach(member => statuses.add(member.status));
    return Array.from(statuses);
  }, [teamMembers]);

  const filterAndSortMembers = () => {
    let filtered = [...teamMembers];
    
    // Filter by selected team/role
    if (selectedTeam !== "All Team") {
      filtered = filtered.filter(member => member.role.toLowerCase() === selectedTeam.toLowerCase());
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(query) || 
        member.email.toLowerCase().includes(query) ||
        member.employeeId.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query)
      );
    }
    
    // Apply additional filters
    if (activeFilters.status.length > 0) {
      filtered = filtered.filter(member => 
        activeFilters.status.includes(member.status)
      );
    }
    
    if (activeFilters.role.length > 0) {
      filtered = filtered.filter(member => 
        activeFilters.role.includes(member.role)
      );
    }
    
    // Apply sorting
    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        let aValue: any = a[sortField as keyof TeamMember];
        let bValue: any = b[sortField as keyof TeamMember];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sortDirection === 'asc' ? comparison : -comparison;
        }
        
        if (aValue instanceof Date && bValue instanceof Date) {
          return sortDirection === 'asc' 
            ? aValue.getTime() - bValue.getTime() 
            : bValue.getTime() - aValue.getTime();
        }
        
        return sortDirection === 'asc' 
          ? (aValue > bValue ? 1 : -1) 
          : (aValue < bValue ? 1 : -1);
      });
    }
    
    return filtered;
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleFilter = (type: 'status' | 'role', value: string) => {
    setActiveFilters(prev => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [type]: current
      };
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      status: [],
      role: []
    });
  };

  const handleEditMember = (member: TeamMember) => {
    setEditMember(member);
    setAddModalOpen(true);
  };

  const handleDeleteMember = (member: TeamMember) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteMember = async () => {
    if (!memberToDelete) return;
    
    try {
      await deleteTeamMember(memberToDelete.id);
      setTeamMembers(prev => prev.filter(m => m.id !== memberToDelete.id));
      toast({
        title: "Team member deleted",
        description: `${memberToDelete.name} has been removed from the team`,
      });
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  const handleAddNewClick = () => {
    setEditMember(undefined);
    setAddModalOpen(true);
  };

  const handleModalSuccess = () => {
    fetchTeamMembers();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Full Time":
        return { dot: "bg-green-500", bg: "bg-green-100 text-green-800" };
      case "Part Time":
        return { dot: "bg-pink-500", bg: "bg-pink-100 text-pink-800" };
      case "Internship":
        return { dot: "bg-blue-500", bg: "bg-blue-100 text-blue-800" };
      default:
        return { dot: "bg-gray-500", bg: "bg-gray-100 text-gray-800" };
    }
  };

  const totalMembers = filteredMembers.length;
  const totalPages = Math.ceil(totalMembers / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="flex h-full bg-gray-50 dark:bg-black overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b bg-white dark:bg-black dark:border-gray-700 flex items-center px-4">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </Button>
          <div className="flex-1 ml-4">
            <h1 className="font-semibold text-lg dark:text-white">Your Team</h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            </div>
          </div>
          <Button onClick={handleAddNewClick} className="ml-auto mr-2">
            <Plus size={16} className="mr-1" /> Add Member
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {!isProfileComplete && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-blue-500 dark:text-blue-400 mt-0.5">
                  <Info size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Manage Your Team Members</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add, edit or remove team members to keep your team roster up to date
                  </p>
                </div>
              </div>
            </div>
          )}

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
                <SelectItem value="Web Designer">Web Designer</SelectItem>
                <SelectItem value="Graphic Designer">Graphic Designer</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search here" 
                  className="pl-9 w-full md:w-[250px]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter size={16} />
                    <span>Filter</span>
                    {(activeFilters.status.length > 0 || activeFilters.role.length > 0) && (
                      <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                        {activeFilters.status.length + activeFilters.role.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <p className="text-sm font-medium mb-2">Status</p>
                    {availableStatuses.map(status => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={activeFilters.status.includes(status)}
                        onCheckedChange={() => toggleFilter('status', status)}
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <p className="text-sm font-medium mb-2">Role</p>
                    {availableRoles.map(role => (
                      <DropdownMenuCheckboxItem
                        key={role}
                        checked={activeFilters.role.includes(role)}
                        onCheckedChange={() => toggleFilter('role', role)}
                      >
                        {role}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={clearFilters}
                      disabled={activeFilters.status.length === 0 && activeFilters.role.length === 0}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <SortAsc size={16} />
                    <span>Sort</span>
                    {sortField && (
                      <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                        1
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleSort('name')} className="flex justify-between">
                    Name
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('status')} className="flex justify-between">
                    Status
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('role')} className="flex justify-between">
                    Role
                    {sortField === 'role' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('createdAt')} className="flex justify-between">
                    Date Added
                    {sortField === 'createdAt' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="bg-white dark:bg-black border dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <TableHeader 
                      sortable
                      onSort={() => handleSort('name')}
                      sortDirection={sortField === 'name' ? sortDirection : null}
                    >
                      Name
                    </TableHeader>
                    <TableHeader 
                      sortable
                      onSort={() => handleSort('status')}
                      sortDirection={sortField === 'status' ? sortDirection : null}
                    >
                      Status
                    </TableHeader>
                    <TableHeader>Employment ID</TableHeader>
                    <TableHeader>Email Address</TableHeader>
                    <TableHeader 
                      sortable
                      onSort={() => handleSort('role')}
                      sortDirection={sortField === 'role' ? sortDirection : null}
                    >
                      Role
                    </TableHeader>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500">
                        Loading team members...
                      </td>
                    </tr>
                  ) : currentMembers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500">
                        {selectedTeam !== "All Team" 
                          ? `No team members found in ${selectedTeam}`
                          : searchQuery || activeFilters.status.length > 0 || activeFilters.role.length > 0
                            ? "No team members match your search or filters"
                            : "No team members found. Add your first member!"}
                      </td>
                    </tr>
                  ) : (
                    currentMembers.map((member) => {
                      const statusStyle = getStatusColor(member.status);
                      return (
                        <tr key={member.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatarUrl} alt={member.name} />
                                <AvatarFallback className="bg-primary/10">
                                  {member.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{member.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <div className={`h-2 w-2 rounded-full ${statusStyle.dot}`}></div>
                              <span className={`text-xs px-2 py-1 rounded-full ${statusStyle.bg}`}>{member.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <span>{member.employeeId}</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 text-gray-400 hover:text-gray-600"
                                onClick={() => {
                                  navigator.clipboard.writeText(member.employeeId);
                                  toast({
                                    title: "Copied",
                                    description: "Employee ID copied to clipboard",
                                  });
                                }}
                              >
                                <Copy size={14} />
                              </Button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditMember(member)}>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteMember(member)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t dark:border-gray-700 p-4 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {startIndex + 1} - {Math.min(endIndex, totalMembers)} of {totalMembers} team members
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 || totalMembers === 0}
                >
                  Previous
                </Button>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  Page {currentPage} of {totalPages}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalMembers === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <TeamMemberModal 
        open={addModalOpen} 
        setOpen={setAddModalOpen}
        member={editMember}
        onSuccess={handleModalSuccess}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        title="Delete Team Member"
        description={`Are you sure you want to delete ${memberToDelete?.name}? This action cannot be undone.`}
        onConfirm={confirmDeleteMember}
      />
    </div>
  );
}
