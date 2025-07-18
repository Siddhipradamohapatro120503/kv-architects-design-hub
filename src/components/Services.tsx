import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  PenTool,
  FileCheck,
  CheckCircle,
  ArrowRight,
  Circle,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  Award
} from "lucide-react";

const WorkflowProgressScroll = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth spring animation for progress
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress to step completion
  const stepProgress = useTransform(springProgress, [0, 1], [0, 4]);

  // Update active step based on scroll progress
  useEffect(() => {
    const unsubscribe = stepProgress.onChange((latest) => {
      const currentStep = Math.floor(latest);
      const currentCompleted = Math.min(Math.floor(latest), 3);
      
      setActiveStep(currentStep);
      setCompletedSteps(currentCompleted);
    });

    return unsubscribe;
  }, [stepProgress]);

  const workflowSteps = [
    {
      id: 1,
      icon: Lightbulb,
      title: 'Discovery & Research',
      subtitle: 'Understanding Your Vision',
      description: 'Deep dive into your requirements, site analysis, and conceptual exploration',
      duration: '1-2 weeks',
      features: [
        'Initial consultation',
        'Site survey & analysis',
        'Requirement gathering',
        'Concept brainstorming',
        'Feasibility assessment'
      ],
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      icon: PenTool,
      title: 'Design Development',
      subtitle: 'Bringing Ideas to Life',
      description: '3D modeling, technical drawings, and comprehensive design documentation',
      duration: '3-4 weeks',
      features: [
        '3D visualization',
        'Technical drawings',
        'Material selection',
        'Design iterations',
        'Cost estimation'
      ],
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      icon: FileCheck,
      title: 'Documentation & Approval',
      subtitle: 'Legal & Regulatory Compliance',
      description: 'Complete documentation and regulatory approval process management',
      duration: '2-3 weeks',
      features: [
        'Permit applications',
        'Regulatory compliance',
        'Documentation review',
        'Approval coordination',
        'Final approvals'
      ],
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      icon: CheckCircle,
      title: 'Execution & Delivery',
      subtitle: 'Professional Implementation',
      description: 'Quality-assured project execution with timeline management',
      duration: '8-12 weeks',
      features: [
        'Project kickoff',
        'Construction management',
        'Quality assurance',
        'Timeline monitoring',
        'Final handover'
      ],
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  // Calculate overall progress percentage
  const overallProgress = useTransform(springProgress, [0, 1], [0, 100]);

  return (
    <section 
      id="services" 
      onClick={() => navigate('/services')} 
      className="py-20 bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black from-blue-50 via-white to-blue-50 transition-colors duration-300 relative overflow-hidden cursor-pointer hover:opacity-90"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate('/services')}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-blue-950 dark:text-foreground">
            Our Design <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-blue-600 dark:text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Follow our systematic approach as we transform your vision into reality
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div 
          className="p-6 bg-white dark:bg-gray-900/50 rounded-lg border border-blue-100 dark:border-border shadow-sm hover:border-blue-200 dark:hover:border-border transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Project Progress</h3>
            <motion.div className="text-3xl font-bold text-primary">
              {Math.round((completedSteps / 4) * 100)}%
            </motion.div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ 
                  width: useTransform(overallProgress, (value) => `${value}%`)
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
              {workflowSteps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  className="flex flex-col items-center"
                  animate={{
                    scale: activeStep === index ? 1.1 : 1,
                    opacity: completedSteps > index ? 1 : 0.6
                  }}
                >
                  <div className={`w-4 h-4 rounded-full ${
                    completedSteps > index ? 'bg-success' : 
                    activeStep === index ? 'bg-primary' : 'bg-muted'
                  } mb-2`} />
                  <span className="text-sm text-muted-foreground">{step.title.split(' ')[0]}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Workflow Steps */}
        <div ref={containerRef} className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted transform -translate-x-1/2 hidden lg:block">
            <motion.div 
              className="w-full bg-gradient-to-b from-primary to-secondary origin-top"
              style={{ 
                scaleY: useTransform(springProgress, [0, 1], [0, 1])
              }}
            />
          </div>

          {workflowSteps.map((step, index) => {

            return (
              <motion.div 
                key={step.id}
                className={`grid lg:grid-cols-2 gap-12 items-center mb-24 relative ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Step Circle */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
                  <motion.div 
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                      completedSteps > index ? 'bg-green-500 border-green-400' :
                      activeStep === index ? 'bg-blue-500 border-blue-400' :
                      'bg-gray-300 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                    animate={{
                      scale: activeStep === index ? 1.2 : 1,
                      boxShadow: activeStep === index ? 
                        '0 0 30px rgba(59, 130, 246, 0.5)' : 
                        '0 0 0px rgba(59, 130, 246, 0)'
                    }}
                  >
                    {completedSteps > index ? (
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    ) : (
                      <step.icon className="w-8 h-8 text-white" />
                    )}
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div 
                  className={`bg-gradient-to-br dark:from-gray-900/90 dark:to-gray-800/90 from-gray-50/90 to-white/90 backdrop-blur-sm rounded-2xl p-8 border border-border ${
                    index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-2'
                  }`}
                  animate={{
                    borderColor: activeStep === index ? 
                      (step.color === 'blue' ? 'rgb(59, 130, 246)' :
                       step.color === 'purple' ? 'rgb(147, 51, 234)' :
                       step.color === 'green' ? 'rgb(34, 197, 94)' : 'rgb(234, 179, 8)') :
                      'rgb(55, 65, 81)',
                    boxShadow: activeStep === index ? 
                      `0 20px 40px -20px ${step.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' :
                                          step.color === 'purple' ? 'rgba(147, 51, 234, 0.3)' :
                                          step.color === 'green' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(234, 179, 8, 0.3)'}` :
                      'none'
                  }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color === 'blue' ? 'from-blue-500 to-cyan-500' : 
                                                                 step.color === 'purple' ? 'from-purple-500 to-pink-500' : 
                                                                 step.color === 'green' ? 'from-green-500 to-emerald-500' : 
                                                                 'from-yellow-500 to-orange-500'} flex items-center justify-center`}>
                        <step.icon className="w-6 h-6 text-background" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <p className="text-blue-600 dark:text-muted-foreground">{step.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{step.duration}</span>
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full ${step.color === 'blue' ? 'bg-blue-400' : 
                                                              step.color === 'purple' ? 'bg-purple-400' : 
                                                              step.color === 'green' ? 'bg-green-400' : 
                                                              'bg-yellow-400'}`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Step {step.id} of {workflowSteps.length}
                      </span>
                      <div className="flex items-center space-x-2">
                        {completedSteps > index ? (
                          <div className="flex items-center space-x-1 text-green-500">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Completed</span>
                          </div>
                        ) : activeStep === index ? (
                          <div className="flex items-center space-x-1 text-blue-500">
                            <Circle className="w-4 h-4 animate-pulse" />
                            <span className="text-sm">In Progress</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
                            <Circle className="w-4 h-4" />
                            <span className="text-sm">Pending</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Visual Element */}
                <motion.div 
                  className={`relative h-64 bg-gradient-to-br ${step.color === 'blue' ? 'from-blue-500 to-cyan-500' : 
                                                           step.color === 'purple' ? 'from-purple-500 to-pink-500' : 
                                                           step.color === 'green' ? 'from-green-500 to-emerald-500' : 
                                                           'from-yellow-500 to-orange-500'} rounded-2xl flex items-center justify-center ${
                    index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-background/20 rounded-2xl" />
                  <motion.div
                    animate={{ 
                      scale: activeStep === index ? [1, 1.1, 1] : 1,
                      rotate: activeStep === index ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: activeStep === index ? Infinity : 0
                    }}
                  >
                    <step.icon className="w-24 h-24 text-background/80" />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Target className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <div className="text-xl font-semibold mb-4 text-blue-950 dark:text-foreground">100%</div>
              <div className="text-blue-600 dark:text-muted-foreground">Project Success Rate</div>
            </div>
            <div>
              <Zap className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <div className="text-xl font-semibold mb-4 text-blue-950 dark:text-foreground">4-6 Months</div>
              <div className="text-blue-600 dark:text-muted-foreground">Average Timeline</div>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <div className="text-xl font-semibold mb-4 text-blue-950 dark:text-foreground">150+</div>
              <div className="text-blue-600 dark:text-muted-foreground">Projects Delivered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkflowProgressScroll;