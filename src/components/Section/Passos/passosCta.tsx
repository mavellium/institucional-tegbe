import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button/button'
import { IButton } from '@/interface/button/IButton'

interface StepCTAProps {
  buttonData: IButton;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function StepCTA({ buttonData, containerRef }: StepCTAProps) {
  if (buttonData.action !== "link") return null;

  return (
    <div ref={containerRef} className="flex flex-col items-center mt-14">
      <Button
        asChild
        variant="default"
        className="group px-8 py-4"
      >
        <Link
          href={buttonData.link}
          target={buttonData.target || "_blank"}
          rel="noopener noreferrer"
        >
          <span className="flex items-center gap-3">
            {buttonData.label}
            <Icon
              icon="lucide:arrow-right"
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </Link>
      </Button>
    </div>
  )
}