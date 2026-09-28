import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: 'sar', label: '1. SAR Ingestion', path: '/incident' },
  { id: 'detect', label: '2. Deep Detection', path: '/incident' },
  { id: 'characterize', label: '3. Characterization', path: '/incident' },
  { id: 'env', label: '4. Environmental MetOcean', path: '/map' },
  { id: 'hindcast', label: '5. Hindcast Backtrack', path: '/map' },
  { id: 'source', label: '6. Source Region', path: '/map' },
  { id: 'ais', label: '7. AIS Track History', path: '/vessels' },
  { id: 'correlation', label: '8. Candidate Correlation', path: '/vessels' },
  { id: 'history', label: '9. Vessel Intelligence', path: '/history' },
  { id: 'forecast', label: '10. Forward Forecast', path: '/forecast' },
  { id: 'report', label: '11. Evidence & Report', path: '/report' }
];

const WorkflowBreadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveStepIndex = () => {
    switch (location.pathname) {
      case '/': return 0;
      case '/incident': return 2;
      case '/map': return 5;
      case '/vessels': return 7;
      case '/history': return 8;
      case '/forecast': return 9;
      case '/report': return 10;
      default: return 0;
    }
  };

  const activeIndex = getActiveStepIndex();

  return (
    <div className="workflow-trail" title="End-to-End Maritime Intelligence Operational Flow">
      {steps.map((step, idx) => {
        const isCurrent = idx === activeIndex;
        const isPassed = idx < activeIndex;

        return (
          <React.Fragment key={step.id}>
            <div
              onClick={() => navigate(step.path)}
              className={`workflow-step ${isPassed ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {isPassed && <CheckCircle2 size={13} className="text-cyan" />}
              <span>{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <ChevronRight size={13} className="workflow-arrow" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WorkflowBreadcrumbs;
