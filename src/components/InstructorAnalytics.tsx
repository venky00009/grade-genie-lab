import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { Users, TrendingUp, AlertTriangle, CheckCircle, Clock, BookOpen } from 'lucide-react';

// Mock data for instructor analytics
const classOverview = {
  totalStudents: 45,
  averageScore: 82.3,
  completionRate: 91.1,
  activeAssessments: 8
};

const performanceData = [
  { name: 'Week 1', average: 75, submissions: 42 },
  { name: 'Week 2', average: 78, submissions: 44 },
  { name: 'Week 3', average: 82, submissions: 45 },
  { name: 'Week 4', average: 85, submissions: 43 },
  { name: 'Week 5', average: 83, submissions: 45 },
  { name: 'Week 6', average: 87, submissions: 44 },
];

const assessmentData = [
  { name: 'Quiz 1: Algebra', avgScore: 88, submissions: 45, difficulty: 'Easy' },
  { name: 'Quiz 2: Geometry', avgScore: 76, submissions: 43, difficulty: 'Medium' },
  { name: 'Quiz 3: Calculus', avgScore: 71, submissions: 41, difficulty: 'Hard' },
  { name: 'Midterm Exam', avgScore: 79, submissions: 44, difficulty: 'Hard' },
];

const studentProgress = [
  { name: 'Alice Johnson', score: 94, assignments: 12, trend: 'up' },
  { name: 'Bob Smith', score: 87, assignments: 11, trend: 'stable' },
  { name: 'Carol Davis', score: 72, assignments: 9, trend: 'down' },
  { name: 'David Wilson', score: 91, assignments: 12, trend: 'up' },
  { name: 'Eva Brown', score: 68, assignments: 8, trend: 'down' },
];

const difficultyDistribution = [
  { name: 'A (90-100%)', value: 12, color: '#059669' },
  { name: 'B (80-89%)', value: 18, color: '#1e40af' },
  { name: 'C (70-79%)', value: 10, color: '#ea580c' },
  { name: 'D (60-69%)', value: 4, color: '#dc2626' },
  { name: 'F (<60%)', value: 1, color: '#7c2d12' },
];

export const InstructorAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Students</p>
                <p className="text-3xl font-bold">{classOverview.totalStudents}</p>
              </div>
              <Users className="w-10 h-10 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Class Average</p>
                <p className="text-3xl font-bold">{classOverview.averageScore}%</p>
              </div>
              <TrendingUp className="w-10 h-10 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent text-accent-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Completion Rate</p>
                <p className="text-3xl font-bold">{classOverview.completionRate}%</p>
              </div>
              <CheckCircle className="w-10 h-10 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Assessments</p>
                <p className="text-3xl font-bold text-accent">{classOverview.activeAssessments}</p>
              </div>
              <BookOpen className="w-10 h-10 text-accent/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="assessments">Assessment Analysis</TabsTrigger>
          <TabsTrigger value="students">Student Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Class Performance Over Time</CardTitle>
                <CardDescription>
                  Track average scores and submission rates across weeks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="average" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="submissions" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>
                  Current class grade breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={difficultyDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {difficultyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {difficultyDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Performance Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of assessment results and difficulty levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={assessmentData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="avgScore" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Student Progress</CardTitle>
              <CardDescription>
                Monitor student performance and identify those needing attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentProgress.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {student.assignments} assignments submitted
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge 
                        variant={student.score >= 90 ? "default" : student.score >= 80 ? "secondary" : "destructive"}
                      >
                        {student.score}%
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {student.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-secondary" />
                        ) : student.trend === 'down' ? (
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={`text-sm ${
                          student.trend === 'up' ? 'text-secondary' : 
                          student.trend === 'down' ? 'text-destructive' : 
                          'text-muted-foreground'
                        }`}>
                          {student.trend}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};