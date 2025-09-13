import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, Clock, Award, Target, Brain } from 'lucide-react';
import { ProgressChart } from './ProgressChart';

export const StudentDashboard = () => {
  const recentFiles = [
    { name: 'Advanced Mathematics.pdf', score: 92, date: '2 days ago', status: 'completed' },
    { name: 'Physics Fundamentals.pdf', score: 88, date: '1 week ago', status: 'completed' },
    { name: 'Chemistry Notes.txt', score: null, date: '3 days ago', status: 'processing' },
  ];

  const recommendations = [
    {
      title: 'Focus on Calculus Integration',
      description: 'Based on your recent performance, spend more time on integration techniques.',
      priority: 'high'
    },
    {
      title: 'Review Physics Formulas',
      description: 'Your formula application could be stronger in mechanics problems.',
      priority: 'medium'
    },
    {
      title: 'Practice Essay Structure',
      description: 'Your literature essays show good ideas but need better organization.',
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Overall Score</p>
                <p className="text-3xl font-bold">88.5%</p>
              </div>
              <Award className="w-10 h-10 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Files Processed</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <BookOpen className="w-10 h-10 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent text-accent-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Study Streak</p>
                <p className="text-3xl font-bold">12 days</p>
              </div>
              <TrendingUp className="w-10 h-10 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Goal</p>
                <p className="text-3xl font-bold text-primary">90%</p>
              </div>
              <Target className="w-10 h-10 text-primary/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <ProgressChart />

      {/* Recent Activity and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Recent Files</span>
            </CardTitle>
            <CardDescription>
              Your latest uploaded materials and assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{file.name}</h4>
                    <p className="text-sm text-muted-foreground">{file.date}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {file.status === 'completed' && file.score ? (
                      <Badge variant={file.score >= 90 ? "default" : file.score >= 80 ? "secondary" : "outline"}>
                        {file.score}%
                      </Badge>
                    ) : (
                      <Badge variant="outline">Processing...</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-accent" />
              <span>Study Recommendations</span>
            </CardTitle>
            <CardDescription>
              Personalized suggestions based on your learning patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                    <Badge 
                      variant={rec.priority === 'high' ? "default" : rec.priority === 'medium' ? "secondary" : "outline"}
                      className="ml-2"
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};