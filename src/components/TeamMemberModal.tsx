import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { TeamMember } from "@/utils/types";
import { createTeamMember, updateTeamMember } from "@/services/supabaseService";

interface TeamMemberModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  member?: TeamMember;
  onSuccess: () => void;
}

export default function TeamMemberModal({
  open,
  setOpen,
  member,
  onSuccess,
}: TeamMemberModalProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "Full Time" | "Part Time" | "Internship"
  >("Full Time");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (member) {
      setName(member.name);
      setStatus(member.status);
      setEmployeeId(member.employeeId);
      setEmail(member.email);
      setRole(member.role);
    } else {
      resetForm();
    }
  }, [member, open]);

  const resetForm = () => {
    setName("");
    setStatus("Full Time");
    setEmployeeId("");
    setEmail("");
    setRole("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (
        name.trim() === "" ||
        employeeId.trim() === "" ||
        email.trim() === "" ||
        role.trim() === ""
      ) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      const memberData = {
        name,
        status,
        employeeId,
        email,
        role,
      };

      if (member) {
        await updateTeamMember(member.id, memberData);
        toast({
          title: "Team member updated",
          description: `${name} has been updated successfully`,
        });
      } else {
        await createTeamMember(memberData);
        toast({
          title: "Team member added",
          description: `${name} has been added to the team`,
        });
      }

      onSuccess();
      setOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while saving team member",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {member ? "Edit Team Member" : "Add Team Member"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(
                value: "Full Time" | "Part Time" | "Internship"
              ) => setStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full Time">Full Time</SelectItem>
                <SelectItem value="Part Time">Part Time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="A012XY"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@company.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Job title or department"
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : member ? "Update" : "Add Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
