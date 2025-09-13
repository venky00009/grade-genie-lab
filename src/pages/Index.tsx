import { useState } from 'react';
import { Navigation, UserRole } from '@/components/Navigation';
import { StudentDashboard } from '@/components/StudentDashboard';
import { FileUpload } from '@/components/FileUpload';
import { ProgressChart } from '@/components/ProgressChart';
import { AssessmentCreator } from '@/components/AssessmentCreator';
import { InstructorAnalytics } from '@/components/InstructorAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Upload, BarChart3, Brain, Shield, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-education.jpg';

const Index = () => {
  const [currentView, setCurrentView] = useState('welcome');
  const [userRole, setUserRole] = useState<UserRole>('student');

  const renderContent = () => {
    if (userRole === 'student') {
      switch (currentView) {
        case 'dashboard':
          return <StudentDashboard />;
        case 'upload':
          return (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Upload Learning Materials</h1>
                <p className="text-muted-foreground">
                  Upload your educational files and get automated assessments and personalized recommendations
                </p>
              </div>
              <FileUpload />
            </div>
          );
        case 'progress':
          return (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Learning Progress</h1>
                <p className="text-muted-foreground">
                  Visualize your academic journey and track improvement over time
                </p>
              </div>
              <ProgressChart />
            </div>
          );
        default:
          return <StudentDashboard />;
      }
    } else {
      switch (currentView) {
        case 'instructor-dashboard':
          return (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
                <p className="text-muted-foreground">
                  Monitor class performance and manage educational assessments
                </p>
              </div>
              <InstructorAnalytics />
            </div>
          );
        case 'create-assessment':
          return (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Assessment Creator</h1>
                <p className="text-muted-foreground">
                  Design comprehensive assessments with multiple question types and automated grading
                </p>
              </div>
              <AssessmentCreator />
            </div>
          );
        case 'analytics':
          return (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Class Analytics</h1>
                <p className="text-muted-foreground">
                  Deep dive into student performance data and learning trends
                </p>
              </div>
              <InstructorAnalytics />
            </div>
          );
        default:
          return <InstructorAnalytics />;
      }
    }
  };

  // Show welcome/hero section for first-time users
  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation 
          currentView={currentView}
          onViewChange={setCurrentView}
          userRole={userRole}
          onRoleChange={setUserRole}
        />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                    Intelligent 
                    <span className="bg-gradient-primary bg-clip-text text-transparent"> Educational </span>
                    Analytics
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg">
                    Transform your learning experience with automated assessment generation, 
                    personalized recommendations, and comprehensive progress tracking.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-3"
                    onClick={() => setCurrentView(userRole === 'student' ? 'dashboard' : 'instructor-dashboard')}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-lg px-8 py-3"
                    onClick={() => setCurrentView('upload')}
                  >
                    Upload Files
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">Smart Upload</h3>
                    <p className="text-sm text-muted-foreground">Process any educational file format</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">AI Assessment</h3>
                    <p className="text-sm text-muted-foreground">Automated question generation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-accent rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">Deep Analytics</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive progress tracking</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Students learning with digital tools" 
                  className="rounded-2xl shadow-strong w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-primary/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need for modern education
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful tools for both students and instructors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-primary/20 bg-primary/5 hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>File Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Upload PDFs, documents, and text files for automatic content analysis and assessment generation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-secondary/5 hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg mb-4 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>Smart Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate multiple choice, true/false, short answer, and essay questions automatically from your content.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5 hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-accent rounded-lg mb-4 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>Progress Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track learning progress with interactive charts, performance insights, and personalized recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get personalized study recommendations based on your learning patterns and performance data.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Secure Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All your files and data are securely stored with enterprise-grade encryption and privacy protection.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg mb-4 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Instructor Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive class management with student analytics, assessment tracking, and performance insights.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentView={currentView}
        onViewChange={setCurrentView}
        userRole={userRole}
        onRoleChange={setUserRole}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
