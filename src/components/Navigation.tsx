import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, BarChart3, Upload, Settings, User } from 'lucide-react';

export type UserRole = 'student' | 'instructor';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const Navigation = ({ currentView, onViewChange, userRole, onRoleChange }: NavigationProps) => {
  const studentViews = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'upload', label: 'Upload Files', icon: Upload },
    { id: 'progress', label: 'Progress', icon: BookOpen },
  ];

  const instructorViews = [
    { id: 'instructor-dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'create-assessment', label: 'Create Assessment', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const views = userRole === 'student' ? studentViews : instructorViews;

  return (
    <nav className="bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">EduAnalytics</h1>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <Button
                    key={view.id}
                    variant={currentView === view.id ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                    onClick={() => onViewChange(view.id)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{view.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={userRole === 'student' ? "default" : "ghost"}
                size="sm"
                onClick={() => onRoleChange('student')}
                className="text-xs"
              >
                Student
              </Button>
              <Button
                variant={userRole === 'instructor' ? "default" : "ghost"}
                size="sm"
                onClick={() => onRoleChange('instructor')}
                className="text-xs"
              >
                Instructor
              </Button>
            </div>
            
            <Button variant="ghost" size="icon">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};