import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from '@/components/ImageUploader';
import { format } from 'date-fns';
import { getUserProfile, updateUserProfile } from '@/services/supabaseService';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

const OCCUPATION_OPTIONS = [
  "Student",
  "Teacher", 
  "Engineer", 
  "Doctor", 
  "HR", 
  "Project Manager",
  "Designer",
  "Architect",
  "Accountant",
  "Lawyer",
  "Other"
];

const AGE_OPTIONS = Array.from({ length: 50 }, (_, i) => i + 18); // 18 to 100

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    age: '',
    dateOfBirth: null,
    occupation: '',
    avatarUrl: '',
    bio: '',
    linkedinUrl: '',
    twitterUrl: '',
    githubUrl: ''
  });
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const profileData = await getUserProfile();
        
        if (profileData) {
          setProfile({
            fullName: profileData.full_name || '',
            age: profileData.age?.toString() || '',
            dateOfBirth: profileData.date_of_birth ? new Date(profileData.date_of_birth) : null,
            occupation: profileData.occupation || '',
            avatarUrl: profileData.avatar_url || '',
            bio: profileData.bio || '',
            linkedinUrl: profileData.linkedin_url || '',
            twitterUrl: profileData.twitter_url || '',
            githubUrl: profileData.github_url || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser, toast]);
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    try {
      setIsLoading(true);
      
      await updateUserProfile({
        fullName: profile.fullName,
        age: profile.age ? parseInt(profile.age) : undefined,
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString() : undefined,
        occupation: profile.occupation,
        avatarUrl: profile.avatarUrl,
        bio: profile.bio,
        linkedinUrl: profile.linkedinUrl,
        twitterUrl: profile.twitterUrl,
        githubUrl: profile.githubUrl
      });
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
      
      // Redirect to dashboard after saving
      navigate('/');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageUpload = (imageDataUrl: string) => {
    setProfile(prev => ({ ...prev, avatarUrl: imageDataUrl }));
  };
  
  if (!currentUser) {
    return <div className="flex items-center justify-center h-screen">Please log in to view your profile.</div>;
  }
  
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <form onSubmit={handleProfileUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Upload a profile picture</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                {profile.avatarUrl ? (
                  <img 
                    src={profile.avatarUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-4xl text-muted-foreground">
                      {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 
                       currentUser.email ? currentUser.email.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                )}
              </div>
              <ImageUploader 
                onImageUpload={handleImageUpload}
                defaultImage={profile.avatarUrl}
              />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Select 
                    value={profile.age} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, age: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your age" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGE_OPTIONS.map((age) => (
                        <SelectItem key={age} value={age.toString()}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
  <Label htmlFor="dateOfBirth">Date of Birth</Label>
  <div className="relative">
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {profile.dateOfBirth ? format(profile.dateOfBirth, 'yyyy-MM-dd') : 'Select a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Calendar
          mode="single"
          selected={profile.dateOfBirth}
          onSelect={(date) => setProfile((prev) => ({ ...prev, dateOfBirth: date }))}
        />
      </PopoverContent>
    </Popover>
  </div>
</div>

              </div>
              
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Select 
                  value={profile.occupation} 
                  onValueChange={(value) => setProfile(prev => ({ ...prev, occupation: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCUPATION_OPTIONS.map((occupation) => (
                      <SelectItem key={occupation} value={occupation}>
                        {occupation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea 
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input 
                    id="linkedinUrl"
                    value={profile.linkedinUrl}
                    onChange={(e) => setProfile(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitterUrl">Twitter URL</Label>
                  <Input 
                    id="twitterUrl"
                    value={profile.twitterUrl}
                    onChange={(e) => setProfile(prev => ({ ...prev, twitterUrl: e.target.value }))}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input 
                    id="githubUrl"
                    value={profile.githubUrl}
                    onChange={(e) => setProfile(prev => ({ ...prev, githubUrl: e.target.value }))}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                type="button" 
                variant="outline" 
                className="mr-2"
                onClick={() => navigate('/')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
