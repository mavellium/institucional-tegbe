import { Icon } from '@iconify/react'
import { Passos } from '@/interface/passos/IPassos';
import Heading from '@/components/ui/heading';
import RichText from '@/components/ui/rich/richText';
import { RichTextItem } from '@/types/richText.type';

interface StepsListProps {
  type: string;
  subtype: RichTextItem[]; 
  steps: Passos[];
  activeStep: Passos;
  onStepChange: (step: Passos) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  registerButtonRef: (el: HTMLButtonElement | null, index: number) => void;
}

export function StepsList({
  type,
  subtype,
  steps,
  activeStep,
  onStepChange,
  containerRef,
  registerButtonRef
}: StepsListProps) {
  return (
    <div ref={containerRef} className="w-full lg:w-1/2 flex flex-col justify-center">
      {type && (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
    bg-yellow-100/60 text-yellow-800 text-xs font-semibold tracking-wider uppercase mb-6 w-fit border border-yellow-300/60">

          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
          {type}
        </span>
      )}

      <Heading
        as="h1"
        className="font-semibold text-3xl sm:text-4xl lg:text-5xl mb-10 text-slate-900 leading-[1.1] tracking-tight"
      >
        {typeof subtype === 'string' ? subtype : <RichText content={subtype} />}
      </Heading>

      <div className="flex flex-col gap-4">
        {steps.map((step, index) => {
          const isActive = activeStep.id === step.id;

          return (
            <button
              key={step.id}
              ref={(el) => registerButtonRef(el, index)}
              onClick={() => onStepChange(step)}
              className={`
    group relative flex items-center justify-between w-full text-left px-6 py-5 rounded-2xl
    border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    
                ${isActive
                    ? 'bg-white border-yellow-400 shadow-[0_15px_40px_rgba(0,0,0,0.08)]'
                    : 'bg-white/70 border-slate-200/70 shadow-[0_5px_15px_rgba(0,0,0,0.04)] hover:bg-white hover:border-slate-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)]'
                  }
              `}
            >
              {/* Barra lateral mais forte */}
              <div className={`
            absolute left-0 top-0 h-full w-[3px] rounded-full transition-all duration-300
          `} />

              <div className="flex items-center gap-5 relative z-10">

                <div>
                  <h3 className={`
                font-semibold text-lg transition-colors duration-300
                ${isActive
                      ? 'text-slate-900'
                      : 'text-slate-700 group-hover:text-slate-900'
                    }
              `}>
                    {step.title}
                  </h3>

                  {step.subtitle && (
                    <p className="mt-1 text-sm text-slate-500 group-hover:text-slate-600 transition-colors">
                      {step.subtitle}
                    </p>
                  )}
                </div>
              </div>

            </button>
          )
        })}
      </div>
    </div>
  )
}