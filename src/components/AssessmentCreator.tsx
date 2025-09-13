import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, CheckCircle, Circle, Square, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export const AssessmentCreator = () => {
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [assessmentDescription, setAssessmentDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    points: 1
  });
  const { toast } = useToast();

  const questionTypeIcons = {
    'multiple-choice': CheckCircle,
    'true-false': Circle,
    'short-answer': Square,
    'essay': Hash
  };

  const addQuestion = () => {
    if (!currentQuestion.question?.trim()) {
      toast({
        title: "Question required",
        description: "Please enter a question before adding.",
        variant: "destructive"
      });
      return;
    }

    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      type: currentQuestion.type as QuestionType,
      question: currentQuestion.question,
      options: currentQuestion.options?.filter(opt => opt.trim()) || [],
      correctAnswer: currentQuestion.correctAnswer,
      points: currentQuestion.points || 1
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      points: 1
    });

    toast({
      title: "Question added",
      description: "Question has been successfully added to the assessment.",
    });
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || ['', '', '', ''])];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const getTotalPoints = () => {
    return questions.reduce((sum, q) => sum + q.points, 0);
  };

  const createAssessment = () => {
    if (!assessmentTitle.trim() || questions.length === 0) {
      toast({
        title: "Assessment incomplete",
        description: "Please add a title and at least one question.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Assessment created successfully",
      description: `"${assessmentTitle}" has been saved with ${questions.length} questions.`,
    });

    // Reset form
    setAssessmentTitle('');
    setAssessmentDescription('');
    setQuestions([]);
  };

  return (
    <div className="space-y-6">
      {/* Assessment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Assessment</CardTitle>
          <CardDescription>
            Design custom assessments with various question types and automated grading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assessment Title</Label>
              <Input
                id="title"
                placeholder="e.g., Chapter 5 Review Quiz"
                value={assessmentTitle}
                onChange={(e) => setAssessmentTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Total Points: {getTotalPoints()}</Label>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{questions.length} Questions</Badge>
                <Badge variant={getTotalPoints() > 0 ? "default" : "secondary"}>
                  {getTotalPoints()} Points
                </Badge>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the assessment..."
              value={assessmentDescription}
              onChange={(e) => setAssessmentDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Question Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Add Question</CardTitle>
          <CardDescription>
            Create different types of questions for comprehensive assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="questionType">Question Type</Label>
              <Select 
                value={currentQuestion.type} 
                onValueChange={(value: QuestionType) => 
                  setCurrentQuestion({ ...currentQuestion, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={currentQuestion.points}
                onChange={(e) => setCurrentQuestion({ 
                  ...currentQuestion, 
                  points: parseInt(e.target.value) || 1 
                })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              placeholder="Enter your question here..."
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion({ 
                ...currentQuestion, 
                question: e.target.value 
              })}
              rows={3}
            />
          </div>

          {currentQuestion.type === 'multiple-choice' && (
            <div className="space-y-3">
              <Label>Answer Options</Label>
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Badge variant="outline">{String.fromCharCode(65 + index)}</Badge>
                  <Input
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                  <Button
                    variant={currentQuestion.correctAnswer === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentQuestion({ 
                      ...currentQuestion, 
                      correctAnswer: option 
                    })}
                  >
                    Correct
                  </Button>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div className="space-y-3">
              <Label>Correct Answer</Label>
              <div className="flex space-x-4">
                <Button
                  variant={currentQuestion.correctAnswer === 'true' ? "default" : "outline"}
                  onClick={() => setCurrentQuestion({ 
                    ...currentQuestion, 
                    correctAnswer: 'true' 
                  })}
                >
                  True
                </Button>
                <Button
                  variant={currentQuestion.correctAnswer === 'false' ? "default" : "outline"}
                  onClick={() => setCurrentQuestion({ 
                    ...currentQuestion, 
                    correctAnswer: 'false' 
                  })}
                >
                  False
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={addQuestion} className="bg-gradient-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Questions ({questions.length})</CardTitle>
            <CardDescription>
              Review and manage your assessment questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const Icon = questionTypeIcons[question.type];
                return (
                  <div key={question.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <Icon className="w-3 h-3" />
                            <span>{question.type.replace('-', ' ')}</span>
                          </Badge>
                          <Badge variant="secondary">{question.points} pts</Badge>
                        </div>
                        <h4 className="font-medium text-foreground mb-2">
                          {index + 1}. {question.question}
                        </h4>
                        {question.options && question.options.length > 0 && (
                          <div className="text-sm text-muted-foreground space-y-1">
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className="flex items-center space-x-2">
                                <span>{String.fromCharCode(65 + optIndex)})</span>
                                <span className={option === question.correctAnswer ? 'font-medium text-secondary' : ''}>
                                  {option}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestion(question.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator className="my-6" />

            <div className="flex justify-end">
              <Button onClick={createAssessment} className="bg-gradient-primary">
                Create Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};